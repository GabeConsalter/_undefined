import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import * as Firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import { Font } from 'expo';
import { Tester, TestHookStore } from 'cavy';
import QuestSpec from './specs/QuestSpec';

//scenes
import Quest from './src/scenes/Quest';

const testHookStore = new TestHookStore();

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD6Q0MNDkiBTxBxL4WvHawO0i9Gkw4kHkY",
  authDomain: "undefined-cfda5.firebaseapp.com",
  databaseURL: "https://undefined-cfda5.firebaseio.com",
  projectId: "undefined-cfda5",
  storageBucket: "undefined-cfda5.appspot.com",
  messagingSenderId: "579319703857"
};

const Navigator = createStackNavigator({

  Quest: {
    screen: Quest,
    navigationOptions: { header: null }
  }
  
});

export default class App extends React.Component {

  constructor(props){
    super(props);
    
    Firebase.initializeApp(firebaseConfig);
  }

  async componentWillMount(){
    await AsyncStorage.getItem('quest')
      .then((quest) => {
        console.log('App', quest);
        if(!quest)
          AsyncStorage.setItem('quest', '1');
      });
  }

  componentDidMount(){
    Font.loadAsync({
      'CutiveMono': require('./assets/fonts/CutiveMono-Regular.ttf')
    });
  }

  render() {

    return (
      <Tester specs={[QuestSpec]} store={testHookStore} waitTime={4000}>
        <Navigator/>
      </Tester>
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
