import React , {PureComponent} from 'react';
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
import Toast, {DURATION} from 'react-native-easy-toast';

var date = new Date();
var fullDate = date.toDateString();

export default class MainButtons extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      presentStatus: true,
      absentStatus: true,
      lateStatus: true,

      status: null,

    };

    this.currentUserUid = FB.auth().currentUser.uid;

    this._presentButton = this._presentButton.bind(this);
    this._absentButton = this._absentButton.bind(this);
    this._lateButton = this._lateButton.bind(this);
    this._submitData = this._submitData.bind(this);
    this._Reset = this._Reset.bind(this);
  }

_Reset(){
  console.log("reset!");
  this.setState({
    presentStatus: true,
    absentStatus: true,
    lateStatus: true,

    status: null,
  });
}

_submitData(props){
  if(props!=null && this.state.status != null)
      FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fbDatabaseNodeName+'/studet_list/'+ props.userID +"/"+ fullDate +"/").set({
        Attendance: this.state.status,
  });
  else{
    this.refs.toast.show('Please choose an option!');
  }
  // this.refs.toast.show('saved!');
}

_presentButton(){
  this.setState({
    presentStatus: this.state.presentStatus ? false : true,
    absentStatus:true,
    lateStatus:true,
    status:"Present",
  });
}

_absentButton(){
  this.setState({
    absentStatus: this.state.absentStatus ? false : true,
    lateStatus:true,
    presentStatus:true,
    status: "Absent",
  });
}

_lateButton(){
  this.setState({
    lateStatus: this.state.lateStatus ? false : true,
    absentStatus:true,
    presentStatus:true,
    status:"Late",
  });
}

render(){
    return(
      <View>
          <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
            <TouchableHighlight
              style={this.state.presentStatus ? styles.defaultButton : styles.presentIsChecked}
              onPress={this._presentButton}
              >
              <Text style={this.state.presentStatus ? styles.colorOffStatus : styles.colorOnStatus}>Present</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={this.state.absentStatus ? styles.defaultButton : styles.absentIsChecked}
              onPress={this._absentButton}
              >
              <Text style={this.state.absentStatus ? styles.colorOffStatus : styles.colorOnStatus}>Absent</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={this.state.lateStatus ? styles.defaultButton : styles.lateIsChecked}
              onPress={this._lateButton}
              >
              <Text style={this.state.lateStatus ? styles.colorOffStatus : styles.colorOnStatus}>Late</Text>
            </TouchableHighlight>
          </View>
          <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
            <TouchableHighlight
              style={styles.confirmStyle}
              onPress={()=>this._submitData(this.props)}
              underlayColor={"#00a79d"}
              >
              <Text style={{fontSize:18,color:"#535353",}}>Confirm</Text>
            </TouchableHighlight>
          </View>
          <Toast
            ref="toast"
            position="center"
            defaultCloseDelay={100}
            opacity={1}
          />
      </View>
    );
  }
}
