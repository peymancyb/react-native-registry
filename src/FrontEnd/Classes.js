import React ,{Component,PureComponent} from 'react';
import {Text, View,TextInput, TouchableHighlight,TouchableOpacity, FlatList, Modal,Button,ActivityIndicator} from 'react-native';
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
  Footer,
  FooterTab,
} from 'native-base';
import {Entypo,MaterialIcons} from '@expo/vector-icons';

export var fireBaseClassNode = '';

export class ClassModal extends Component{
  constructor(props){
    super(props);
    this.state={
      name: '',
      descreption: '',
      modalVisible: props.modalView,
    };
    this._saveClassData = this._saveClassData.bind(this);
    this.currentUserUid = FB.auth().currentUser.uid;
    this._ClassitemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/');
  }

  _saveClassData(){
    if(this.state.name != ''&& this.state.descreption != ''){
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

  componentWillReceiveProps(nextProps){
    this.setState({
      modalVisible: nextProps.modalView
    });
  }
  render(){
    return(
          <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={()=>this.setState({modalVisible: false})}
            >
          <Body style={styles.inputcontainerModal}>
            <View style={{backgroundColor:"#0f6abc",alignItems:"center",justifyContent:"center",width:"100%",}}>
            <TextInput
              style={styles.inputStyleModal}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(Name) => this.setState({name: Name})}
              value={this.state.name}
              clearTextOnFocus={true}
              placeholder="Class Name"
              placeholderTextColor={"white"}
              underlineColorAndroid={'transparent'}
            />
            <TextInput
              style={styles.inputStyleModal}
              onChangeText={(Descreption) => this.setState({descreption: Descreption})}
              value={this.state.descreption}
              clearTextOnFocus={true}
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
               onPress={()=>this.props.handleState(false)}
               >
                   <Text style={styles.addStudentStyleModal}>Cancel</Text>
              </TouchableHighlight>
            </View>
            </View>
          </Body>
        </Modal>
    );
  }
}

export default class ListClasses extends PureComponent {
    constructor(props){
    super(props);
    this.state = {
      ClassModalView:false,
      Class_array: [],
      user_uid:'Anonymous',
      loading:true,
    };
   this.currentUserUid = FB.auth().currentUser.uid;
   this._ClassitemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/');

   this._renderClassItem = this._renderClassItem.bind(this);
   this.listenForClassItems = this.listenForClassItems.bind(this);
   this._navigateToStudent = this._navigateToStudent.bind(this);
   this._handleModalState = this._handleModalState.bind(this);

  }
static navigationOptions = {
  title: "List of classes",
  headerBackTitle:"Classes",
  headerStyle:{
    backgroundColor: "#0f6abc",
  },
  headerTintColor: "white",
  gesturesEnabled: false,
  headerLeft: null,
};


_handleModalState(modalState){
  this.setState({
    ClassModalView: modalState,
  });
}

componentDidMount() {
  this.listenForClassItems(this._ClassitemsRef);
}


_navigateToStudent(item){
  const { navigate } = this.props.navigation;
  fireBaseClassNode = item.class_id;
  this.setState({
    loading:false
  },()=>navigate("HomePage"));

}

_renderClassItem({item}){
    return(
      <TouchableOpacity onPress={()=>this._navigateToStudent(item)} activeOpacity={1}>
      <CardItem style={styles.cardItemStyle}>
          <View
            style={styles.flexDirectionRow}>
            <Left style={styles.ClassLeftItemStyle}>
              <Text>Class name: {item.name}</Text>
              <Text style={styles.ClassLeftStyleText}>Descreption: {item.descreption}</Text>
            </Left>
            <Right>
              <MaterialIcons name={"arrow-forward"} size={22} color={"#0f6abc"}/>
            </Right>
          </View>
      </CardItem>
    </TouchableOpacity>
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

componentWillUnmount(){
  this.setState({
    loading:false
  });
}

  render() {
    return (
      <Container style={styles.BackgroundColor}>
        <Content>
            <Body>
              <ClassModal modalView={this.state.ClassModalView} handleState={this._handleModalState}/>
            </Body>
            {this.state.loading?
              <ActivityIndicator animating={this.state.loading} color={"#0f6abc"} size={"large"} hidesWhenStopped={!this.state.loading} />
              :
              null
            }
            {this.state.Class_array.length <= 0  ?
                <View style={styles.deviceHalf}>
                  <Text
                    onPress={() => this.setState({ClassModalView: true})}
                    style={{color:"#0f6abc",fontSize:18}}>
                    Add Class
                  </Text>
                </View>
                :
                <Card>
                  <FlatList
                    style={styles.flatListStyle}
                    data = {this.state.Class_array}
                    renderItem = {this._renderClassItem}
                    keyExtractor={item => item.class_id}
                  />
                </Card>
              }
        </Content>
        <View style={styles.flexOne}>
          <Fab
            style={styles.FabBackground}
            onPress={() => this.setState({ClassModalView: true})}>
            <Entypo name="add-to-list" color="white" size={35} />
          </Fab>
        </View>
      </Container>
    );
  }
}
