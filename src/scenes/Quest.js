import React, { Component } from 'react';
import { Text,View, StatusBar, StyleSheet, Dimensions, ActivityIndicator, AsyncStorage, TouchableOpacity, TextInput } from 'react-native';
import ViewGradient from './../components/ViewGradient';
import Colors from '../values/Colors';
import * as Firebase from 'firebase';
import { Font } from 'expo';
import { Header } from 'react-navigation';
import Bar from '../components/Bar';

export default class Quest extends Component{

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      quest: null,
      fontLoaded: false,
      countdown: 0
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

    this.setState({ fontLoaded: true });
  }

  render(){

    let { loading, quest, fontLoaded }  = this.state;

    return(
      <ViewGradient>
        <StatusBar barStyle='light-content'/>
        <View style={styles.header}>
          <View style={styles.left}>
            {fontLoaded ? <Text style={styles.questID}>#1</Text> : null}
          </View>
          <View style={styles.title}>
            {fontLoaded ? <Text style={styles.textTitle}>_u</Text> : null}
          </View>
          <View style={styles.right}/>
        </View>
        <View style={styles.body}>
          {fontLoaded ? (
            <TextInput
              style={styles.input}
              autoCapitalize='characters'/>
          ) : null}
          <Bar/>
          <View style={styles.actions}> 
            {fontLoaded ? <Text style={styles.countdown}>5</Text> : null}
            <TouchableOpacity style={{flex: 1}}>
              {fontLoaded ? <Text style={styles.ok}>OK</Text> : null}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>

        </View>
      </ViewGradient>
    );
  }

  reveal(){

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

  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },

  bottom: {
    flex: 1
  },

  body: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },

  left: {
    flex: 1
  },

  title: {
    flex: 3
  },

  right: {
    flex: 1
  },

  textTitle: {
    color: Colors.grey,
    fontFamily: 'CutiveMono',
    fontSize: 24,
    textAlign: 'center'
  },

  questID: {
    fontSize: 24,
    color: Colors.grey,
    fontFamily: 'CutiveMono',
    textAlign: 'center'
  },

  textReveal: {
    fontSize: 24,
    fontFamily: 'CutiveMono',
    textAlign: 'center'
  },

  input: {
    width: Dimensions.get('window').width * .8,
    fontSize: 32,
    marginBottom: 2,
    color: Colors.grey,
    textAlign: 'center',
    fontFamily: 'CutiveMono'
  },

  actions: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * .8
  },

  ok: {
    fontSize: 24,
    color: Colors.white,
    fontFamily: 'CutiveMono',
    alignSelf: 'flex-end'
  },

  countdown: {
    fontFamily: 'CutiveMono',
    fontSize: 24,
    color: Colors.grey,
    flex: 1
  }

});
