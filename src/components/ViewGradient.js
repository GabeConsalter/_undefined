import React, { Component } from 'react';
import { Text, View, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';
import Colors from '../values/Colors';

export default class Quest extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <LinearGradient
          style={styles.background}
          colors={Colors.gradient.dark}>

            {this.props.children}

          </LinearGradient>
      </View>
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
  }

});
