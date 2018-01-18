import React ,{Component} from 'react';
import {Text,View,TextInput, TouchableOpacity,FlatList,KeyboardAvoidingView } from 'react-native';
import styles from './style';
import fireBase from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
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
  Root,
} from 'native-base';
import {fireBaseClassNode} from './Classes';

let date = new Date();
let dateString = `${date.getFullYear() +"-"+(date.getMonth() + 1)+"-"+ date.getDate()}`;
let currentDate = dateString.toString();

export default class Comments extends Component {
  constructor(props){
    super(props);
    this.state = {
      students_array: [],
      Comment:'',
    };
    this.currentUserUid = fireBase.auth().currentUser.uid;
    this.itemsRef = fireBase.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fireBaseClassNode+'/studet_list');

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
    let RegisteryCommentRef = fireBase.database().ref("Registery/"+this.currentUserUid+"/"+fireBaseClassNode+"/"+item.user_id+"/Date/"+currentDate+"/status/");

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
        <KeyboardAvoidingView keyboardVerticalOffset={0} behavior={"padding"}>
          <CardItem style={styles.MarkCardItemStyle}>
              <Body
                style={[styles.CommentsBody,{flexDirection:"row"}]}>
                   <Hoshi
                      clearTextOnFocus={true}
                      style={styles.HoshiStyle}
                      label={`${item.name+" "+item.last_name+" :"}`}
                      labelStyle={{ color: '#0f6abc' }}
                      borderColor={'#5067FF'}
                      inputStyle={{ color: '#0f6abc' }}
                      onChangeText = {(Comment)=>this.setState({Comment: Comment})}
                    />

                   <TouchableOpacity
                      style={styles.commentStyleInput}
                      onPress={() => this._sendComment(item)}>
                     <EvilIcons name="comment" size={32} color={"white"} />
                   </TouchableOpacity>
                 </Body>
           </CardItem>
         </KeyboardAvoidingView>
      );
    }
  render() {
    return (
      <Container style={styles.BackgroundColor}>
       <Content>
         <KeyboardAvoidingView keyboardVerticalOffset={0} behavior={"padding"}>
           {
             this.state.students_array <= 0 ?
             <View style={styles.deviceHalf}>
               <Text
                 onPress={() => this.props.navigation.navigate("Registery")}
                 style={{color:"#0f6abc",fontSize:18}}>
                 no student found!
               </Text>
             </View>
             :
             <Card>
                   <FlatList
                     style={styles.flatListStyle}
                     data = {this.state.students_array}
                     renderItem = {this._renderItem}
                     keyExtractor={item => item.name}
                   />
            </Card>
           }
        </KeyboardAvoidingView>
       </Content>
     </Container>
    );
  }
}
