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
          this.setState({ 
            quest: data.val(),
            id: quest,
            countdown: data.val().answer.length
          });
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

    let { loading, quest, fontLoaded, input, id, countdown }  = this.state;

    if(quest && fontLoaded)
      return (
        <ViewGradient>
          <StatusBar barStyle='light-content'/>
          <View style={styles.header}>
            <View style={styles.left}>
              <Text style={styles.questID}>#{id}</Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.textTitle}>_u</Text>
            </View>
            <View style={styles.right}/>
          </View>
          <View style={styles.body}>
            <Text style={styles.quest}>{quest.description}</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='characters'
              autoFocus={true}
              maxLength={quest.answer.length}
              autoCorrect={false}
              onEndEditing={() => {this.ok()}}
              onChangeText={(input) => {
                this.setState({
                  input,
                  countdown: quest.answer.length - input.length
                });
              }}/>
            <Bar
              total={quest.answer.length}
              current={input.length}/>
            <View style={styles.actions}> 
              <Text style={styles.countdown}>{countdown}</Text>
              <TouchableOpacity disabled={countdown !== 0} style={{flex: 1}} onPress={() => {this.ok();}}>
                <Text style={[styles.ok, {color: countdown === 0 ? Colors.white : Colors.grey}]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottom}/>
        </ViewGradient>
      );
    else
      return (
        <ViewGradient>
          <StatusBar barStyle='light-content'/>
          <View style={styles.header}>
            <View style={styles.left}/>
            <View style={styles.title}>
              {fontLoaded ? <Text style={styles.textTitle}>_u</Text> : null}
            </View>
            <View style={styles.right}/>
          </View>
          <View style={styles.body}>
            <ActivityIndicator color={Colors.white} />
          </View>
          <View style={styles.bottom}/>
        </ViewGradient>
      );
  }

  reveal(){

  }

  ok(){
    console.log('ok');
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
