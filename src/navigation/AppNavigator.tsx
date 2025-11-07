import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddProduct, CustomerScreen, Dashboard, Stockin, Stockout, UpdateProducts, VendorScreen, ViewProducts } from '../screens';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="AppProduct"
          component={AddProduct}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="Stockin"
          component={Stockin}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="Stockout"
          component={Stockout}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="ViewProducts"
          component={ViewProducts}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="UpdateProducts"
          component={UpdateProducts}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="VendorScreen"
          component={VendorScreen}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="CustomerScreen"
          component={CustomerScreen}
          options={{headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
