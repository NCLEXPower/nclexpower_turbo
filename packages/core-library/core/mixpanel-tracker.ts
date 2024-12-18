import mixpanel from "mixpanel-browser";
import { AnalyticsParams } from "../api/types";
import { capitalizeFirstLetter } from "../types";
import { config } from "../config";

export type TrackButtonClickParams = {
  Category: string;
  Action: string;
  Page: string;
  Label?: string;
  ButtonKey?: string;
};

export type TrackPageLoadParams = {
  Page: string;
  Action: string;
  PageKey?: string;
  Title?: string;
  $referrer: string;
  Scroll: string;
};

let mixpanelInitialized = false;

export const initMixpanelTracker = () => {
  if (!config.value.MIXPANEL_TOKEN) {
    console.warn("MIXPANEL_TOKEN is not defined in the configuration.");
    return;
  }

  const isProduction = process.env.NODE_ENV === "production";

  try {
    mixpanel.init(config.value.MIXPANEL_TOKEN, {
      debug: !isProduction,
      secure_cookie: isProduction,
      persistence: "cookie",
      disable_cookie: true,
      record_sessions_percent: 100,
    });
    mixpanelInitialized = true;
  } catch (e) {
    console.warn("Error initializing Mixpanel.", { error: e });
  }
};

export const isMixpanelEnabled = () =>
  Boolean(config.value.MIXPANEL_TOKEN) && mixpanelInitialized;

/**
 * Registers the user in Mixpanel.
 * This should be called when the user logs in or when the session is created.
 *
 * @param userName - The username to set as the tracking ID instead of the default random ID.
 */
export const setMixpanelTrackedUser = (userName: string) => {
  if (!isMixpanelEnabled()) return;
  mixpanel.identify(userName);
  const user = { $user_id: userName };
  setSuperProperties(user);
  updateUserProfile(user);
};

/**
 * Updates or adds properties which are sent in every tracking call.
 * @param properties - The properties to set as super properties.
 */
export const setSuperProperties = (properties: Record<string, any>) => {
  if (!isMixpanelEnabled()) return;
  mixpanel.register(properties);
};

/**
 * Updates or adds properties on a user profile which will be persisted in Mixpanel.
 * @param properties - The properties to update or add.
 */
export const updateUserProfile = (properties: Record<string, any>) => {
  if (!isMixpanelEnabled()) return;
  mixpanel.people.set(properties);
};

/**
 * Tracks a page load event.
 * @param params - The parameters for the page load event.
 */
export function mixpanelTrackPageLoad(
  params: Omit<TrackPageLoadParams, "Page" | "Title" | "Action">
) {
  const pathName = getCurrentPathWithSearch();
  mixpanelTrackEvent(pathName, {
    ...params,
    Action: "Page load",
    Page: pathName,
    Title: document.title,
  });
}

/**
 * Tracks a button click event.
 * @param params - The parameters for the button click event.
 */
export function mixpanelTrackButtonClick(
  params: Omit<TrackButtonClickParams, "Page" | "Action">
) {
  const pathName = getCurrentPathWithSearch();
  mixpanelTrackEvent(capitalizeFirstLetter(params.Category), {
    ...params,
    Action: "Click button",
    Page: pathName,
  });
}

/**
 * Tracks a login event.
 */
export function mixpanelTrackLogin() {
  mixpanelTrackEvent(`User Login to ${config.value.BASEAPP}`);
}

/**
 * Tracks an event in Mixpanel.
 * @param eventName - The name of the event to track.
 * @param params - Additional event parameters.
 */
export const mixpanelTrackEvent = (
  eventName: string,
  params?: TrackPageLoadParams | TrackButtonClickParams
) => {
  if (!isMixpanelEnabled()) return;
  mixpanel.track(eventName, params);
};

/**
 * Resets the tracked user in Mixpanel.
 * This can be called when the user logs out or when the session expires.
 */
export const resetMixpanelTrackedUser = () => {
  if (!isMixpanelEnabled()) return;
  mixpanel.reset();
};

export const mixpanelBuildUserProfile = (data: AnalyticsParams) => {
  setMixpanelTrackedUser(data.accountId ?? "");
  updateUserProfile({
    Firstname: data.firstname ?? "",
    Middlename: data.middlename ?? "",
    Lastname: data.lastname ?? "",
    Status: data.status ?? "",
  });
};

function getCurrentPathWithSearch() {
  if (typeof window !== "undefined") {
    return window.location.pathname + window.location.search;
  }
  return "";
}
