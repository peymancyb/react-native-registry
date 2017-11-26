import React ,{Component,PureComponent} from 'react';
import {Text, View,TextInput, TouchableHighlight, FlatList, Modal,Button,Alert,CheckBox } from 'react-native';
import styles from './style';
import {StackNavigator , TabNavigator} from 'react-navigation';
import FB from '../BackEnd/firebase';
import Register from './Register';
import History from './History';
import ListClasses from './Classes';

import {fbDatabaseNodeName} from './Classes';
import {Entypo} from '@expo/vector-icons';
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

//import toast
import Toast, {DURATION} from 'react-native-easy-toast';
import MainButtons from './mainButtons';



export var resetButtons= false;

export default class MainPage extends PureComponent {
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
      modalVisible: false,

    };


   this.currentUserUid = FB.auth().currentUser.uid;
   this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fbDatabaseNodeName+'/studet_list');


   this._renderItem = this._renderItem.bind(this);
   this.listenForItems = this.listenForItems.bind(this);
   this._saveData = this._saveData.bind(this);
   this._keyExtractor = this._keyExtractor.bind(this);

  }

//navigation option
static navigationOptions = {
  title: "Student List",
};

//give students reference to the funtion
componentDidMount() {
  this.listenForItems(this.itemsRef);
}

_renderItem({item}){
  return(
  <View style={styles.studentContainer}>
    <View style={styles.dataBorder}>
      <Text style={{fontSize:20,padding:10,color:"#00a79d"}}>{item.name}</Text>
      <Text style={{fontSize:20,padding:10,color:"#00a79d"}}>{item.last_name}</Text>
    </View>
    <MainButtons
      userID = {item.id}
    />
  </View>
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



_saveData(){
  if(this.state.name != '' && this.state.last_name != ''){
    this.itemsRef.push({ name: this.state.name, last_name: this.state.last_name});
    let student_name = this.state.name +" "+this.state.last_name;
    //have all application students in one place
    FB.database().ref('all_students/'+student_name).set({
      name: student_name
    });
    this.refs.toast.show('Student saved!');
    this.setState({name: '',last_name:'', modalVisible: false});
  }else{
    this.refs.toast.show('data is missing');
  }
}

_keyExtractor = (item)=> item.name;

  render() {
    return (

      <View style={styles.containerMain}>
        <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
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
            <TouchableHighlight
              style={styles.modalAddStudent}
              onPress={this._saveData}
              >
                  <Text style={styles.addStudentStyleModal}>Add Student</Text>
             </TouchableHighlight>
             <TouchableHighlight
               style={styles.modalAddStudent}
               onPress={()=>this.setState({modalVisible:false})}
               >
                   <Text style={styles.addStudentStyleModal}>Cancel</Text>
              </TouchableHighlight>
            </View>
           </View>
        </Modal>
            <FlatList
                style={styles.flatListStyle}
                data = {this.state.students_array}
                renderItem = {this._renderItem}
                keyExtractor={this._keyExtractor}
                />
        <TouchableHighlight
            style={styles.addStudentButtonStyle}
            onPress={() => this.setState({modalVisible: true})}
          >
            <Entypo name="add-to-list" color="white" size={35}/>
        </TouchableHighlight>

      <Toast ref="toast" position="center" defaultCloseDelay={1000}/>
  </View>
    );
  }
}
