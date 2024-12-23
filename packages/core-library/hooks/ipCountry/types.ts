export interface CountryResponse {
  ip: string;
  continentCode: string;
  continentName: string;
  countryCode: string;
  countryName: string;
  countryNameNative: string;
  officialCountryName: string;
  regionCode: string;
  regionName: string;
  cityGeoNameId: number;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  capital: string;
  phoneCode: string;
  countryFalgEmoj: string;
  countryFlagEmojUnicode: string;
  isEu: boolean;
  borders: Array<string>;
  topLevelDomains: Array<string>;
}
