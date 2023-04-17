import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

interface Item {
  sku: string;
  barcode: string;
  price: number;
  name: string;
}

const CreateItemPage: React.FC = () => {
  const [item, setItem] = useState<Item>({
    sku: "",
    barcode: "",
    price: 0,
    name: "",
  });

  const handleCreateItem = () => {
    // Do something with the created item, like send it to a database
    console.log(item);
    // Reset the state to clear the form
    setItem({ sku: "", barcode: "", price: 0, name: "" });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="SKU"
        value={item.sku}
        onChangeText={(value) => setItem({ ...item, sku: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Barcode"
        value={item.barcode}
        onChangeText={(value) => setItem({ ...item, barcode: value })}
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
