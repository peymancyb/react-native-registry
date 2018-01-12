import React ,{Component,PureComponent} from 'react';
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
import {StackNavigator , TabNavigator} from 'react-navigation';
import FB from '../BackEnd/firebase';
import Register from './Register';
import History from './History';
import ListClasses from './Classes';
import {fireBaseClassNode} from './Classes';
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
  Footer,
  FooterTab,
  Button,
  Tab,
  Tabs,
  TabHeading,
  Segment,
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
    //solving timer error
    console.ignoredYellowBox = [
    'Setting a timer'
    ];
    this.state = {
      students_array: [],
      active: false,
      modalView:false,
      numberOfStudents:null,
      loading: true,
    };
   this.currentUserUid = FB.auth().currentUser.uid;
   this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fireBaseClassNode+'/studet_list');
   this._renderItem = this._renderItem.bind(this);
   this.listenForItems = this.listenForItems.bind(this);
   this._resetFlatlist = this._resetFlatlist.bind(this);
  }

//give students reference to the funtion
componentDidMount() {
  this.listenForItems(this.itemsRef);
}
_renderItem({item}){
  return(
    <CardItem
      style={{borderColor:"transparent"}}>
        <Body
          style={{borderColor:"#5067FF",borderBottomWidth:0.6}}>
          <View style={{flexDirection:"row",alignItems:"center",borderLeftWidth:5,paddingLeft:8,borderColor:"#5067FF"}}>
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
      });
    });
};

_renderFooter = () => {
  if(!this.state.loading) return null;
  return(
    <View>
      <ActivityIndicator animating color={"#5067FF"} size={"small"}/>
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

  render() {
    return (
      <Container
        style={{backgroundColor:"#e7f0f9"}}>
        <Content >
            <Card>
              <FlatList
                  style={styles.flatListStyle}
                  data = {this.state.students_array}
                  renderItem = {this._renderItem}
                  keyExtractor={item => item.user_id}
                  ListFooterComponent={this._renderFooter}
                  />
            </Card>
      </Content>
      <BottomFab numberOfStudents={this.state.numberOfStudents} resetFlatlist={this._resetFlatlist} />
    </Container>
    );
  }
}
