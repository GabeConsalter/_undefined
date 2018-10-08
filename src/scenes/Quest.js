import React, { Component } from 'react';
import { Text, View, StatusBar, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import ViewGradient from './../components/ViewGradient';
import Colors from '../values/Colors';

export default class Quest extends Component{

  constructor(props){
    super(props);

    this.state = {
      loading: true
    }
  }

  componentWillMount(){
  }

  render(){

    let { loading }  = this.state;

    return(
      <ViewGradient>
        <View style={styles.top}>

        </View>
        <View style={styles.body}>
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
