import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking
} from "react-native";
import { fetchContacts } from "../utils/api";
import ContactListItem from "../components/ContactListItem";
import CallScreen from "./Call2";
import {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
} from "../components/store"; // Redux action creators

import { useDispatch, useSelector } from "react-redux";
import Call from "./Call";

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
  const dispatch = useDispatch();
  
  // Providing a default empty array for contacts
  // const { contacts = [], loading, error } = useSelector((state) => state.contacts);
  const { contacts = [], loading, error } = useSelector((state) => {
    // console.log('Redux state:', state); // Check if contacts are updating correctly
    // console.log(contacts)
    return state.contacts;
  });
  
  // useEffect(() => {
  //   const loadContacts = async () => {
  //     dispatch(fetchContactsLoading());
  //     try {
  //       const contacts = await fetchContacts();
  //       // console.log('Fetched contacts:', contacts)
  //       dispatch(fetchContactsSuccess(contacts));
  //       // alert('reached here') // success here already
  //     } catch (e) {
  //       console.error("Error fetching contacts: ", e);
        
  //       dispatch(fetchContactsError());
  //     }
  //   };

  //   loadContacts();
  // }, [dispatch]);
  useEffect(() => {
    const loadContacts = async () => {
      dispatch(fetchContactsLoading());
      try {
        const contacts = await fetchContacts();
        dispatch(fetchContactsSuccess(contacts));  // Ensure this action is correctly dispatched
        // console.log(contacts)
      } catch (e) {
        dispatch(fetchContactsError());
      }
    };
  
    loadContacts();
  }, [dispatch]);
  
  // Safeguard against undefined contacts
  // const contactsSorted = (contacts || []).slice().sort((a, b) => a.name.localeCompare(b.name));
  const contactsSorted = (contacts);

  const renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    // console.log(item)
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate("Profile", { contact: item })}
        onLongPress={() => Call(phone)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text>Error loading contacts...</Text>}
      {!loading && !error && (
        <FlatList
          data={contactsSorted}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
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
});

export default Contacts;
