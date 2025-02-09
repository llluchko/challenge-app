import { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPinColor } from '../store/slices/settingsSlice';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const pinColor = useAppSelector((state) => state.settings.pinColor);

  const handleSelect = (id: string) => {
    const selected = radioButtons.find((btn) => btn.id === id);
    if (selected?.value) {
      dispatch(setPinColor(selected.value));
    }
  };
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1',
        label: 'Blue',
        value: 'blue',
      },
      {
        id: '2',
        label: 'Red',
        value: 'red',
      },
    ],
    []
  );

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 15, marginTop: 50, marginBottom: 50 }}>
        Choose map pin color
      </Text>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={handleSelect}
        selectedId={radioButtons.find((btn) => btn.value === pinColor)?.id}
      />
    </View>
  );
};

export default SettingsScreen;
