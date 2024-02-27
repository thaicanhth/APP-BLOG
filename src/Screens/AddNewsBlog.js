import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddNewsBlog = () => {
  const [caption, setCaption] = useState('');
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    userId = await AsyncStorage.getItem('USERID');
  };
  const saveData = () => {
    firestore()
      .collection('Blogs')
      .add({
        caption: caption,
        userId: userId,
      })
      .then(() => {
        console.log('post added!');
      });
  };
  return (
    <View style={{flex: 1}}>
      <TextInput
        placeholder="Enter Caption"
        value={caption}
        onChangeText={txt => {
          setCaption(txt);
        }}
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          marginTop: 50,
          alignSelf: 'center',
          borderWidth: 1,
          paddingLeft: 20,
        }}
      />
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          backgroundColor: 'black',
          marginTop: 50,
          borderRadius: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          saveData();
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
          }}>
          Upload Blog
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewsBlog;
