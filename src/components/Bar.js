import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Colors from '../values/Colors';

export default class Bar extends Component{
  constructor(props){
    super(props);

    this.state = {
      widthTwo: '0%'
    }
  }

  render(){

    let { widthTwo } = this.state;

    return(
      <View style={styles.container}>
        <View style={[styles.one]}/>
        <View style={[styles.two, {width: ((this.props.current * 100) / (this.props.total)) + '%' }]}/>
      </View>
    );
  }
}

const styles = {

  container: {
    width: Dimensions.get('window').width * .8
  },

  one: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.grey,
    position: 'absolute'
  },

  two: {
    height: 1,
    backgroundColor: Colors.white
  }
}