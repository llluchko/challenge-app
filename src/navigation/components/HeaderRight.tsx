import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderRight = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={() =>
        navigation.getParent()?.dispatch(DrawerActions.openDrawer())
      }
    >
      <Icon name='menu' size={28} color='black' />
    </TouchableOpacity>
  );
};

export default HeaderRight;
