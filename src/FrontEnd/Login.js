import React ,{Component} from 'react';
import {
   Text,
   View,
   TextInput,
   TouchableHighlight,
   Image,
   KeyboardAvoidingView
 } from 'react-native';
 import {
   Container,
   Content,
   Body,
   Header,
   Footer,
 }from 'native-base';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator} from 'react-navigation';
import {Entypo} from '@expo/vector-icons';
import Register from './Register';
import ListClasses from './Classes';
import HomePage from './Main';

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
    let date = new Date();
    let fullDate= date.toDateString();
      if (user) {
        // User is signed in.
        FB.database().ref('/singed_in_users').child(fullDate).set(
          {
            user_email: user.email,
            user_uid: user.uid,
            user_displayName: user.displayName,
            user_emailVerified: user.emailVerified,
            user_photo: user.photoURL,
            user_anonymous: user.isAnonymous,
            user_providerData: user.providerData,
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
  //header on android has problems(solved)
  headerStyle:{
    backgroundColor:'white',
    borderBottomWidth:0,
    elevation: 0, //remove header shadow form android
    shadowOpacity: 0, //remove header shadwo from ios
  },
};

  render() {
    return (
      <Container style={styles.BackgroundColor}>
        <Content>
          <KeyboardAvoidingView behavior="padding">
          <Body>
            <Image source={require("../pictures/logo_era.png")} style={{width:75, height:75}} />
            <Text style={styles.HeadText}>European Regional Educational Academy</Text>
                <View style={styles.marginPercentageFromTop}>
                  <View style={styles.inputRow}>
                    <Entypo  name="users" size={20} color={"#0f6abc"} style={styles.iconStyle} />
                    <TextInput
                      style = {styles.inputStyle}
                      placeholder = {'Email'}
                      value = {this.state.UserEmail}
                      onChangeText = {(Email)=>this.setState({UserEmail: Email})}
                      autoCapitalize= {"none"}
                      multiline={false}
                      maxLength ={320}
                      underlineColorAndroid={'transparent'}
                      placeholderTextColor={"#0f6abc"}
                    />
                  </View>
                <View style={styles.inputRow}>
                  <Entypo  name="lock" size={20} color={"#0f6abc"} style={styles.iconStyle}/>
                  <TextInput
                    style = {styles.inputStyle}
                    placeholder = {"Password"}
                    value = {this.state.UserPassword}
                    onChangeText = {(Password)=>this.setState({UserPassword: Password})}
                    autoCapitalize= {"none"}
                    multiline={false}
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}
                    placeholderTextColor={"#0f6abc"}
                  />
                </View>
              </View>
            <View style={styles.marginPercentageFromTop}>
              <View style={styles.center}>
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
          </Body>
        </KeyboardAvoidingView>
        </Content>
    </Container>
    );
  }
}






{/* <Container
  style={styles.BackgroundColor}>
  <Content>
    <Body>
      <Body>
        <Image source={require("../pictures/logo_era.png")} style={{width:75, height:75}} />
        <Text style={styles.HeadText}>European Regional Educational Academy</Text>
      </Body>
      <Body>
        <KeyboardAvoidingView>
        <View style={styles.inputRow}>
          <Entypo  name="users" size={20} color={"#0f6abc"} style={styles.iconStyle} />
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
            placeholderTextColor={"#0f6abc"}
          />
      </View>
      <View style={styles.inputRow}>
        <Entypo  name="lock" size={20} color={"#0f6abc"} style={styles.iconStyle}/>
        <TextInput
          style = {styles.inputStyle}
          placeholder = {"Password"}
          value = {this.state.UserPassword}
          onChangeText = {(Password)=>this.setState({UserPassword: Password})}
          autoCapitalize= {"none"}
          multiline={false}
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
          placeholderTextColor={"#0f6abc"}
        />
      </View>
      </KeyboardAvoidingView>
    </Body>
    <Body>
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
    </Body>
    </Body>
  </Content>
</Container> */}
