import { MarkerData } from '../../types';

export const filterMarkers = (markers: MarkerData[], filters: any) => {
  return markers.filter((marker) => {
    return marker.connectors.some((connector) => {
      const typeMatches =
        filters.connectorTypes.length === 0 ||
        filters.connectorTypes.includes(connector.type);
      const statusMatches =
        filters.connectorStatuses.length === 0 ||
        filters.connectorStatuses.includes(connector.status);
      return typeMatches && statusMatches;
    });
  });
};
