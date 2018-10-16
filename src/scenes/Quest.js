import React, { Component } from 'react';
import { Text, View, StatusBar, StyleSheet, Dimensions, ActivityIndicator, AsyncStorage, TouchableOpacity } from 'react-native';
import ViewGradient from './../components/ViewGradient';
import Colors from '../values/Colors';
import * as Firebase from 'firebase';
import { Font } from 'expo';
import { Header } from 'react-navigation';

export default class Quest extends Component{

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      quest: null,
      fontLoaded: false,
      reveal: 2
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

    let { loading, quest, fontLoaded, reveal }  = this.state;

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
          <View style={styles.right}>
            <TouchableOpacity disabled={reveal <= 0} onPress={() => {this.reveal()}}>
              {fontLoaded ? <Text style={[styles.textReveal, {color: reveal > 0 ? Colors.white : Colors.grey}]}>A*</Text> : null}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          
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
    // backgroundColor: '#500'
  },

  bottom: {
    flex: 1,
    //backgroundColor: '#050'
  },

  body: {
    flex: 7,
    //backgroundColor: '#999',
    justifyContent: 'center'
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
  }

});
