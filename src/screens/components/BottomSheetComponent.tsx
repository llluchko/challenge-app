import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { MarkerData, STATUS } from '../../types';

type BottomSheetComponentProps = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  bottomSheetInitialIndex: number;
  bottomSheetSnapPoints: string[];
  onBottomSheetChange: (index: number) => void;
  selectedMarker: MarkerData | null;
};

const BottomSheetComponent = ({
  bottomSheetRef,
  bottomSheetInitialIndex,
  bottomSheetSnapPoints,
  onBottomSheetChange,
  selectedMarker,
}: BottomSheetComponentProps) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={bottomSheetInitialIndex}
      snapPoints={bottomSheetSnapPoints}
      enablePanDownToClose={true}
      onChange={(index) => onBottomSheetChange(index)}
    >
      {selectedMarker && (
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>{selectedMarker.title}</Text>
          {selectedMarker.connectors.map((connector, index) => (
            <View key={index} style={styles.description}>
              <Text style={styles.type}>{connector.type}</Text>
              {connector.status === STATUS.AVAILABLE ? (
                <Text style={[styles.type, styles.statusAvailable]}>
                  {connector.status}
                </Text>
              ) : (
                <Text style={[styles.type, styles.statusUnavailable]}>
                  {connector.status}
                </Text>
              )}
            </View>
          ))}
        </BottomSheetView>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 20,
  },
  type: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  statusAvailable: {
    fontSize: 15,
    color: 'green',
  },
  statusUnavailable: {
    fontSize: 15,
    color: 'red',
  },
});
export default BottomSheetComponent;
