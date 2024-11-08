import { parse, format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const parseDate = (dateString: string, dateFormat = "dd MM yyyy") => {
  try {
    return parse(dateString, dateFormat, new Date());
  } catch {
    return null;
  }
};

export const formatDate = (
  date: string | number | Date,
  dateFormat = "dd MM yyyy"
) => {
  const rawDate = typeof date === "string" && rawDateFromISOString(date);

  if (rawDate) {
    return rawDate;
  }

  try {
    const shouldAddGMT =
      typeof date === "string" && /^\d{1,2} [A-Za-z]+ \d{4}$/.test(date);
    const dateObj = new Date(shouldAddGMT ? date + " GMT" : date);
    const utcDate = utcToZonedTime(dateObj, "UTC");
    return format(utcDate, dateFormat);
  } catch {
    return date?.toString();
  }
};

export const rawDateFromISOString = (isoString: string) => {
  const match = isoString.match(/(\d{4})-(\d{2})-(\d{2})/);

  if (match) {
    const [year, month, day] = match.slice(1, 4).map(Number);
    const monthName = new Date(Date.UTC(year, month - 1, day)).toLocaleString(
      "default",
      { month: "short" }
    );
    const dayString = day.toString().padStart(2, "0");
    return `${dayString} ${monthName} ${year}`;
  }
};

export const formatTime = (
  date: string | number | Date,
  timeFormat = "HH:mm"
) => {
  try {
    const isDateISOString =
      typeof date === "string" && date.match(/\d{4}-\d{2}-\d{2}T/);
    return format(
      isDateISOString ? parseISO(date) : new Date(date),
      timeFormat
    );
  } catch (error) {
    return date.toString();
  }
};
