import React ,{Component} from 'react';
import {Text,View,TextInput, TouchableHighligh,FlatList ,TouchableOpacity} from 'react-native';
import styles from './style';
import fireBase from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
import Register from './Register';
import {fireBaseClassNode} from './Classes';
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

export var userHistoryItem = {};

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
    this.currentUserUid = fireBase.auth().currentUser.uid;
    this.itemsRef = fireBase.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fireBaseClassNode+'/studet_list');
    this._renderItem = this._renderItem.bind(this);
    this.listenForItems = this.listenForItems.bind(this);
    this._navigateToProfile = this._navigateToProfile.bind(this);
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  _navigateToProfile(item){
    const { navigate } = this.props.navigation;
    userHistoryItem = item;
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
        <CardItem style={styles.HistoryHeight}>
            <Body
              style={styles.justifyContentCenter}>
              <Text
                style={styles.center}>{item.name} {item.last_name}</Text>
            </Body>

          <Right>
            <Ionicons name="md-arrow-round-forward" size={22} color={"#0f6abc"} />
          </Right>
         </CardItem>
       </TouchableOpacity>

      );
    }

  render() {
    return (
      <Container style={styles.BackgroundColor}>
       <Content>
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
                   keyExtractor={item => item.user_id}
                 />
          </Card>
         }
       </Content>
     </Container>
    );
  }
}
