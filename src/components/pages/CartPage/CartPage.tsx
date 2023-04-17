import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CartItem from "../../molecules/cartItem/CartItem";
import FloatingControls from "../../molecules/floatingControls/FloatingControls";
import useItemStore from "../../../core/context/ItemsStore";

const CartPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const buttons = [
    {
      icon: "add",
      onPress: () => navigation.navigate("CreateItem"),
    },
    {
      icon: "edit",
      onPress: () => navigation.navigate("Inventory"),
    },
    {
      icon: "delete",
      onPress: () => navigation.navigate("Scanner"),
    },
  ];
  // const cartItems: CartItemType[] = [
  //   {
  //     title: "Item 1",
  //     sku: "A123",
  //     barcode: "123456789",
  //     price: 10.99,
  //     quantity: 1,
  //   },
  //   {
  //     title: "Item 2",
  //     sku: "B456",
  //     barcode: "987654321",
  //     price: 5.99,
  //     quantity: 3,
  //   },
  //   {
  //     title: "Item 3",
  //     sku: "C789",
  //     barcode: "456123789",
  //     price: 2.99,
  //     quantity: 2,
  //   },
  // ];

  const cartItems = useItemStore((state) => state.items);
  const totalCost = useItemStore((state) => state.getTotalCost);

  return (
    <View style={styles.screen}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          id={item.id}
          barcodeData={item.barcodeData}
          price={item.price}
          quantity={item.quantity}
        />
      ))}
      <Text>{totalCost()}</Text>
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
