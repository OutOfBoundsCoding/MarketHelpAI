import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { CartListItem } from "../../../core/context/ItemsStore";

const CartItem: React.FC<CartListItem> = ({
  id,
  barcodeData,
  name,
  price,
  quantity,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.cartItem}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.itemTitle}>{name}</Text>
        <Text style={styles.itemDetails}>SKU: {id}</Text>
        <Text style={styles.itemDetails}>Barcode: {barcodeData}</Text>
        <Text style={styles.itemDetails}>Price: ${price.toFixed(2)}</Text>
        <Text style={styles.itemDetails}>Quantity: {quantity}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{name}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.modalOption}>Reduce Quantity</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.modalOption}>Remove Item</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.modalOption}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDetails: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: "50%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOption: {
    fontSize: 16,
    color: "#007AFF",
    marginBottom: 20,
  },
});

export default CartItem;
