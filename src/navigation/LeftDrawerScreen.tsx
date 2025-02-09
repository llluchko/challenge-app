import { createDrawerNavigator } from '@react-navigation/drawer';
import HeaderRight from './components/HeaderRight';
import CustomLeftDrawerContent from './components/CustomLeftDrawerContent';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';

const LeftDrawerScreen = createDrawerNavigator({
  screenOptions: {
    drawerPosition: 'left',
    headerRight: () => <HeaderRight />,
  },
  drawerContent: (props) => <CustomLeftDrawerContent {...props} />,
  screens: {
    Home: MapScreen,
    Settings: SettingsScreen,
  },
});

export default LeftDrawerScreen;
