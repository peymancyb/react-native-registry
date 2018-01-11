import React ,{Component,PureComponent} from 'react';
import {View,TextInput, TouchableHighlight,TouchableOpacity, FlatList, Modal,Alert,CheckBox } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {Entypo,Feather,MaterialIcons,EvilIcons} from '@expo/vector-icons';
import {fbDatabaseNodeName} from './Classes';
import Register from './Register';
import History from './History';
import ListClasses from './Classes';
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
  SwipeRow,
} from 'native-base';





//==============================================================================
export var tempArr = [];
let date = new Date();
let dateString = `${date.getFullYear() +"-"+(date.getMonth() + 1)+"-"+ date.getDate()}`;
let currentDate = dateString.toString();
// console.log(typeof currentDate);
//==============================================================================

//==============================================================================
export class StudentModal extends Component{
  constructor(props){
    super(props);
    this.defaultState={
        name: '',
        last_name: '',
        modalView: props.modalView,
    };
    // this.currentUserUid = FB.auth().currentUser.uid;
    // this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fbDatabaseNodeName+'/studet_list');
    this.itemsRef = FB.database().ref('user_classes/'+"xuKDcv8itdPnUGhLHjvaWfVEptm2"+'/class_list/'+"First Class"+'/studet_list');
    this.state = this.defaultState;
    this._saveData = this._saveData.bind(this);
    this._passState = this._passState.bind(this);
  }
  _passState(){
    this.props.handleState(false);
    this.setState({
      modalView: false,
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
  componentWillReceiveProps(nextProps){
    this.setState({
      modalView: nextProps.modalView
    });
  }
  render(){
    return(
            <Modal
              style={{flex:1}}
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
                   onPress={()=>this._passState()}
                   >
                       <Text style={styles.addStudentStyleModal}>Cancel</Text>
                  </TouchableOpacity>
                </View>
               </View>
           </Modal>
    );
  }
}

//==============================================================================
export class PalButtons extends Component{
  constructor(props){
    super(props);
    //setting default state
    this.defaultState = {
        presentStatus: true,
        absentStatus: true,
        lateStatus: true,
        status: null,
        buttonStatus:false,
        student_palStatus:[],
       };
    this.state = this.defaultState;
    // this.currentUserUid = FB.auth().currentUser.uid;
    this._presentButton = this._presentButton.bind(this);
    this._absentButton = this._absentButton.bind(this);
    this._lateButton = this._lateButton.bind(this);
    this._storeData = this._storeData.bind(this);
  }



_storeData(currentData){
  tempArr.push(currentData);
}

_presentButton(props){
  this.setState({
    presentStatus: this.state.presentStatus ? false : true,
    absentStatus:true,
    lateStatus:true,
    buttonStatus:true,
    status: (this.state.status == null || this.state.status == "Absent" || this.state.status == "Late" ) ? "Present" : null,
  });
  //data's object
  let itemObj = {
    user_id:props.userID,
    user_name:props.userName,
    user_lastName:props.userSurName,
    user_status:"Present",
  };
  //calling _storeData function
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
  //data's object
  let itemObj ={
    user_id:props.userID,
    user_name:props.userName,
    user_lastName:props.userSurName,
    user_status:"Absent",
  };
  //calling _storeData function
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
  //data's object
  let itemObj ={
    user_id:props.userID,
    user_name:props.userName,
    user_lastName:props.userSurName,
    user_status:"Late",
  };
  //calling _storeData function
  if(this.state.lateStatus == true){
    this._storeData(itemObj);
  }
}
render(){
    return(
          <View style={{flexDirection:"row",borderColor:"#5067FF",borderBottomWidth:0.6}}>
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
    );
  }
}

//==============================================================================

//==============================================================================
//all the components inside of the FAB in bottom
//this component need to access to the array

export class BottomFab extends Component{
  constructor(props){
    super(props);
    this.state={
      active: false,
      modalView:false,
    };
    this._sendData = this._sendData.bind(this);
    this._handleState = this._handleState.bind(this);
    this._resetItems = this._resetItems.bind(this);
  }


componentDidMount(){
  // this._sendData(this.props);
}


_resetItems(props){
  tempArr=[];
  props.resetFlatlist();
}

_handleState(childCall){
    if(childCall == "undefined"){
      this.setState({
        modalView: !this.state.modalView
      });
    }else{
      this.setState({
        modalView: childCall
    });
  }
}
  _sendData(props){
    if(tempArr.length!=0 && tempArr.length == props.numberOfStudents){
      for(let i=0 ; i< tempArr.length;i++){
        FB.database().ref("test/"+tempArr[i].user_id+"/"+currentDate).set({
          status: tempArr[i]
        });
//==============================================================================
        if(tempArr[i].user_status=="Present"){
          FB.database().ref("test/"+tempArr[i].user_id+"/total/").once('value',(snap)=>{
            if (!snap.hasChild("total_present")) {
              return FB.database().ref("test/"+tempArr[i].user_id+"/total/").update({
                    total_present: 1
                  });
            }else{
              snap = snap.val();
              let prev_val = snap.total_present;
              console.log(prev_val);
              let update = prev_val+1;
              return FB.database().ref("test/"+tempArr[i].user_id+"/total/").update({
                    total_present: update
                  });
                }
          });
        }
//==============================================================================
        if(tempArr[i].user_status=="Absent"){
          FB.database().ref("test/"+tempArr[i].user_id+"/total/").once('value',(snap)=>{
            if (!snap.hasChild("total_absent")) {
              return FB.database().ref("test/"+tempArr[i].user_id+"/total/").update({
                    total_absent: 1
                  });
            }else{
              snap = snap.val();
              let prev_val = snap.total_absent;
              console.log(prev_val);
              let update = prev_val+1;
              return FB.database().ref("test/"+tempArr[i].user_id+"/total/").update({
                    total_absent: update
                  });
                }
          });
        }
//==============================================================================
        if(tempArr[i].user_status=="Late"){
          FB.database().ref("test/"+tempArr[i].user_id+"/total/").once('value',(snap)=>{
            if (!snap.hasChild("total_late")) {
              return FB.database().ref("test/"+tempArr[i].user_id+"/total/").update({
                    total_late: 1
                  });
            }else{
              snap = snap.val();
              let prev_val = snap.total_late;
              console.log(prev_val);
              let update = prev_val+1;
              return FB.database().ref("test/"+tempArr[i].user_id+"/total/").update({
                    total_late: update
                  });
                }
          });
        }
//==============================================================================
      }
      Toast.show({
              text: 'Data successfully added!',
              position: 'bottom',
        });
    }else{
      if(tempArr.length == 0){
        Toast.show({
          text:"you did not select yet!",
          position: "bottom",
        });
      }else{
        Toast.show({
          text:`${props.numberOfStudents-tempArr.length} students left!`,
          position: "bottom",
        });
      }
    }
  }

  render(){
    return(
      <View>
        <StudentModal modalView={this.state.modalView} handleState={this._handleState}/>
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
            onPress={() => this._handleState()}
            style={{ backgroundColor: '#5067FF' }}
            >
            <Entypo name="add-to-list" color="white" size={22}/>
          </Button>
          <Button
            style={{ backgroundColor: '#5067FF' }}
            onPress={()=>this._sendData(this.props)}
            >
            <MaterialIcons name="check" color="white" size={22}/>
          </Button>
          <Button
            style={{ backgroundColor: '#5067FF' }}
            onPress={()=>this._resetItems(this.props)}
            >
            <MaterialIcons name="refresh" color="white" size={22}/>
          </Button>
        </Fab>
      </View>
    );
  }
}
