import React ,{Component,PureComponent} from 'react';
import {View,TextInput, TouchableHighlight, FlatList, Modal,Alert,CheckBox, TouchableOpacity } from 'react-native';
import styles from './style';
import {StackNavigator , TabNavigator} from 'react-navigation';
import FB from '../BackEnd/firebase';
import Register from './Register';
import History from './History';
import ListClasses from './Classes';
import {fbDatabaseNodeName} from './Classes';
import {Entypo,Feather,MaterialIcons,EvilIcons} from '@expo/vector-icons';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Icon,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
  Tab,
  Tabs,
  TabHeading,
  Segment,
  Fab,
  Toast,
} from 'native-base';

import {ModalStudent} from './commonComponents';
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MainButtons from './mainButtons';
import {student_pal_data} from './mainButtons';

export var resetButtons= false;

export var buttonStyle , buttonState ;


export default class MainPage extends Component {
    constructor(props){
    super(props);
    //solving timer error
    console.ignoredYellowBox = [
    'Setting a timer'
    ];
    this.state = {
      name: '',
      last_name: '',
      students_array: [],
      active: false,
      modalView:false,
      buttonStyleReset:true,
      buttonResetActivity:false,
    };

   // this.currentUserUid = FB.auth().currentUser.uid;
   // this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fbDatabaseNodeName+'/studet_list');
   this.itemsRef = FB.database().ref('user_classes/'+"xuKDcv8itdPnUGhLHjvaWfVEptm2"+'/class_list/'+"First Class"+'/studet_list');
   this._renderItem = this._renderItem.bind(this);
   this.listenForItems = this.listenForItems.bind(this);
   this._saveData = this._saveData.bind(this);
   this._sendData = this._sendData.bind(this);
   this._resetButtons = this._resetButtons.bind(this);

  }

  _saveData(){
    if(this.state.name != '' && this.state.last_name != ''){
      this.itemsRef.push({ name: this.state.name, last_name: this.state.last_name});
      let student_name = this.state.name +" "+this.state.last_name;
      //have all application students in one place
      FB.database().ref('all_students/'+student_name).set({
        name: student_name
      });
      Toast.show({
              text: 'Student saved successfully!',
              position: 'bottom',
        });
      this.setState({name: '',last_name:'', modalVisible: false});
    }else{
      Toast.show({
              text: 'please insert student information!',
              position: 'bottom',
        });
    }
  }

_sendData(){
  console.log("send data");
  FB.database().ref("test/").set({
    data: student_pal_data
  });
  Toast.show({
          text: 'Data successfully added!',
          position: 'bottom',
    });
}


_resetButtons(){
  console.log("reset");
  this.setState({
    buttonStyleReset:true,
    buttonResetActivity:false,
  });
  buttonStyle = this.state.buttonStyleReset;
  buttonState = this.state.buttonResetActivity;
  //array reset
  // student_pal_data = [];
}


//give students reference to the funtion
componentDidMount() {
  this.listenForItems(this.itemsRef);
}
_renderItem({item}){
  return(
    <ListItem
      style={{borderBottomWidth:1,borderColor:"#5067FF"}}>
      <Body>
        <Body style={{justifyContent:"center",alignItems:"center"}}>
          <Text>{item.name} {item.last_name}</Text>
        </Body>
          <MainButtons
           userID = {item.id}
           userName = {item.name}
           userSurName = {item.last_name}
           buttonStyleReset = {this.state.buttonStyleReset}
           buttonResetActivity = {this.state.buttonResetActivity}
         />
      </Body>
    </ListItem>
  );
}
// Fetch Students referance
listenForItems(itemsRef) {
  itemsRef.on('value', (snap) => {
    var items = [];
    snap.forEach((child) => {
      items.push({
        id: child.key,
        name: child.val().name,
        last_name: child.val().last_name,
      });
    });
    this.setState({students_array: items });
  });
}

  render() {
    return (
      <Container>
        <Content style={{marginBottom:40}}>
            <List
              >
              <FlatList
                  style={styles.flatListStyle}
                  data = {this.state.students_array}
                  renderItem = {this._renderItem}
                  keyExtractor={item => item.name}
                  />
            </List>

            <View>
              <Modal
                animationType="none"
                transparent={true}
                visible={this.state.modalView}
                onRequestClose={()=>this.setState({modalVisible: false})}
              >
              <View style={styles.inputcontainerModal}>
                <TextInput
                  style = {styles.inputStyleModal}
                  onChangeText={(Name) => this.setState({name: Name})}
                  value={this.state.name}
                  placeholder="Name"
                  placeholderTextColor={"white"}
                  underlineColorAndroid={'transparent'}
                  />
                <TextInput
                  style = {styles.inputStyleModal}
                  onChangeText={(lastName) => this.setState({last_name: lastName})}
                  value={this.state.last_name}
                  placeholder="Surname"
                  placeholderTextColor={"white"}
                  underlineColorAndroid={'transparent'}
                  />

                  <View style={styles.marginTopButton}>
                  <TouchableOpacity
                    style={styles.modalAddStudent}
                    onPress={this._saveData}
                    >
                        <Text style={styles.addStudentStyleModal}>Add Student</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                     style={styles.modalAddStudent}
                     onPress={()=>{this.setState({modalView: false})}}
                     >
                         <Text style={styles.addStudentStyleModal}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                 </View>
               </Modal>
            </View>

      </Content>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
          >
          <Entypo name="plus" color="white" size={22}/>
          <Button
            onPress={() => this.setState({ modalView: !this.state.modalView})}
            style={{ backgroundColor: '#5067FF' }}
            >
            <Entypo name="add-to-list" color="white" size={22}/>
          </Button>
          <Button
            style={{ backgroundColor: '#5067FF' }}
            onPress={()=>this._sendData()}
            >
            <MaterialIcons name="check" color="white" size={22}/>
          </Button>
          <Button
            style={{ backgroundColor: '#5067FF' }}
            onPress={()=>this._resetButtons()}
            >
            <MaterialIcons name="refresh" color="white" size={22}/>
          </Button>
        </Fab>
    </Container>
    );
  }
}
