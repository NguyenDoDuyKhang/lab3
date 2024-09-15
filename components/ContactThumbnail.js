import React from 'react';
import { StyleSheet, View, Pressable, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const ContactThumbnail = ({ 
  name = '', 
  phone = '', 
  avatar = '', 
  textColor = 'black', 
  onPressIn = null, 
  onPressOut = null, 
  onLongPress = null, 
  onPress = null 
}) => {
  const colorStyle = { color: textColor };

  return (
    <Pressable 
      onPressIn={onPressIn} 
      onPressOut={onPressOut} 
      onLongPress={onLongPress} 
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.thumbnail}>
        <Image
          source={{ uri: avatar }}
          style={styles.image}
        />
      </View>
      {name !== '' && (
        <Text style={[styles.name, colorStyle]}>{name}</Text>
      )}
      {phone !== '' && (
        <View style={styles.phoneSection}>
          <Icon name="phone" size={16} style={{ color: textColor }} />
          <Text style={[styles.phone, colorStyle]}>{phone}</Text>
        </View>
      )}
    </Pressable>
  );
};

ContactThumbnail.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  phone: PropTypes.string,
  textColor: PropTypes.string,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onLongPress: PropTypes.func,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 15,
    paddingTop: 10,
  },
  thumbnail: {
    margin: 5,
    width: 80,  // Adjusted size
    height: 80, // Adjusted size
    borderRadius: 40, // Half of width/height
    overflow: 'hidden',
    backgroundColor: '#f0f0f0', // Background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover' // Ensure image does not distort
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  phoneSection: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    marginLeft: 4,
    fontSize: 16,
    color: 'gray',
  },
});

export default ContactThumbnail;
