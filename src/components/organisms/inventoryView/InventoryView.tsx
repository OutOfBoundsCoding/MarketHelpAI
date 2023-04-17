import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EditItemModal from "../editItemModal/EditItemModal";
import { CartListItem } from "../../../core/types";

const InventoryView: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<CartListItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items, setItems] = useState<CartListItem[]>([]);

  const handleEditItem = (item: CartListItem) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const handleSaveItem = (updatedItem: CartListItem) => {
    const newItems = [...items];
    const index = newItems.findIndex(
      (item) => item.barcodeData === updatedItem.barcodeData
    );
    newItems[index] = updatedItem;
    setItems(newItems);
  };

  const renderItem = ({ item }: { item: CartListItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleEditItem(item)}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{`$${item.price.toFixed(2)}`}</Text>
      <Text style={styles.itemBarcode}>{item.barcodeData}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, i) => i.toString()}
        style={styles.list}
      />
      <EditItemModal
        item={
          selectedItem ?? {
            barcodeData: "",
            name: "",
            price: 0,
            quantity: 0,
          }
        }
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleSaveItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    padding: 20,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
  },
  itemBarcode: {
    fontSize: 14,
    color: "gray",
  },
});

export default InventoryView;
