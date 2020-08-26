//Import React
import React from "react";

//Import all required component
import { View, Text } from "react-native";

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 100 }}>
      <Text style={{ fontSize: 23, marginTop: 10 }}>Setting Screen</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>SETTINGS PAGE</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>POWER</Text>
    </View>
  );
};
export default SettingsScreen;
