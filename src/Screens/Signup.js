import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false); // Thêm state mới

  const saveData = () => {
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          Alert.alert('Error', 'Email already exists');
        } else {
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
              setSignupSuccess(true); // Đặt trạng thái đăng ký thành công
            });
        }
      });
  };

  // Hàm hiển thị thông báo thành công và chuyển hướng sang màn hình đăng nhập
  const showSuccessAlertAndNavigateToLogin = () => {
    Alert.alert(
      'Success',
      'Signed up successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Login'); // Chuyển hướng sang màn hình đăng nhập
          },
        },
      ],
      {cancelable: false},
    );
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
          if (name !== '' && email !== '' && password !== '') {
            saveData();
          } else {
            alert('Please Enter All Data');
          }
        }}>
        <Text style={{color: '#fff', fontSize: 18}}>Sign up</Text>
      </TouchableOpacity>

      {/* Hiển thị thông báo khi đăng ký thành công */}
      {signupSuccess && showSuccessAlertAndNavigateToLogin()}

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
      <View style={{
        marginTop:20,
        flexDirection:'row',
        alignSelf: 'center',
      }}>
      <TouchableOpacity style={{
        width:40,
        height:40,
        padding:10,
        backgroundColor:'#3B5998',
        borderRadius: 50,
        justifyContent:'center',
        alignItems: 'center',
        margin: 5,
      }}>
        <Icon name="facebook-f" size={20} color={'white'}></Icon>
      </TouchableOpacity>
      <TouchableOpacity style={{
        width:40,
        height:40,
        padding:10,
        backgroundColor:'#EA4335',
        borderRadius: 50,
        justifyContent:'center',
        alignItems: 'center',
        margin: 5,
      }}>
        <Icon name="google" size={20} color={'white'}></Icon>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
