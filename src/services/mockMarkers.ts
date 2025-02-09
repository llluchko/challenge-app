import { GetPinsResponse } from '../types';

const mockMarkers: GetPinsResponse = [
  {
    _id: '1',
    title: 'San Francisco',
    connectors: [
      { type: 'J1772', status: 'available' },
      { type: 'Type 2', status: 'unavailable' },
    ],
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    _id: '2',
    title: 'Los Angeles',
    connectors: [
      { type: 'J1772', status: 'available' },
      { type: 'Type 2', status: 'unavailable' },
    ],
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    _id: '3',
    title: 'New York',
    connectors: [
      { type: 'J1772', status: 'available' },
      { type: 'Type 2', status: 'unavailable' },
    ],
    latitude: 40.7128,
    longitude: -74.006,
  },
];

export default mockMarkers;
