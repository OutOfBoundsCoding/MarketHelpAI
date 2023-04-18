import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { InventoryItem } from "../../../core/types";
import useInventoryStore from "../../../core/context/InventoryStore";

const CreateItemPage: React.FC = () => {
  const createInventoryItem = useInventoryStore((state) => state.storeItem);
  const [item, setItem] = useState<InventoryItem>({
    barcodeData: "",
    price: 0,
    name: "",
  });

  const handleCreateItem = () => {
    createInventoryItem(item);
    setItem({ barcodeData: "", price: 0, name: "" });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Barcode"
        value={item.barcodeData}
        onChangeText={(value) => setItem({ ...item, barcodeData: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={item.price.toString()}
        keyboardType="numeric"
        onChangeText={(value) => setItem({ ...item, price: Number(value) })}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={item.name}
        onChangeText={(value) => setItem({ ...item, name: value })}
      />
      <Button title="Create Item" onPress={handleCreateItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
});

export default CreateItemPage;
