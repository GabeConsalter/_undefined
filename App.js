import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD6Q0MNDkiBTxBxL4WvHawO0i9Gkw4kHkY",
  authDomain: "undefined-cfda5.firebaseapp.com",
  databaseURL: "https://undefined-cfda5.firebaseio.com",
  storageBucket: "undefined-cfda5.appspot.com"
};

export default class App extends React.Component {

  constructor(props){
    super(props);
    
    Firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
