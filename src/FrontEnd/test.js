import React , {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import styles from './style';
import MainButtons from './mainButtons';

export default class TestBackground extends PureComponent{
  constructor(props){
    super(props);

  }
  render(){
    return(
      <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
      <MainButtons/>
      </View>
    );
  }
}
