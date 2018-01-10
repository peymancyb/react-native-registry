import React ,{Component} from 'react';
import {Text,TouchableOpacity,View,TextInput, TouchableHighligh,FlatList } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
import Register from './Register';
import {fbDatabaseNodeName} from './Classes';
import {MaterialCommunityIcons,SimpleLineIcons} from '@expo/vector-icons';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
  SwipeRow,
  Toast,
} from 'native-base';


let date = new Date();
let currentDate = `${date.getFullYear() +"/"+(date.getMonth() + 1)+"/"+ date.getDate()}`;


export default class Marks extends Component {
  static navigationOptions = {
    tabBarIcon: () => (
      <MaterialCommunityIcons name="numeric" size={22} color={"white"}/>
    )
  };
    constructor(props){
    super(props);
    this.state = {
      students_array: [],
      Mark:null,
    };
    // this.currentUserUid = FB.auth().currentUser.uid;
    // this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fbDatabaseNodeName+'/studet_list');
    this.itemsRef = FB.database().ref('user_classes/'+"xuKDcv8itdPnUGhLHjvaWfVEptm2"+'/class_list/'+"First Class"+'/studet_list');
    this._renderItem = this._renderItem.bind(this);
    this.listenForItems = this.listenForItems.bind(this);
    this._sendMark = this._sendMark.bind(this);
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
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
      this.setState({students_array: items });
    });
  }


_chandeText(mark){
this.setState({Mark: mark});
}
_sendMark(item){
  if(this.state.Mark === null || this.state.Mark === ''){
    Toast.show({
     text:"Please enter mark!",
     position:"bottom",
   });
 }else{
   Toast.show({
     text:"Mark has been set!",
     position:"bottom",
   });
   FB.database().ref("test/"+currentDate+"/"+item.user_id+"/status/Mark").set({
       Mark: this.state.Mark
     });
   this.setState({
     Mark:null,
   });
 }
};

  _renderItem({item}){
      return(
        <CardItem
          style={{borderColor:"transparent",borderWidth:0}}>
          <Body
            style={{borderColor:"transparent",borderWidth:0}}>
            <SwipeRow
              style={{borderColor:"#5067FF",borderBottomWidth:0.5}}
               disableLeftSwipe={true}
               leftOpenValue={75}
               left={
                 <Button
                    backgroundColor={"#5067FF"}
                    onPress={() => this._sendMark(item)}>
                   <SimpleLineIcons name="check" size={22} color={"white"} />
                 </Button>
               }
               body={
                 <View style={{flexDirection:"row"}}>
                   <Body>
                     <View style={{flexDirection:"row",borderLeftWidth:5,borderColor:"#5067FF",padding:10}}>
                       <Text>{item.name} {item.last_name}</Text>
                     </View>
                   </Body>
                   <Right>
                       <TextInput
                         clearTextOnFocus={true}
                         autoCorrect={false}
                         editable = {true}
                         onChangeText = {(mark)=>this._chandeText(mark)}
                         underlineColorAndroid={"transparent"}
                         placeholder={"Mark"}
                         style={{textAlign:'center',height:35,width:150,borderWidth:1,borderColor:"#5067FF",borderRadius:20}}/>
                   </Right>
                 </View>
               }
             />
          </Body>
        </CardItem>
      );
    }
  render() {
    return (
      <Container>
       <Content>
         <Card>
             <FlatList
               style={styles.flatListStyle}
               data = {this.state.students_array}
               renderItem = {this._renderItem}
               keyExtractor={item => item.name}
             />
          </Card>
       </Content>
     </Container>
    );
  }
}
