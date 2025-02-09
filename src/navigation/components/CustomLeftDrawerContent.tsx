import { View, Text, Button, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const CustomLeftDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Button
          title='Home'
          onPress={() => props.navigation.navigate('Home')}
        />
        <Button
          title='Settings'
          onPress={() => props.navigation.navigate('Settings')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});

export default CustomLeftDrawerContent;
