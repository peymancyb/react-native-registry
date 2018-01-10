import React,{Component} from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';


export default class ProfileHistory extends Component{
  constructor(props){
    super(props);

  }
  render(){
    const { goBack } = this.props.navigation;
    return(
      <View>
        <Text>History set up</Text>
        <Button
            title="Go back"
            onPress={() => goBack()}
          />
      </View>
    );
  }
}
