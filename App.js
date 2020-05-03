import React from "react";
import { Provider } from "react-redux";
import store from "./redux";

import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Search from "./App/Search";

const SearchStack = createStackNavigator();
const SearchScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
  </SearchStack.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <SearchScreen />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent('app', () => App);
