import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const saveData = () => {
    const userId = uuid.v4();
    firestore()
      .collection('Users')
      .doc(userId)
      .set({
        name: name,
        userId: userId,
        email: email,
        password: password,
      })
      .then(() => {
        console.log('User added');
      });
  };
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '800',
          alignSelf: 'center',
          marginTop: 100,
        }}>
        Sign up
      </Text>
      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={txt => {
          setName(txt);
        }}
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 50,
          paddingLeft: 20,
        }}
      />
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={txt => {
          setEmail(txt);
        }}
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 20,
        }}
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => {
          setPassword(txt);
        }}
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 20,
        }}
      />
      <TouchableOpacity
      
        style={{
          marginTop: 20,
          width: '90%',
          height: 50,
          backgroundColor: 'black',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}
        onPress={() => {
          if (name != '' && email !== '' && password !== '') {
            saveData();
          } else {
            alert('Please Enter All Data');
          }
        }}>
        <Text style={{color: '#fff', fontSize: 18}}>Sign up</Text>
        </TouchableOpacity>
      <Text
        style={{
          textDecorationLine: 'underline',
          fontSize: 18,
          marginTop: 60,
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        {'Already have account'}
      </Text>
    </View>
  );
};

export default Signup;
