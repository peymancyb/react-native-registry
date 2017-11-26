import React ,{Component} from 'react';
import {
   Text,
   View,
   TextInput,
   TouchableHighlight,
   Image
 } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator} from 'react-navigation';

import Register from './Register';
import ListClasses from './Classes';
import HomePage from './Main';


import {MODAL_COMPONENT} from './common-components';

import {Entypo} from '@expo/vector-icons';

export default class Login extends Component {
    constructor(props){
    super(props);

    //solving timer error
    console.ignoredYellowBox = [
    'Setting a timer'
    ];

    this.state = {
      UserEmail:'',
      UserPassword:'',
    };
    this._onLogin = this._onLogin.bind(this);
    this._onSignup = this._onSignup.bind(this);
  }


//Login process
_onLogin(){
  var currentUser = FB.auth().currentUser;
  const { navigate } = this.props.navigation;
  FB.auth().signInWithEmailAndPassword(this.state.UserEmail,this.state.UserPassword)
  .then(()=>{
        navigate("ListClasses");
      })
    .catch(function(error){
        if(error){
          alert(error.message);
        }
      }
    );

  FB.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        let providerData = user.providerData;
        //get date
        let date = new Date();
        let fullDate= date.toDateString();
        FB.database().ref('/singed_in_users').child(fullDate).set(
          {
            user_email: email,
            user_uid: uid,
            user_displayName: displayName,
            user_emailVerified: emailVerified,
            user_photo: photoURL,
            user_anonymous: isAnonymous,
            user_providerData: providerData,
          }
        );
        // ...
      } else {
        // User is signed out.
        FB.database().ref('/signed_out_users').child(fullDate).set(
          {
            user_email: email,
            user_uid: uid,
            user_displayName: displayName,
            user_emailVerified: emailVerified,
            user_photo: photoURL,
            user_anonymous: isAnonymous,
            user_providerData: providerData,
          }
        );
        // ...
      }
    });
}

_onSignup(){
  const { navigate } = this.props.navigation;
  navigate("Register");
}

static navigationOptions ={
  header: null,
};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.HeadText}>Registery</Text>
          <View style={styles.inputRow}>
            <Entypo  name="users" size={20} color={"#00a79d"} style={styles.iconStyle} />
            <TextInput
              autoFocus= {true}
              style = {styles.inputStyle}
              placeholder = {'Email'}
              value = {this.state.UserEmail}
              onChangeText = {(Email)=>this.setState({UserEmail: Email})}
              autoCapitalize= {"none"}
              multiline={false}
              maxLength ={320}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={"white"}
            />
        </View>
        <View style={styles.inputRow}>
          <Entypo  name="lock" size={20} color={"#00a79d"} style={styles.iconStyle}/>
          <TextInput
            style = {styles.inputStyle}
            placeholder = {"Password"}
            value = {this.state.UserPassword}
            onChangeText = {(Password)=>this.setState({UserPassword: Password})}
            autoCapitalize= {"none"}
            multiline={false}
            secureTextEntry={true}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={"white"}
          />
        </View>
        <View style={styles.marginTopButtons}>
          <TouchableHighlight
            underlayColor={"#00a79d"}
            activeOpacity={1}
            style={styles.loginButton}
            onPress={this._onLogin}>
            <Text style={styles.signInCenterText}>Log in</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#00a79d"}
            activeOpacity={1}
            style={styles.SignUpButton}
            onPress={this._onSignup}>
            <Text style={styles.signUpCenterText}>Register</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
