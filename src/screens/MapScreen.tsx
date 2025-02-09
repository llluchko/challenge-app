import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapComponent from './components/MapComponent';
import { useGetMapMarkers } from '../services/mapService';
import { MarkerData } from '../types';
import { useAppSelector } from '../store/hooks';
import { filterMarkers } from './utils/filterMarkers';

const MapScreen = () => {
  const getMarkersQueryInstance = useGetMapMarkers();
  const filters = useAppSelector((state) => state.map.filters);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Fetch markers fro API
  const markersData = useMemo(
    () =>
      getMarkersQueryInstance.data != undefined
        ? getMarkersQueryInstance.data
        : [],
    [getMarkersQueryInstance.data]
  );

  useEffect(() => {
    const markersForUI = markersData.map((marker) => {
      return {
        id: marker._id,
        title: marker.title,
        connectors: marker.connectors,
        coordinate: {
          latitude: marker.latitude,
          longitude: marker.longitude,
        },
      };
    });

    // Filter pins to have at least one connector that match both Type and Status filters
    const filteredMarkers = filterMarkers(markersForUI, filters);

    setMarkers(filteredMarkers);
  }, [markersData, filters]);

  return (
    <View style={styles.container}>
      {markers.length > 0 && <MapComponent markers={markers} />}
      {!getMarkersQueryInstance.isLoading &&
        (getMarkersQueryInstance.isError ||
          getMarkersQueryInstance.data === undefined ||
          getMarkersQueryInstance.data.length === 0) && (
          <Text style={styles.error}>
            There was a problem loading the markers
          </Text>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    marginTop: 20,
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default MapScreen;
