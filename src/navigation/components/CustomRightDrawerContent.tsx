import { View, Text, StyleSheet, Button } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { STATUS, TYPE } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { setFilters } from '../../store/slices/mapSlice';

const CustomRightDrawerContent = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [type1Checked, setType1Checked] = useState(false);
  const [type2Checked, setType2Checked] = useState(false);
  const [type3Checked, setType3Checked] = useState(false);
  const [type4Checked, setType4Checked] = useState(false);
  const [status1Checked, setStatus1Checked] = useState(false);
  const [status2Checked, setStatus2Checked] = useState(false);

  const handleApplyFilters = () => {
    const connectorTypes = [];
    const connectorStatuses = [];
    if (type1Checked) connectorTypes.push(TYPE.CCS2);
    if (type2Checked) connectorTypes.push(TYPE.J1772);
    if (type3Checked) connectorTypes.push(TYPE.Type2);
    if (type4Checked) connectorTypes.push(TYPE.Type3);
    if (status1Checked) connectorStatuses.push(STATUS.AVAILABLE);
    if (status2Checked) connectorStatuses.push(STATUS.UNAVAILABLE);
    const filters = {
      connectorTypes,
      connectorStatuses,
    };
    dispatch(setFilters(filters));
    navigation.goBack();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.text}>Connector type: </Text>
        <View style={styles.filters}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={type1Checked}
              onValueChange={setType1Checked}
            />
            <Text>{TYPE.CCS2}</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={type2Checked}
              onValueChange={setType2Checked}
            />
            <Text>{TYPE.J1772}</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={type3Checked}
              onValueChange={setType3Checked}
            />
            <Text>{TYPE.Type2}</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={type4Checked}
              onValueChange={setType4Checked}
            />
            <Text>{TYPE.Type3}</Text>
          </View>
        </View>
        <Text style={styles.text}>Connector status: </Text>
        <View style={styles.filters}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={status1Checked}
              onValueChange={setStatus1Checked}
            />
            <Text>{STATUS.AVAILABLE}</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={status2Checked}
              onValueChange={setStatus2Checked}
            />
            <Text>{STATUS.UNAVAILABLE}</Text>
          </View>
        </View>
        <View style={styles.filters}>
          <Button title='Apply' onPress={handleApplyFilters} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 20,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    margin: 10,
    width: 30,
    height: 30,
  },
  text: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  filters: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
});

export default CustomRightDrawerContent;
