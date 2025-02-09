import { useQuery } from '@tanstack/react-query';
import { GetPinsResponse } from '../types';

export const useGetMapMarkers = () => {
  // Change the URL to your own server
  const url = 'http://localhost:3000/pins';

  const queryInstance = useQuery({
    queryKey: ['useGetMapMarkers'],
    queryFn: async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`Error at ${url}`);
        }
        const result = (await response.json()) as GetPinsResponse;
        return result;
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });
  return queryInstance;
};
