import React ,{Component,PureComponent} from 'react';
import {Text, View,TextInput, TouchableHighlight, FlatList, Modal,Button } from 'react-native';
import styles from './style';
import {StackNavigator , TabNavigator , DrawerNavigator} from 'react-navigation';
import FB from '../BackEnd/firebase';
import Register from './Register';
import HomePage from './Main';

import Toast, {DURATION} from 'react-native-easy-toast'
import {Entypo} from '@expo/vector-icons';



export var fbDatabaseNodeName = '';

export default class ListClasses extends PureComponent {
    constructor(props){
    super(props);
    //solving timer error
    console.ignoredYellowBox = [
    'Setting a timer'
    ];
    this.state = {
      name: '',
      descreption: '',
      Class_array: [],
      modalVisible: false,
      user_uid:'Anonymous',
    };
   this.currentUserUid = FB.auth().currentUser.uid;
   this._ClassitemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/');
   this._renderClassItem = this._renderClassItem.bind(this);
   this.listenForClassItems = this.listenForClassItems.bind(this);
   this._saveClassData = this._saveClassData.bind(this);
   this._navigateToStudent = this._navigateToStudent.bind(this);
   this._keyExtractor = this._keyExtractor.bind(this);
  }
static navigationOptions = {
  title: "Class List",
  headerStyle:{
    backgroundColor: "#535353",
  },
  headerTintColor: "#00a79d",
  gesturesEnabled: false,
  headerLeft: null,
};
componentDidMount() {
  this.listenForClassItems(this._ClassitemsRef);
}
_navigateToStudent(item){
  const { navigate } = this.props.navigation;
  fbDatabaseNodeName = item.name;
  navigate("HomePage");
}
_renderClassItem({item}){
  return(
    <View style={styles.containerMain}>
    <View style={styles.containerStudentRow}>
      <TouchableHighlight
        onPress={()=>this._navigateToStudent(item)}>
      <View style={styles.dataBorder}>
        <Text style={styles.flatListFont}>{item.name}</Text>
        <Text style={styles.flatListFont}>{item.descreption}</Text>
      </View>
    </TouchableHighlight>
  </View>
  <View style={styles.borderBottomStyle}></View>

</View>
  );
}
listenForClassItems(_ClassitemsRef) {
  _ClassitemsRef.on('value', (snap) => {
    var items = [];
    snap.forEach((child) => {
      items.push({
        name: child.key,
        descreption: child.val().descreption
      });
    });
    this.setState({Class_array: items });
  });
}

_saveClassData(){
  if(this.state.name != ''&& this.state.descreption != ''){
    let className = this.state.name +" "+this.state.descreption;
    this._ClassitemsRef.child(className).set({class_name:this.state.name , descreption: this.state.descreption});
    this.refs.toast.show('Class saved!');
    this.setState({name: '',descreption:'', modalVisible: false});
  }else{
    this.refs.toast.show('data is missing');
  }
}

_keyExtractor = (item) => item.name;

  render() {
    const { navigate } = this.props.navigation;
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
                  placeholder="Class Name"
                  placeholderTextColor={"white"}
                  underlineColorAndroid={'transparent'}
                />
                <TextInput
                  style = {styles.inputStyleModal}
                  onChangeText={(Descreption) => this.setState({descreption: Descreption})}
                  value={this.state.descreption}
                  placeholder="Descreption"
                  placeholderTextColor={"white"}
                  underlineColorAndroid={'transparent'}
                />
                <View style={styles.marginTopButton}>
                <TouchableHighlight
                  style={styles.modalAddStudent}
                  onPress={this._saveClassData}
                  >
                  <Text style={styles.addStudentStyleModal}>Add Class</Text>
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
            data = {this.state.Class_array}
            renderItem = {this._renderClassItem}
            keyExtractor={this._keyExtractor}
          />


          <View style={{backgroundColor:"transparent",marginBottom:50}}>
            <TouchableHighlight
              style={styles.addStudentButtonStyle}
              onPress={() => this.setState({modalVisible: true})}
                >
                  <Entypo name="add-to-list" color="white" size={35} />
            </TouchableHighlight>
          </View>


      <Toast ref="toast" position="bottom"  defaultClosedelay={1000}/>
      </View>
    );
  }
}