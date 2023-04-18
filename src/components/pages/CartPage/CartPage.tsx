import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CartItem from "../../molecules/cartItem/CartItem";
import FloatingControls from "../../molecules/floatingControls/FloatingControls";
import useCartStore from "../../../core/context/CartStore";
import { css } from "@emotion/native";

const CartPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const clearCart = useCartStore((state) => state.clearCart);
  const buttons = [
    {
      icon: "cleaning-services",
      onPress: () => clearCart(),
    },
    {
      icon: "create",
      onPress: () => navigation.navigate("CreateItem"),
    },
    {
      icon: "inventory",
      onPress: () => navigation.navigate("Inventory"),
    },
    {
      icon: "qr-code",
      onPress: () => navigation.navigate("Scanner"),
    },
  ];

  const cartItems = useCartStore((state) => state.items);
  const totalCost = useCartStore((state) => state.getTotalCost);

  return (
    <View style={styles.screen}>
      {cartItems.map((item, i) => (
        <CartItem
          key={i}
          name={item.name}
          id={`item${i}`}
          barcodeData={item.barcodeData}
          price={item.price}
          quantity={item.quantity}
        />
      ))}
      <Text
        style={css`
          font-size: 26px;
          margin: 20px;
        `}
      >
        {totalCost()}
      </Text>
      <FloatingControls buttons={buttons} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});

export default CartPage;
