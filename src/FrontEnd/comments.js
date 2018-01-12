import React ,{Component} from 'react';
import {Text,View,TextInput, TouchableOpacity,FlatList } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
import Register from './Register';
import {fbDatabaseNodeName} from './Classes';
import {MaterialCommunityIcons,EvilIcons,FontAwesome} from '@expo/vector-icons';
import { Hoshi } from 'react-native-textinput-effects';
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
import {fireBaseClassNode} from './Classes';

let date = new Date();
let dateString = `${date.getFullYear() +"-"+(date.getMonth() + 1)+"-"+ date.getDate()}`;
let currentDate = dateString.toString();

export default class Comments extends Component {
  static navigationOptions = {
    tabBarIcon: () => (
      <FontAwesome name="commenting-o" size={22} color={"white"}/>
    ),
  };
    constructor(props){
    super(props);
    this.state = {
      students_array: [],
      Comment:'',
    };
    this.currentUserUid = FB.auth().currentUser.uid;
    this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fireBaseClassNode+'/studet_list');

    this._renderItem = this._renderItem.bind(this);
    this.listenForItems = this.listenForItems.bind(this);
    this._sendComment = this._sendComment.bind(this);

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
  _sendComment(item){
    let RegisteryCommentRef = FB.database().ref("Registery/"+this.currentUserUid+"/"+fireBaseClassNode+"/"+item.user_id+"/Date/"+currentDate+"/status/");

    if(this.state.Comment === null || this.state.Comment === ''){
      Toast.show({
       text:"Please write Comment!",
       position:"bottom",
     });
   }else{
     Toast.show({
       text:"Comment has been set!",
       position:"bottom",
     });
     RegisteryCommentRef.update({
         Comment: this.state.Comment
       });
     this.setState({
       Comment:null,
     });
   }
  };
  _renderItem({item}){
      return(
          <CardItem
            style={{borderColor:"transparent",borderWidth:0}}>
              <Body
                style={{flexDirection:"row",alignItems:"center",justifyContent:"center",paddingLeft:10}}>
                   <Hoshi
                      clearTextOnFocus={true}
                      style={{flex:3,width:"80%",backgroundColor:"white"}}
                      label={`${item.name+" "+item.last_name+" :"}`}
                      labelStyle={{ color: '#5067FF' }}
                      borderColor={'#5067FF'}
                      inputStyle={{ color: '#5067FF' }}
                      onChangeText = {(Comment)=>this.setState({Comment: Comment})}
                    />

                   <TouchableOpacity
                      style={{flex:1,height:50,alignItems:"center",backgroundColor:"#5067FF",justifyContent:"center",borderWidth:1,borderColor:"#5067FF",paddingBottom:0,marginTop:5,borderRadius:4}}
                      onPress={() => this._sendComment(item)}>
                     <EvilIcons name="comment" size={32} color={"white"} />
                   </TouchableOpacity>
                 </Body>
           </CardItem>
      );
    }
  render() {
    return (
      <Container
        style={{backgroundColor:"#e7f0f9"}}>
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
