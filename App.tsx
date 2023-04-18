import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import AppContainer from "./src/components/molecules/navigator/navigator";
import CartPage from "./src/components/pages/cartPage/CartPage";
import CreateItemPage from "./src/components/pages/createItemPage/CreateItemPage";
import ItemListNavigator from "./src/components/navigators/itemListNavigator/itemListNavigator";
import {
  selectAllItems,
  initializeDB,
  removeTable,
} from "./src/core/database/Database";
import useInventoryStore from "./src/core/context/InventoryStore";

export default function App() {
  const initializeItems = useInventoryStore((state) => state.initializeItems);
  const initializeInventory = async () => {
    // await removeTable();
    await initializeDB();
    const dbItems = await selectAllItems();
    initializeItems(dbItems);
    console.log(dbItems);
  };
  useEffect(() => {
    initializeInventory();
  }, []);

  // return <AppContainer />;
  // return <CartPage />;
  // return <CreateItemPage />;
  return <ItemListNavigator />;
  // return <ScanScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
