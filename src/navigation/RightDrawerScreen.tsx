import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomRightDrawerContent from './components/CustomRightDrawerContent';
import LeftDrawerScreen from './LeftDrawerScreen';

const RightDrawerScreen = createDrawerNavigator({
  screenOptions: {
    drawerPosition: 'right',
    headerShown: false,
  },
  drawerContent: (props) => <CustomRightDrawerContent {...props} />,
  screens: {
    HomeDrawer: LeftDrawerScreen,
  },
});

export default RightDrawerScreen;
