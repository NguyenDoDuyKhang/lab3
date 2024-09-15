import React from "react";
import { StatusBar } from "react-native"; // Importing StatusBar
import { Provider } from "react-redux";
import Store from "./components/store";
import DrawerNavigator from "./components/routes";

const App = () => {
  return (
    <Provider store={Store}>
      {/* StatusBar is applied globally */}
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      <DrawerNavigator />
    </Provider>
  );
};

export default App;