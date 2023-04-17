import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Item } from "../../../core/types/Item";
import EditItemModal from "../editItemModal/EditItemModal";

const ITEMS: Item[] = [
  {
    id: 1,
    name: "Item 1",
    price: 9.99,
    barcode: "1234567890",
  },
  {
    id: 2,
    name: "Item 2",
    price: 19.99,
    barcode: "0987654321",
  },
  {
    id: 3,
    name: "Item 3",
    price: 29.99,
    barcode: "1357924680",
  },
];

const InvventoryView: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items, setItems] = useState<Item[]>(ITEMS);

  const handleEditItem = (item: Item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const handleSaveItem = (updatedItem: Item) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === updatedItem.id);
    newItems[index] = updatedItem;
    setItems(newItems);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleEditItem(item)}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{`$${item.price.toFixed(2)}`}</Text>
      <Text style={styles.itemBarcode}>{item.barcode}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      <EditItemModal
        item={selectedItem ?? ITEMS[0]}
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

export default InvventoryView;
