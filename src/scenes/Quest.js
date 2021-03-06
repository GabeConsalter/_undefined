import { Font } from 'expo';
import * as Firebase from 'firebase';
import React, { Component } from 'react';
import { AsyncStorage, Dimensions, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Keyboard } from 'react-native';
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
      id: null,
      sended: false,
      response: ''
    }
  }

  async componentWillMount(){

    await AsyncStorage.getItem('quest')
      .then((quest) => {
        Firebase.database().ref(`quests/${quest}`).on('value', (data) => {
          this.setState({ 
            quest: data.val() ? data.val() : 'no questions',
            id: quest,
            countdown: data.val() ? data.val().answer.toString().length : 0
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

    let { loading, quest, fontLoaded, input, id, countdown, sended, response }  = this.state;

    if(quest && fontLoaded)
      if(quest === 'no questions')
        return (
          <ViewGradient>
            <StatusBar barStyle='light-content'/>
            <View style={styles.header}>
              <View style={styles.left}/>
              <View style={styles.title}>
                <Text style={styles.textTitle}>_undefined</Text>
              </View>
              <View style={styles.right}/>
            </View>
            <View style={styles.body}>
              <Text style={styles.soon}>You're good. {'\n'}More questions soon...</Text>
              <TouchableOpacity onPress={() => {this.restart()}}>
                <Text style={styles.restart}>Restart all questions</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottom}/>
          </ViewGradient>
        );
      else
        return (
          <ViewGradient>
            <StatusBar barStyle='light-content'/>
            <View style={styles.header}>
              <View style={styles.left}>
                <Text style={styles.questID}>#{id}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.textTitle}>_undefined</Text>
              </View>
              <View style={styles.right}/>
            </View>
            <View style={styles.body}>
              <Text style={styles.quest} selectable={true}>{quest.description}</Text>
              <TextInput
                ref='input'
                value={input}
                style={styles.input}
                autoCapitalize='characters'
                editable={!sended}
                autoFocus={true}
                maxLength={quest.answer.toString().length}
                autoCorrect={false}
                keyboardType={quest.type === 'text' ? 'default' : 'numeric'}
                keyboardAppearance='dark'
                onChangeText={(input) => {
                  this.setState({
                    input,
                    countdown: quest.answer.toString().length - input.length
                  });

                  if(input.length === quest.answer.toString().length){
                    Keyboard.dismiss();
                    this.setState({ sended: true });
                    this.ok(input);
                  }
                }}/>
              <Bar
                total={quest.answer.toString().length}
                current={input.length}/>
              <View style={styles.actions}> 
                <Text style={styles.countdown}>{countdown}</Text>
                <Text style={styles.response}>{response}</Text>
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
              {fontLoaded ? <Text style={styles.textTitle}>_undefined</Text> : null}
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

  ok(input){

    let { quest } = this.state;

    if(input.toString().toUpperCase() === quest.answer.toString().toUpperCase())
      this.correct();
    else
      this.incorrect();
  }

  correct(){

    this.setState({ response: 'YEAH!' });

    setTimeout(() => {
      this.setState({
        sended: false,
        response: '',
        input: ''
      });

      this.next();
    }, 1000);
  };

  incorrect(){

    this.setState({ response: 'NOP' });

    setTimeout(() => {
      this.setState({
        sended: false,
        response: '',
        input: '',
        countdown: this.state.quest.answer.toString().length
      });

      this.refs.input.focus();
    }, 1000);

  }

  next(){
    let { id } = this.state;

    AsyncStorage.setItem('quest', `${Number(id) + 1}`);

    Firebase.database().ref(`quests/${Number(id) + 1}`).on('value', (data) => {

      if(data.val()){
        this.setState({ 
          quest: data.val(),
          id: Number(id) + 1,
          countdown: data.val().answer.toString().length
        });

        this.refs.input.focus();
      }
      else
        this.setState({
          quest: 'no questions',
          id: null,
          countdown: 0
        });
    });

  }

  restart(){

    

    AsyncStorage.setItem('quest', '1');

    Firebase.database().ref(`quests/1`).on('value', (data) => {

      if(data.val()){
        this.setState({ 
          quest: data.val(),
          id: 1,
          countdown: data.val().answer.toString().length
        });
      }
      else
        this.setState({
          quest: 'no questions',
          id: null,
          countdown: 0
        });
    });

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
    paddingBottom: 64,
    paddingHorizontal: 32
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
    fontSize: 24,
    fontFamily: 'CutiveMono',
    color: Colors.grey,
    marginBottom: 32,
    textAlign: 'center'
  },

  response: {
    flex: 1,
    fontFamily: 'CutiveMono',
    color: Colors.white,
    fontSize: 24,
    textAlign: 'right'
  },

  soon: {
    textAlign: 'center',
    fontFamily: 'CutiveMono',
    fontSize: 24,
    color: Colors.grey,
    marginBottom: 32
  },

  restart: {
    textAlign: 'center',
    fontFamily: 'CutiveMono',
    fontSize: 24,
    color: Colors.white
  }

});
