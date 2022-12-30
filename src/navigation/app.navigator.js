import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// features (aka scenes, aka pages)
import Login from '../features/Login'
import { useSelector } from 'react-redux';
import { selectAuth } from '../common/store/authSlice';
import Home from '../features/Home';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const useHeaderOptions = () => {
  const theme = useTheme()
  const styles = useStyleSheet(themedStyles);
  return {
    options: {
      headerShown: true,
      // headerTransparent: true,
      headerTitleAlign: 'center',
      headerTintColor: theme['color-primary-default'],
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle,
    }
  }
}

const HomeNavigator = () => {
  const styles = useStyleSheet(themedStyles);
  const commonHeaderOptions = useHeaderOptions();

  const tabBarOptions = {
    ...commonHeaderOptions.options,
    tabBarLabelStyle: styles.tabBarText,
    tabBarStyle: styles.tabBarStyle,
    tabBarHideOnKeyboard: true,
  }
  const tabBarIcon = ({ name, color, size }) => (
    // https://oblador.github.io/react-native-vector-icons/
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
  const homeOptions = {
    title: 'Home',
    tabBarIcon: (props) => tabBarIcon({name: 'home', ...props}),
  }
  const HomeTabs = () =>
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen name='Should be Home' component={Home} options={homeOptions}/>
    </Tab.Navigator>

  return (
    <Stack.Navigator screenOptions={commonHeaderOptions.options}>
      <Stack.Screen name='Home Tabs' component={HomeTabs} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

const AuthNavigator = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme()
  const commonHeaderOptions = useHeaderOptions();
  return(
  <Stack.Navigator screenOptions={commonHeaderOptions.options}>
    <Stack.Screen name='Sign In' component={Login} options={{headerShown: true}}/>
  </Stack.Navigator>
);
}

export const AppNavigator = () => {
  const auth = useSelector(selectAuth);
  return(
  <NavigationContainer>
    {auth.uid ? <HomeNavigator/> : <AuthNavigator />}
  </NavigationContainer>
  );
}

const themedStyles = StyleService.create({
  tabBarStyle:{
    backgroundColor: '#FAFAFA',
  },
  tabBarText:{
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
  },
  headerStyle: {
    backgroundColor: 'color-info-700',
  },
  headerTitleStyle: {
    color: 'color-primary-default',
    fontSize: 32,
    fontFamily: 'Roboto_700Bold',
  },
});
