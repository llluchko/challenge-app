import { MarkerData } from '../../types';
import { filterMarkers } from '../utils/filterMarkers';

const mockMarkers: MarkerData[] = [
  {
    id: '1',
    title: 'San Francisco',
    connectors: [
      { type: 'J1772', status: 'available' },
      { type: 'Type 2', status: 'unavailable' },
    ],
    coordinate: { latitude: 37.7749, longitude: -122.4194 },
  },
  {
    id: '2',
    title: 'Los Angeles',
    connectors: [
      { type: 'J1772', status: 'available' },
      { type: 'Type 2', status: 'unavailable' },
    ],
    coordinate: { latitude: 34.0522, longitude: -118.2437 },
  },
  {
    id: '3',
    title: 'New York',
    connectors: [
      { type: 'J1772', status: 'available' },
      { type: 'Type 2', status: 'unavailable' },
    ],
    coordinate: { latitude: 40.7128, longitude: -74.006 },
  },
];

describe('filterMarkers', () => {
  it('should return all markers when no filters are applied', () => {
    const filters = {
      connectorTypes: [],
      connectorStatuses: [],
    };
    const result = filterMarkers(mockMarkers, filters);
    expect(result).toEqual(mockMarkers);
  });

  it('should filter markers by connector type', () => {
    const filters = {
      connectorTypes: ['J1772'],
      connectorStatuses: [],
    };
    const result = filterMarkers(mockMarkers, filters);
    expect(result.length).toBe(3); // All markers have 'J1772' connector type
  });

  it('should filter markers by connector status', () => {
    const filters = {
      connectorTypes: [],
      connectorStatuses: ['available'],
    };
    const result = filterMarkers(mockMarkers, filters);
    expect(result.length).toBe(3); // All markers have 'available' connector status
  });

  it('should filter markers by both connector type and status', () => {
    const filters = {
      connectorTypes: ['J1772'],
      connectorStatuses: ['available'],
    };
    const result = filterMarkers(mockMarkers, filters);
    expect(result.length).toBe(3); // All markers have 'J1772' and 'available' connector
  });

  it('should return no markers if no connectors match the filters', () => {
    const filters = {
      connectorTypes: ['type20'],
      connectorStatuses: ['available'],
    };
    const result = filterMarkers(mockMarkers, filters);
    expect(result.length).toBe(0); // No markers have 'type20' connector type
  });
});
