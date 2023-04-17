import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getItemByBarcode } from "../../../core/database/Database";
import useItemStore from "../../../core/context/ItemsStore";

const ScannerPage: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [barcodeData, setBarcodeData] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<string>("");
  const addItem = useItemStore((state) => state.addItem);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    let barcodeResult = data;
    try {
      const result = await getItemByBarcode(data);
    } catch (error) {
      console.log(error);
    }
    if (result !== null) {
      barcodeResult = result.barcodeData;
    }

    setScanned(true);
    setBarcodeData(barcodeResult);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    console.log(
      `Scanned data: ${barcodeData}, Item name: ${itemName}, Item price: ${itemPrice}`
    );
    addItem({
      id: barcodeData,
      barcodeData: barcodeData,
      name: itemName,
      price: parseFloat(itemPrice),
      quantity: 1,
    });
    setModalVisible(false);
    setScanned(false);
    setBarcodeData("");
    setItemName("");
    setItemPrice("");
  };

  const handleCancel = () => {
    setModalVisible(false);
    setScanned(false);
    setBarcodeData("");
    setItemName("");
    setItemPrice("");
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text>Scanned data: {barcodeData}</Text>
          <TextInput
            style={styles.input}
            placeholder="Item name"
            onChangeText={(text) => setItemName(text)}
            value={itemName}
          />
          <TextInput
            style={styles.input}
            placeholder="Item price"
            onChangeText={(text) => setItemPrice(text)}
            value={itemPrice}
            keyboardType="numeric"
          />
          <Button title="Log to console" onPress={handleSubmit} />
          <Button title="Cancel" onPress={handleCancel} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
});

export default ScannerPage;
