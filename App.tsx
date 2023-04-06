import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import AppContainer from "./src/components/molecules/navigator";
import CartPage from "./src/components/pages/CartPage/CartPage";

export default function App() {
  // return <AppContainer />;
  return <CartPage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
