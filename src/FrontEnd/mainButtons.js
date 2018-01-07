import React , {Component,PureComponent} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import styles from './style';
import {fbDatabaseNodeName} from './Classes';
import FB from '../BackEnd/firebase';
import {resetButtons} from './MainPage';
import {buttonStyle , buttonState} from './MainPage';
import {
  Fab,
  Button,
}from 'native-base';
import {Entypo, Feather, MaterialIcons,EvilIcons} from '@expo/vector-icons';



// console.log(buttonStyle+" "+buttonState);
  // let date = new Date();
  // let fullDate = date.toDateString();

export var student_pal_data = [];

export default class MainButtons extends Component{
  defaultState = {
      presentStatus: true,
      absentStatus: true,
      lateStatus: true,
      status: null,
      buttonStatus:false,
     };
  constructor(props){
    super(props);
    //setting default state
    this.state = this.defaultState;
    // this.currentUserUid = FB.auth().currentUser.uid;
    this._presentButton = this._presentButton.bind(this);
    this._absentButton = this._absentButton.bind(this);
    this._lateButton = this._lateButton.bind(this);
    this._storeData = this._storeData.bind(this);
  }

_storeData(currentData){
    student_pal_data.push(currentData);
    console.log("dummy_data size:"+student_pal_data.length);
  }

_presentButton(props){
  this.setState({
    presentStatus: this.state.presentStatus ? false : true,
    absentStatus:true,
    lateStatus:true,
    buttonStatus:true,
    status: (this.state.status == null || this.state.status == "Absent" || this.state.status == "Late" ) ? "Present" : null,
  });
  let itemObj = {
    user_id:props.userID,
    user_name:props.userName,
    user_lastName:props.userSurName,
    user_status:"Present",
  };
  if(this.state.presentStatus == true){
    this._storeData(itemObj);
  }
}

_absentButton(props){
  this.setState({
    absentStatus: this.state.absentStatus ? false : true,
    lateStatus:true,
    presentStatus:true,
    buttonStatus:true,
    status: (this.state.status == null || this.state.status == "Late" || this.state.status == "Present") ? "Absent" : null,
  });
  let itemObj ={
    user_id:props.userID,
    user_name:props.userName,
    user_lastName:props.userSurName,
    user_status:"Absent",
  };
  if(this.state.absentStatus == true){
    this._storeData(itemObj);
  }
}

_lateButton(props){
  this.setState({
    lateStatus: this.state.lateStatus ? false : true,
    absentStatus:true,
    presentStatus:true,
    buttonStatus:true,
    status: (this.state.status == null || this.state.status == "Absent" || this.state.status == "Present") ? "Late" : null,
  });
  let itemObj ={
    user_id:props.userID,
    user_name:props.userName,
    user_lastName:props.userSurName,
    user_status:"Late",
  };
  if(this.state.lateStatus == true){
    this._storeData(itemObj);
  }
}

render(){
    return(
      <View style={{flex:1}}>
          <View style={{flexDirection:"row"}}>
            <TouchableHighlight
              disabled={this.state.buttonStatus}
              style={this.state.presentStatus ? styles.defaultButton : styles.presentIsChecked}
              onPress={()=>this._presentButton(this.props)}
              >
              <Text style={this.state.presentStatus ? styles.colorOffStatus : styles.colorOnStatus}>Present</Text>
            </TouchableHighlight>
            <TouchableHighlight
              disabled={this.state.buttonStatus}
              style={this.state.absentStatus ? styles.defaultButton : styles.absentIsChecked}
              onPress={()=>this._absentButton(this.props)}
              >
              <Text style={this.state.absentStatus ? styles.colorOffStatus : styles.colorOnStatus}>Absent</Text>
            </TouchableHighlight>
            <TouchableHighlight
              disabled={this.state.buttonStatus}
              style={this.state.lateStatus ? styles.defaultButton : styles.lateIsChecked}
              onPress={()=>this._lateButton(this.props)}
              >
              <Text style={this.state.lateStatus ? styles.colorOffStatus : styles.colorOnStatus}>Late</Text>
            </TouchableHighlight>
          </View>
      </View>
    );
  }
}
