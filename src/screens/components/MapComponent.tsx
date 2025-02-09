import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import BottomSheet from '@gorhom/bottom-sheet';
import { MarkerData } from '../../types';
import BottomSheetComponent from './BottomSheetComponent';
import { useAppSelector } from '../../store/hooks';

type MapComponentProps = {
  markers: MarkerData[];
};

const MapComponent = ({ markers }: MapComponentProps) => {
  const [visibleMarkers, setVisibleMarkers] = useState<MarkerData[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const bottomSheetSnapPoints = ['25%', '50%'];
  const bottomSheetInitialIndex = 2;
  const bottomSheetRef = useRef<BottomSheet>(null);
  // Initial region
  const [region, setRegion] = useState<Region>({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  const isConnected = useNetworkStatus();
  const pinColor = useAppSelector((state) => state.settings.pinColor);

  useEffect(() => {
    if (isConnected === false) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet and try again.',
        [{ text: 'OK' }]
      );
    }
  }, [isConnected]);

  useEffect(() => {
    filterMarkers(region);
  }, [region, markers]);

  const filterMarkers = (currentRegion: Region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } =
      currentRegion;

    // Calculate boundaries
    const latMin = latitude - latitudeDelta / 2;
    const latMax = latitude + latitudeDelta / 2;
    const lonMin = longitude - longitudeDelta / 2;
    const lonMax = longitude + longitudeDelta / 2;

    // Filter markers
    const markersInRegion = markers.filter(
      (marker) =>
        marker.coordinate.latitude >= latMin &&
        marker.coordinate.latitude <= latMax &&
        marker.coordinate.longitude >= lonMin &&
        marker.coordinate.longitude <= lonMax
    );
    setVisibleMarkers(markersInRegion);
  };

  const handleMarkerPress = (marker: MarkerData) => {
    setSelectedMarker(marker);
    bottomSheetRef.current?.expand();
  };

  const handleBottomSheetChange = (index: number) => {
    if (index === -1) {
      setSelectedMarker(null);
    }
  };

  return (
    <View testID='map-component' style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {visibleMarkers.map((marker) => (
          <Marker
            testID='marker'
            key={`${marker.id}-${pinColor}`}
            coordinate={marker.coordinate}
            onPress={() => handleMarkerPress(marker)}
            pinColor={pinColor}
          />
        ))}
      </MapView>
      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        bottomSheetInitialIndex={bottomSheetInitialIndex}
        bottomSheetSnapPoints={bottomSheetSnapPoints}
        onBottomSheetChange={handleBottomSheetChange}
        selectedMarker={selectedMarker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;
