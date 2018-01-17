import React ,{Component} from 'react';
import {
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  Modal,
  Alert,
  CheckBox,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import ListClasses from './Classes';
import {fireBaseClassNode} from './Classes';
import {Feather} from '@expo/vector-icons';
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button,
  Fab,
  CardItem,
  Card,
  Toast,
} from 'native-base';
import {StudentModal , BottomFab, PalButtons, ParentClass,ModalStudent} from './commonComponents';

//present absent component
export default class MainPage extends Component {
  static navigationOptions = {
    tabBarIcon: () => (
      <Feather name="user-check" size={22} color={"white"}/>    ),
  };
    constructor(props){
    super(props);
    this.state = {
      students_array: [],
      numberOfStudents:null,
      loading: true,
      refreshing:false,
      StudentModalView:false,
    };
   this.currentUserUid = FB.auth().currentUser.uid;
   this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fireBaseClassNode+'/studet_list');
   this._renderItem = this._renderItem.bind(this);
   this.listenForItems = this.listenForItems.bind(this);
   this._resetFlatlist = this._resetFlatlist.bind(this);
   this._handleRefresh = this._handleRefresh.bind(this);
  }
//give students reference to the funtion
componentDidMount() {
  this.setState({
    loading:true,
  },
  ()=>this.listenForItems(this.itemsRef));
}

// Fetch Students referance
listenForItems(itemsRef) {
  itemsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          user_id: child.key,
          name: child.val().name,
          last_name: child.val().last_name,
        });
      });
      this.setState({
        students_array: items ,
        numberOfStudents: items.length,
        loading:false,
        refreshing:false,
      });
    });
};

_renderItem({item}){
  return(
    <CardItem style={styles.transparentBorderColor}>
        <Body
          style={styles.MainPageBodyStyle}>
          <View style={styles.MainPageViewStyle}>
            <Text>{item.name} {item.last_name}</Text>
          </View>
         <Body>
              <PalButtons
               userID = {item.user_id}
               userName = {item.name}
               userSurName = {item.last_name}
             />
          </Body>
        </Body>
    </CardItem>
  );
};

_renderFooter = () => {
  if(!this.state.loading) return null;
  return(
    <View>
      <ActivityIndicator animating color={"#0f6abc"} size={"small"}/>
    </View>
  );
};

_resetFlatlist(){
  this.setState({
    students_array: [] ,
    numberOfStudents: null,
    loading:true,
  });
  setTimeout(()=>this.listenForItems(this.itemsRef),100);
};


_handleRefresh(){
  this.setState({
    refreshing:true,
  },
  ()=>{
    this.listenForItems(this.itemsRef);
  });
}

  render() {
    return (
      <Container style={styles.BackgroundColor}>
        <Content>
          {this.state.students_array.length <= 0  ?
              <View style={styles.deviceHalf}>
                <Text
                  onPress={() => this.setState({StudentModalView: true})}
                  style={{color:"#0f6abc",fontSize:18}}>
                  Add student
                </Text>
              </View>
              :
              <Card>
                <FlatList
                    style={styles.flatListStyle}
                    data = {this.state.students_array}
                    renderItem = {this._renderItem}
                    keyExtractor={item => item.user_id}
                    ListFooterComponent={this._renderFooter}
                    refreshing = {this.state.refreshing}
                    onRefresh = {()=>this._handleRefresh()}
                    />
              </Card>
            }
      </Content>
      <BottomFab StudentModalView={this.state.StudentModalView} numberOfStudents={this.state.numberOfStudents} resetFlatlist={this._resetFlatlist} />
    </Container>
    );
  }
}
