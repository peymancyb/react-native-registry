import React ,{Component,PureComponent} from 'react';
import {View,Text,TextInput, TouchableHighlight, FlatList, Modal,Alert,CheckBox } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
// import Toast, {DURATION} from 'react-native-easy-toast';
import { Toast } from 'native-base';

//modal component
export class ModalStudent extends Component{
  constructor(props){
    super(props);
    this.state={
      name: '',
      last_name: '',
      modalVisible: false,
    }
    // this.currentUserUid = FB.auth().currentUser.uid;
    // this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fbDatabaseNodeName+'/studet_list');
    this.itemsRef = FB.database().ref('user_classes/'+"xuKDcv8itdPnUGhLHjvaWfVEptm2"+'/class_list/'+"First Class"+'/studet_list');
    this._saveData = this._saveData.bind(this);
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
      Toast.show({
              text: 'please insert student information!',
              position: 'bottom',
            });
    }
  }

  render(){
    return(
      <View>
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
               onPress={()=>{this.setState({modalVisible: false})}}
               >
                   <Text style={styles.addStudentStyleModal}>Cancel</Text>
              </TouchableHighlight>
            </View>
           </View>
         </Modal>
      </View>
    );
  }
}
