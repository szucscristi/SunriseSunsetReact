// src/SunriseSunsetApi.tsx
import axios from 'axios'

const BASE_URL = 'https://api.sunrisesunset.io/';

const api = axios.create({
  baseURL: BASE_URL,
});

interface SunriseSunsetResponse {
  results: {
    sunrise: string;
    sunset: string;
    // Add other fields from the response if needed
  };
  status: string;
}

interface SunriseSunsetRangeResponse {
  resultsList: {
    sunrise: string;
    sunset: string;
    // Add other fields from the response if needed
  }[];
  status: string;
}

export const getSunriseSunset = async (
  latitude: number,
  longitude: number,
  date: string | null = null
): Promise<SunriseSunsetResponse> => {
  try {
    const response = await api.get<SunriseSunsetResponse>('json', {
      params: {
        lat: latitude,
        lng: longitude,
        date: date,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSunriseSunsetRange = async (
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
): Promise<SunriseSunsetRangeResponse> => {
  try {
    const response = await api.get<SunriseSunsetRangeResponse>('json', {
      params: {
        lat: latitude,
        lng: longitude,
        date_start: startDate,
        date_end: endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
