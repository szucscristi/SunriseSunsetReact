

export interface SunriseSunsetData {
  date: string;
  sunrise: string;
  sunset: string;
  dawn: string;
  dusk: string;
}

export interface SunriseSunsetResponse {
  results: SunriseSunsetData;
}

export interface SunriseSunsetRangeResponse {
  results: SunriseSunsetData[];
}

export const getSunriseSunset = async (latitude: number, longitude: number, date?: string): Promise<SunriseSunsetResponse> => {
  const response = await fetch(
    `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}${date ? `&date=${date}` : ''}`
  );
  const data = await response.json();
  return {
    results: {
      ...data.results,
      date: date || new Date().toISOString().split('T')[0],
    },
  };
};

export const getSunriseSunsetRange = async (
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
): Promise<SunriseSunsetRangeResponse> => {
  const response = await fetch(
    `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date_start=${startDate}&date_end=${endDate}`
  );
  const data = await response.json();
  return { results: data.results };
};

export const getTomorrowSunriseSunset = async (latitude: number, longitude: number): Promise<SunriseSunsetResponse> => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];

  return getSunriseSunset(latitude, longitude, tomorrowString);
};
