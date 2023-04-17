import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface FloatingContainerProps {
  buttons: {
    icon: string;
    onPress: () => void;
  }[];
}

const FloatingContainer: React.FC<FloatingContainerProps> = ({ buttons }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={button.onPress}
          >
            <MaterialIcons name={button.icon} size={24} color="#fff" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 30,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});

export default FloatingContainer;
