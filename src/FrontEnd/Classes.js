import React ,{Component,PureComponent} from 'react';
import {Text, View,TextInput, TouchableHighlight, FlatList, Modal,Button } from 'react-native';
import styles from './style';
import {StackNavigator , TabNavigator , DrawerNavigator} from 'react-navigation';
import FB from '../BackEnd/firebase';
import Register from './Register';
import HomePage from './Main';
import {
  Container,
  Content,
  Body,
  Toast,
  Fab,
  Card,
  CardItem,
  Left,
  Right,
  List,
  ListItem,
} from 'native-base';
import {Entypo,MaterialIcons} from '@expo/vector-icons';


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
   // this.currentUserUid = FB.auth().currentUser.uid;
   // this._ClassitemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/');
   // this._ClassitemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/');
   this._ClassitemsRef = FB.database().ref('user_classes/'+"xuKDcv8itdPnUGhLHjvaWfVEptm2"+'/class_list/');

   this._renderClassItem = this._renderClassItem.bind(this);
   this.listenForClassItems = this.listenForClassItems.bind(this);
   this._saveClassData = this._saveClassData.bind(this);
   this._navigateToStudent = this._navigateToStudent.bind(this);
  }
static navigationOptions = {
  title: "List of classes",
  headerStyle:{
    backgroundColor: "#5067FF",
  },
  headerTintColor: "white",
  gesturesEnabled: false,
  headerLeft: null,
};
componentDidMount() {
  this.listenForClassItems(this._ClassitemsRef);
}
_navigateToStudent(item){
  const { navigate } = this.props.navigation;
  fbDatabaseNodeName = item.name +" "+ item.descreption;
  navigate("HomePage", { className: fbDatabaseNodeName });
}
_renderClassItem({item}){
  return(
    <TouchableHighlight
      onPress={()=>this._navigateToStudent(item)}>
    <CardItem
      style={{marginTop:5,marginBottom:5,width:"98%",marginLeft:"2%",borderBottomWidth:0.4,borderColor:"#5067FF"}}>
        <View
          style={{flexDirection:"row",}}>
          <Left style={{flex:2,flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",}}>
            <Text>Class name: {item.name}</Text>
            <Text style={{marginTop:8,fontSize:12, fontWeight:"100"}}>Descreption: {item.descreption}</Text>
          </Left>

          <Right>
            <MaterialIcons name={"arrow-forward"} size={22} color={"#5067FF"}/>
          </Right>
        </View>
    </CardItem>
  </TouchableHighlight>
  );
}
listenForClassItems(_ClassitemsRef) {
  _ClassitemsRef.on('value', (snap) => {
    var items = [];
    snap.forEach((child) => {
      items.push({
        class_id: child.key,
        name: child.val().class_name,
        descreption: child.val().descreption
      });
    });
    this.setState({Class_array: items });
  });
}

_saveClassData(){
  if(this.state.name != ''&& this.state.descreption != ''){
    // let className = this.state.name +" "+this.state.descreption;
    // this._ClassitemsRef.child(className).push({class_name:this.state.name , descreption: this.state.descreption});
    this._ClassitemsRef.push({class_name:this.state.name , descreption: this.state.descreption});
    Toast.show({
      text:"Class saved!",
      position:"bottom",
    });
    this.setState({name: '',descreption:'', modalVisible: false});
  }else{
    Toast.show({
      text:"Data is missing!",
      position:"bottom",
    });
  }
}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container
        style={{backgroundColor:"#e7f0f9"}}>
        <Content>
          <Body>
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
          </Body>
            <Card>
              <FlatList
                style={styles.flatListStyle}
                data = {this.state.Class_array}
                renderItem = {this._renderClassItem}
                keyExtractor={item => item.class_id}
              />
            </Card>
        </Content>
          <View style={{flex:1}}>
            <Fab
              style={{backgroundColor:"#5067FF"}}
              onPress={() => this.setState({modalVisible: true})}>
              <Entypo name="add-to-list" color="white" size={35} />
            </Fab>
          </View>
      </Container>
    );
  }
}
