export type MappedCountry = {
    countryKey: string;
    countryName: string;
    daysRemaining: number;
    timezones: {
      selectedTimezone: string;
      daysRemaining: number;
    }[];
  };