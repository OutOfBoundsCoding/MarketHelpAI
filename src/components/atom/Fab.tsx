import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface FABProps {
  label?: string;
  onPress: () => void;
}

const FAB: React.FC<FABProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialIcons name="add" size={24} color="white" />
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 30,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default FAB;
