import { Font } from 'expo';
import * as Firebase from 'firebase';
import React, { Component } from 'react';
import { AsyncStorage, Dimensions, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Bar from '../components/Bar';
import Colors from '../values/Colors';
import ViewGradient from './../components/ViewGradient';

export default class Quest extends Component{

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      quest: null,
      fontLoaded: false,
      countdown: 0,
      input: '',
      id: null
    }
  }

  async componentWillMount(){

    await AsyncStorage.getItem('quest')
      .then((quest) => {
        Firebase.database().ref(`quests/${quest}`).on('value', (data) => {
          this.setState({ quest: data.val() });
          this.setState({ id: quest });
        });
      });

  }

  async componentDidMount(){
    await Font.loadAsync({
      'CutiveMono': require('../../assets/fonts/CutiveMono-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render(){

    let { loading, quest, fontLoaded, input, id }  = this.state;

    return(
      <ViewGradient>
        <StatusBar barStyle='light-content'/>
        <View style={styles.header}>
          <View style={styles.left}>
            {fontLoaded && quest ? <Text style={styles.questID}>#{id}</Text> : null}
          </View>
          <View style={styles.title}>
            {fontLoaded ? <Text style={styles.textTitle}>_u</Text> : null}
          </View>
          <View style={styles.right}/>
        </View>
        <View style={styles.body}>
          {fontLoaded && quest ? <Text style={styles.quest}>{quest.description}</Text> : null}
          {fontLoaded ? (
            <TextInput
              style={styles.input}
              autoCapitalize='characters'/>
          ) : null}
          <Bar/>
          <View style={styles.actions}> 
            {fontLoaded && quest ? <Text style={styles.countdown}>{quest.answer.length}</Text> : null}
            <TouchableOpacity style={{flex: 1}}>
              {fontLoaded && input !== '' ? <Text style={styles.ok}>OK</Text> : null}
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
    alignItems: 'center',
    paddingBottom: 64
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
  },

  quest: {
    fontSize: 32,
    fontFamily: 'CutiveMono',
    color: Colors.grey,
    marginBottom: 32
  }

});
