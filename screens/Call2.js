import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function CallScreen({ route, navigation }) {
  const { contact } = route.params;
  const { name, phone, avatar } = contact;
  const [calling, setCalling] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Simulate calling for 2 seconds
    setTimeout(() => {
      setCalling(false);
    }, 2000);

    // Update call duration every second
    const timer = setInterval(() => {
      setCallDuration((prevDuration) => prevDuration + 1);
    }, 1000);

    // Cleanup timer on unmount
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };


  return (
    <View style={styles.container}>
      <View style={styles.callerInfo}>
        <Image source={{ uri: avatar }} style={styles.callerImage} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
        {calling ? (
          <Text style={styles.callDuration}>Calling...</Text>
        ) : (
          <Text style={styles.callDuration}>{formatTime(callDuration)}</Text>
        )}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={{ uri: "https://img.icons8.com/ios/452/video-call.png" }}
            style={{ width: 50, height: 50, tintColor: "white" }}
          />
          <Text style={styles.buttonText}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={{ uri: "https://img.icons8.com/?size=100&id=IEI56YnYhvmJ&format=png&color=000000" }}
            style={{ width: 50, height: 50, tintColor: "white" }}
          />
          <Text style={styles.buttonText}>Mute</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={{ uri: "https://img.icons8.com/?size=100&id=11408&format=png&color=000000" }}
            style={{ width: 50, height: 50, tintColor: "white" }}
          />
          <Text style={styles.buttonText}>Speaker</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.endCallButton}
        onPress={() => {
          setTimeout(() => {
            navigation.popToTop();
            navigation.navigate("Contacts");
          }, 1000);
        }}
      >
        <Text style={styles.endCallText}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 50,
  },
  callerInfo: {
    alignItems: "center",
  },
  callerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
    color: "#a0a0a0",
    marginBottom: 10,
  },
  callDuration: {
    fontSize: 16,
    color: "#a0a0a0",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  actionButton: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    marginTop: 5,
  },
  endCallButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  endCallText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
