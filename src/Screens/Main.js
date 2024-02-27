import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Main = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'black',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            marginLeft: 20,
            fontSize: 18,
            fontWeight: '700',
          }}>
          FACEBOOK
        </Text>
        <Text
          style={{
            color: '#fff',
            marginRight: 20,
            fontSize: 18,
            fontWeight: '700',
          }}>
          Profile
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: 150,
          height: 50,
          borderRadius: 30,
          backgroundColor: 'black',
          position: 'absolute',
          right: 20,
          bottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('AddNewsBlog');
        }}>
        <Text style={{color: '#fff'}}>Add News</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
