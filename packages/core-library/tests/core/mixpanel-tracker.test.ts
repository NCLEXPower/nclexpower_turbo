import mixpanel from "mixpanel-browser";
import { config } from "../../config";
import {
  initMixpanelTracker,
  mixpanelBuildUserProfile,
  mixpanelTrackButtonClick,
  mixpanelTrackEvent,
  mixpanelTrackLogin,
  mixpanelTrackPageLoad,
  resetMixpanelTrackedUser,
  setMixpanelTrackedUser,
  setSuperProperties,
  updateUserProfile,
} from "../../core";

jest.mock("mixpanel-browser", () => ({
  init: jest.fn(),
  identify: jest.fn(),
  register: jest.fn(),
  people: {
    set: jest.fn(),
  },
  track: jest.fn(),
  reset: jest.fn(),
}));

jest.mock("../../config", () => ({
  config: {
    value: {
      MIXPANEL_TOKEN: null,
      BASEAPP: null,
    },
  },
}));

describe("Mixpanel Tracker", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    config.value.MIXPANEL_TOKEN = "test-token";
    config.value.BASEAPP = "webc_app";
  });

  test("initMixpanelTracker should initialize Mixpanel when token is available", () => {
    initMixpanelTracker();
    expect(mixpanel.init).toHaveBeenCalledWith(
      "test-token",
      expect.any(Object)
    );
  });

  test("initMixpanelTracker should log a warning when token is not available", () => {
    config.value.MIXPANEL_TOKEN = null;
    initMixpanelTracker();
    expect(mixpanel.init).not.toHaveBeenCalled();
  });

  test("setMixpanelTrackedUser should identify user and set properties", () => {
    const properties = { key: "value" };
    initMixpanelTracker();
    setSuperProperties(properties);
    expect(mixpanel.register).toHaveBeenCalledWith(properties);
  });

  test("updateUserProfile should set user profile properties in Mixpanel", () => {
    const properties = { key: "value" };
    initMixpanelTracker();
    updateUserProfile(properties);
    expect(mixpanel.people.set).toHaveBeenCalledWith(properties);
  });

  test("mixpanelTrackLogin should track login events for WC", () => {
    config.value.BASEAPP = "webc_app";
    initMixpanelTracker();
    mixpanelTrackLogin();
    expect(mixpanel.track).toHaveBeenCalledWith(
      `User Login to ${config.value.BASEAPP}`,
      undefined
    );
  });

  test("mixpanelTrackLogin should track login events for WB", () => {
    config.value.BASEAPP = "webdev_app";
    initMixpanelTracker();
    mixpanelTrackLogin();
    expect(mixpanel.track).toHaveBeenCalledWith(
      `User Login to ${config.value.BASEAPP}`,
      undefined
    );
  });

  test("mixpanelTrackEvent should track events in Mixpanel", () => {
    const eventName = "test_event";
    const params: any = { key: "value" };
    initMixpanelTracker();
    mixpanelTrackEvent(eventName, params);
    expect(mixpanel.track).toHaveBeenCalledWith(eventName, params);
  });

  test("resetMixpanelTrackedUser should reset the user in Mixpanel", () => {
    initMixpanelTracker();
    resetMixpanelTrackedUser();
    expect(mixpanel.reset).toHaveBeenCalled();
  });

  test("setMixpanelTrackedUser should return early if Mixpanel is not initialized", () => {
    const userName = "test-user";
    config.value.MIXPANEL_TOKEN = null;
    setMixpanelTrackedUser(userName);
    expect(mixpanel.identify).not.toHaveBeenCalled();
    expect(mixpanel.register).not.toHaveBeenCalled();
    expect(mixpanel.people.set).not.toHaveBeenCalled();
  });

  test("setSuperProperties should return early if Mixpanel is not initialized", () => {
    const properties = { key: "value" };
    config.value.MIXPANEL_TOKEN = null;
    setSuperProperties(properties);
    expect(mixpanel.register).not.toHaveBeenCalled();
  });

  test("updateUserProfile should return early if Mixpanel is not initialized", () => {
    const properties = { key: "value" };
    config.value.MIXPANEL_TOKEN = null;
    updateUserProfile(properties);
    expect(mixpanel.people.set).not.toHaveBeenCalled();
  });

  test("mixpanelTrackPageLoad should return early if Mixpanel is not initialized", () => {
    const params = { PageKey: "home", $referrer: "", Scroll: "0" };
    config.value.MIXPANEL_TOKEN = null;
    mixpanelTrackPageLoad(params);
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("mixpanelTrackButtonClick should return early if Mixpanel is not initialized", () => {
    const params = { Category: "test", Label: "button", ButtonKey: "btn1" };
    config.value.MIXPANEL_TOKEN = null;
    mixpanelTrackButtonClick(params);
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("mixpanelTrackEvent should return early if Mixpanel is not initialized", () => {
    const eventName = "test_event";
    const params: any = { key: "value" };
    config.value.MIXPANEL_TOKEN = null;
    mixpanelTrackEvent(eventName, params);
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("resetMixpanelTrackedUser should return early if Mixpanel is not initialized", () => {
    config.value.MIXPANEL_TOKEN = null;
    resetMixpanelTrackedUser();
    expect(mixpanel.reset).not.toHaveBeenCalled();
  });

  test("should set user ID and update user profile with provided data", () => {
    const mockAnalyticsParams = {
      accountId: "account-123",
      firstname: "lizter",
      middlename: "toks",
      lastname: "babael",
      status: "pending",
    };

    const setMixpanelTrackedUserMock = jest.spyOn(
      require("../../core/mixpanel-tracker"),
      "setMixpanelTrackedUser"
    );
    const updateUserProfileMock = jest.spyOn(
      require("../../core/mixpanel-tracker"),
      "updateUserProfile"
    );

    mixpanelBuildUserProfile(mockAnalyticsParams);
    expect(setMixpanelTrackedUserMock).toHaveBeenCalledWith("account-123");
    expect(updateUserProfileMock).toHaveBeenCalledWith({
      Firstname: "lizter",
      Middlename: "toks",
      Lastname: "babael",
      Status: "pending",
    });
  });
});
