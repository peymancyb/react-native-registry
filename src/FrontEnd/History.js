import React ,{Component} from 'react';
import {Text, View,TextInput, TouchableHighlight } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
import Register from './Register';

export default class History extends Component {
    constructor(props){
    super(props);
  }


static navigationOptions ={
  title: "History",
};

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.containerMain}>
          <Text style={styles.HeadText}>check user details</Text>
      </View>
    );
  }
}
