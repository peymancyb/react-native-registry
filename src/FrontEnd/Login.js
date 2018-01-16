import React ,{Component} from 'react';
import {
   Text,
   View,
   TextInput,
   TouchableHighlight,
   Image,
   KeyboardAvoidingView,
   ActivityIndicator,
 } from 'react-native';
 import {
   Container,
   Content,
   Body,
   Header,
   Footer,
   Button,
 }from 'native-base';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator} from 'react-navigation';
import {Entypo} from '@expo/vector-icons';
import Register from './Register';
import ListClasses from './Classes';
import HomePage from './Main';
import { Hideo } from 'react-native-textinput-effects';


export default class Login extends Component {
    constructor(props){
    super(props);
    this.state = {
      UserEmail:'',
      UserPassword:'',
      loading:false,
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
    this.setState({loading:true},()=>navigate("ListClasses"));
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


componentWillUnmount(){
  this.setState({
    loading: false,
  });
}

  render() {
    return (
      <Container style={styles.BackgroundColor}>
        <Content>
          <KeyboardAvoidingView behavior="padding">
          <Body>
            <Image source={require("../pictures/logo_era.png")} style={{width:75, height:75}} />
            <Text style={styles.HeadText}>European Regional Educational Academy</Text>
            <Body style={styles.marginPercentageFromTop}>
              <Hideo
                style={{margin:15}}
                placeholder={'Email'}
                iconClass={Entypo}
                iconName={'users'}
                iconColor={'white'}
                iconSize={20}
                autoCapitalize= {"none"}
                multiline={false}
                maxLength ={320}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={"#0f6abc"}
                value = {this.state.UserEmail}
                iconBackgroundColor={'#0f6abc'}
                onChangeText = {(Email)=>this.setState({UserEmail: Email})}
                inputStyle={{ borderBottomWidth: 1,borderColor:"#0f6abc" }}
              />
              <Hideo
                style={{margin:15}}
                placeholder={'Password'}
                iconClass={Entypo}
                iconName={'lock'}
                iconColor={'white'}
                iconSize={20}
                autoCapitalize= {"none"}
                multiline={false}
                maxLength ={320}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={"#0f6abc"}
                iconBackgroundColor={'#0f6abc'}
                secureTextEntry={true}
                value = {this.state.UserPassword}
                onChangeText = {(Password)=>this.setState({UserPassword: Password})}
                inputStyle={{ borderBottomWidth: 1,borderColor:"#0f6abc" }}
              />
            </Body>
            <ActivityIndicator animating={this.state.loading} color={"#0f6abc"} size={"large"} hidesWhenStopped={!this.state.loading}/>
            <Body style={styles.marginPercentageFromTop}>
              <Button
                style={styles.loginButton}
                onPress={this._onLogin}>
                <Text style={styles.signInCenterText}>Log in</Text>
              </Button>
              <Button
                style={styles.SignUpButton}
                onPress={this._onSignup}>
                <Text style={styles.signUpCenterText}>Register</Text>
              </Button>
            </Body>
          </Body>
        </KeyboardAvoidingView>
        </Content>
    </Container>
    );
  }
}
