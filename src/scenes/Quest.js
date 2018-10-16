import React, { Component } from 'react';
import { Text, View, StatusBar, StyleSheet, Dimensions, ActivityIndicator, AsyncStorage } from 'react-native';
import ViewGradient from './../components/ViewGradient';
import Colors from '../values/Colors';
import * as Firebase from 'firebase';
import { Font } from 'expo';

export default class Quest extends Component{

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      quest: null,
      fontLoaded: false
    }
  }

  async componentWillMount(){
    Firebase.database().ref('quests').once('value').then((snapshot) => {
      console.log(snapshot.val());
      this.setState({quest: snapshot.val()});
    });

    await AsyncStorage.getItem('quest')
      .then((quest) => {
        console.log(quest);
      });
  }

  async componentDidMount(){
    await Font.loadAsync({
      'CutiveMono': require('../../assets/fonts/CutiveMono-Regular.ttf')
    });

    this.setState({ fontLoaded: true })
  }

  render(){

    let { loading, quest, fontLoaded }  = this.state;

    return(
      <ViewGradient>
        <StatusBar barStyle='light-content'/>
        <View style={styles.body}>
          {fontLoaded ? (
            <Text style={{color: 'white', fontFamily: 'CutiveMono'}}>Hello</Text>
            ) : null
          }
        </View>
        <View style={styles.bottom}>

        </View>
      </ViewGradient>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  background: {
    width: '100%',
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1
  },

  top: {
    flex: 1,
    //backgroundColor: '#500'
  },

  bottom: {
    flex: 1,
    //backgroundColor: '#050'
  },

  body: {
    flex: 7,
    //backgroundColor: '#999',
    justifyContent: 'center'
  }

});
