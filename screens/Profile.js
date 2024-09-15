import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ContactThumbnail from "../components/ContactThumbnail";
import DetailListItem from "../components/DetailListItem";
import { fetchRandomContact } from "../utils/api";
import colors from "../utils/colors";
import {Call, Email} from "./Call";
const Profile = ({ route }) => {
  const { contact } = route.params;
  const { avatar, name, email, phone, cell } = contact;
  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem icon="mail" title="Email" subtitle={email} onPress={() => Email(email)}/>
        <DetailListItem icon="phone" title="Work" subtitle={phone} onPress={() => Call(phone)}/>
        <DetailListItem icon="smartphone" title="Personal" subtitle={cell} onPress={() => Call(phone)} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.pinkik,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: "white",
  },
});
export default Profile;
