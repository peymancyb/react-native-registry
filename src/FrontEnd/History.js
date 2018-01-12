import React ,{Component} from 'react';
import {Text,View,TextInput, TouchableHighligh,FlatList ,TouchableOpacity} from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
import Register from './Register';
import {fbDatabaseNodeName} from './Classes';
import {MaterialCommunityIcons,Ionicons} from '@expo/vector-icons';
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
} from 'native-base';
import ProfileHistory from './profileHistory';



export var CurrentUser = '';

export default class History extends Component {
  static navigationOptions = {
    tabBarIcon: () => (
      <MaterialCommunityIcons name="history" size={22} color={"white"}/>
    )
  };
    constructor(props){
    super(props);
    this.state = {
      students_array: [],
    };

    // this.currentUserUid = FB.auth().currentUser.uid;
    // this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fbDatabaseNodeName+'/studet_list');
    // this.itemsRef = FB.database().ref('user_classes/'+"xuKDcv8itdPnUGhLHjvaWfVEptm2"+'/class_list/'+"First Class"+'/studet_list');
    this.itemsRef = FB.database().ref('user_classes/'+"-xuKDcv8itdPnUGhLHjvaWfVEptm2"+'/class_list/'+"-L2dy0UfQ8LPCTOWWDSb"+'/studet_list');

    this._renderItem = this._renderItem.bind(this);
    this.listenForItems = this.listenForItems.bind(this);
    this._navigateToProfile = this._navigateToProfile.bind(this);
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  _navigateToProfile(item){
    const { navigate } = this.props.navigation;
    CurrentUser = item.user_id;
    console.log("CurrentUser: "+CurrentUser);
    navigate("profile");
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

  _renderItem({item}){
      return(
        <TouchableOpacity
          onPress={()=> this._navigateToProfile(item)}>
        <CardItem style={{height:50}}>
            <Body
              style={{justifyContent:"center"}}>
              <Text
                style={{justifyContent:"center",alignItems:"center"}}>{item.name} {item.last_name}</Text>
            </Body>

          <Right>
            <Ionicons name="md-arrow-round-forward" size={22} color={"#5067FF"} />
          </Right>
         </CardItem>
       </TouchableOpacity>

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
                 keyExtractor={item => item.user_id}
               />
        </Card>
       </Content>
     </Container>
    );
  }
}
