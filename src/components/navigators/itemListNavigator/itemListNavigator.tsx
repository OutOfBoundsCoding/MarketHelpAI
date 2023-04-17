import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateItemPage from "../../pages/createItemPage/CreateItemPage";
import CartPage from "../../pages/cartPage/CartPage";
import InventoryView from "../../organisms/inventoryView/InventoryView";
import ScannerPage from "../../pages/scannerPage/ScannerPage";

const Stack = createStackNavigator();

const HomePage: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Create"
        onPress={() => navigation.navigate("CreateItem")}
      />
    </View>
  );
};

const ItemListNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen name="Home" component={HomePage} /> */}
        <Stack.Screen name="Items" component={CartPage} />
        <Stack.Screen name="Inventory" component={InventoryView} />
        <Stack.Screen name="Scanner" component={ScannerPage} />
        <Stack.Screen name="CreateItem" component={CreateItemPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default ItemListNavigator;
