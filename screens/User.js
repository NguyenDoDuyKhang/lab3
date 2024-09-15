import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from "react-native";
import ContactThumbnail from "../components/ContactThumbnail";
import colors from "../utils/colors";
import { fetchUserContact } from "../utils/api";

const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // Trạng thái để kiểm soát hiển thị thông tin chi tiết

  // Load data when the component mounts
  useEffect(() => {
    fetchUserContact()
      .then((user) => {
        setUser(user);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  const { avatar, name, phone, email, address, gender } = user;

  const handlePressIn = () => {
    setShowDetails(true); // Hiển thị thông tin khi nhấn giữ
  };

  const handlePressOut = () => {
    setShowDetails(false); // Ẩn thông tin khi thả tay
  };

  // Helper function to get the gender display text
  const getGenderText = (gender) => {
    if (!gender) return 'Not specified';
    switch (gender.toLowerCase()) {
      case 'male':
        return 'Male';
      case 'female':
        return 'Female';
      case 'other':
        return 'Other';
      default:
        return 'Not specified';
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error loading user data...</Text>}
      {!loading && !error && (
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <ContactThumbnail
              avatar={avatar}
              name={name}
              phone={phone}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            />
            {showDetails && (
              <View style={styles.tooltip}>
                <ScrollView contentContainerStyle={styles.tooltipContent}>
                  <Image source={{ uri: avatar }} style={styles.tooltipAvatar} />
                  <Text style={styles.tooltipText}>Name: {name}</Text>
                  <Text style={styles.tooltipText}>Phone: {phone}</Text>
                  <Text style={styles.tooltipText}>Email: {email}</Text>
                  <Text style={styles.tooltipText}>Address: {address}</Text>
                  <Text style={styles.tooltipText}>Gender: {getGenderText(gender)}</Text>
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
  content: {
    alignItems: "center",
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  tooltip: {
    position: 'absolute',
    top: 110, // Adjust this value based on avatar size
    left: 0,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    maxWidth: 250, // Adjust width as needed
    maxHeight: 250, // Adjust height as needed
    overflow: 'hidden',
    alignItems: 'center',
  },
  tooltipContent: {
    alignItems: 'center',
  },
  tooltipAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  tooltipText: {
    fontSize: 14,
    marginVertical: 2,
    color: 'black',
    textAlign: 'center',
    flexShrink: 1, // Allow text to shrink if needed
  },
});

export default User;
