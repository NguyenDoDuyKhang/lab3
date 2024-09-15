import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Linking
} from "react-native";
import { fetchContacts } from "../utils/api";
import ContactThumbnail from "../components/ContactThumbnail";
import { useDispatch, useSelector } from 'react-redux';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  const { contacts = [], loading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    fetchContacts()
      .then((contacts) => {
        // setContacts(contacts);
        // setLoading(false);
        // setError(false);
      })
      .catch((e) => {
        // setLoading(false);
        // setError(true);
      });
  }, []);

  const handleLongPress = (phone) => {
    Linking.openURL(`tel:${phone}`) // Thực hiện cuộc gọi
      .catch((err) => console.error('An error occurred', err));
  };

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar, name, phone } = item;
    return (
      <View style={styles.thumbnailContainer}>
        <ContactThumbnail
          avatar={avatar}
          onPress={() => navigation.navigate("Profile", { contact: item })}
          onLongPress={() => handleLongPress(phone)}
        />
        <Text style={styles.nameText}> {name} </Text>
      </View>
    );
  };

  const favorites = contacts.filter((contact) => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  list: {
    alignItems: "center",
  },
  thumbnailContainer: {
    alignItems: "center",
    marginBottom: 10,
    width: '32%', // Tùy chỉnh kích thước
    paddingHorizontal: 10, // Thêm khoảng cách ngang
  },
  nameText: {
    textAlign: 'center',
    marginTop: 5,
  }
});

export default Favorites;
