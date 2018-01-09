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
import {StudentModal , BottomFab, PalButtons, ParentClass,ModalStudent} from './commonComponents';

//present absent component
export default class MainPage extends Component {
    constructor(props){
    super(props);
    //solving timer error
    console.ignoredYellowBox = [
    'Setting a timer'
    ];
    this.state = {
      tempArr:[],
      tempState:'',
      students_array: [],
      active: false,
      modalView:false,
    };
   // this.currentUserUid = FB.auth().currentUser.uid;
   // this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fbDatabaseNodeName+'/studet_list');
   this.itemsRef = FB.database().ref('user_classes/'+"xuKDcv8itdPnUGhLHjvaWfVEptm2"+'/class_list/'+"First Class"+'/studet_list');
   this._renderItem = this._renderItem.bind(this);
   this.listenForItems = this.listenForItems.bind(this);
  }

//give students reference to the funtion
componentDidMount() {
  this.listenForItems(this.itemsRef);
}
_renderItem({item}){
  return(
    <ListItem
      style={{borderColor:"transparent"}}>
      <Body>
        <View style={{flexDirection:"row",alignItems:"center",borderLeftWidth:5,borderColor:"#5067FF"}}>
          <Text>{item.name} {item.last_name}</Text>
        </View>
       <Body>
            <PalButtons
             userID = {item.id}
             userName = {item.name}
             userSurName = {item.last_name}
           />
        </Body>
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
        <Content >
            <List>
              <FlatList
                  style={styles.flatListStyle}
                  data = {this.state.students_array}
                  renderItem = {this._renderItem}
                  keyExtractor={item => item.name}
                  />
            </List>
      </Content>
      <BottomFab />
    </Container>
    );
  }
}
