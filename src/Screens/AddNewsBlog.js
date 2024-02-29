import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
let userId = '',
  name = '',
  profileUrl = '';

const AddNewsBlog = ({navigation}) => {
  const [caption, setCaption] = useState('');
  const [data, setData] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    userId = await AsyncStorage.getItem('USERID');
    name = await AsyncStorage.getItem('NAME');
    let email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', email)

      .get()
      .then(querySnapshot => {
        /* ... */
        if (querySnapshot.docs.length === 0) {
          alert('User Not Found');
        } else {
          console.log(querySnapshot.docs[0]._data);
          profileUrl = querySnapshot.docs[0]._data.profileImage;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const saveData = url => {
    firestore()
      .collection('Blogs')
      .add({
        caption: caption,
        name: name,
        userId: userId,
        blogImage: url,
        userImage:profileUrl
      })
      .then(() => {
        console.log('post added!');
        navigation.goBack();
      });
  };
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    console.log(result);
    if (result.didCancel) {
    } else {
      setData(result);
    }
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'BlogApp  Camera Permission',
          message:
            'BlogApp needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const uploadImage = async () => {
    const reference = storage().ref(data.assets[0].fileName);
    const pathToFile = data.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage().ref(data.assets[0].fileName).getDownloadURL();
    console.log(url);
    saveData(url);
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
          backgroundColor: '#3B5998',
          marginTop: 50,
          borderRadius: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          requestCameraPermission();
        }}>
        <Text style={{color: '#fff', fontSize: 16}}>Pick Image</Text>
      </TouchableOpacity>
      {data !== null ? (
        <Image
          source={{uri: data.assets[0].uri}}
          style={{
            width: '90%',
            height: 200,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
      ) : null}
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          backgroundColor: '#3B5998',
          marginTop: 50,
          borderRadius: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          uploadImage();
        }}>
        <Text style={{color: '#fff', fontSize: 16}}>Upload Blog</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewsBlog;