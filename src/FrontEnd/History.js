import React ,{Component} from 'react';
import {Text, View,TextInput, TouchableHighligh,FlatList } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
import Register from './Register';
import {fbDatabaseNodeName} from './Classes';

{/* <MainButtons
  userID = {item.id}
  userName = {item.name}
  userSurName = {item.last_name}
/> */}


export default class History extends Component {
    constructor(props){
    super(props);
    this.state = {
      students_array: [],
    };

    this.currentUserUid = FB.auth().currentUser.uid;
    this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fbDatabaseNodeName+'/studet_list');

    this._renderItem = this._renderItem.bind(this);
    this.listenForItems = this.listenForItems.bind(this);

  }
  static navigationOptions =({navigation})=>({
      tabBarLabel: 'History',
      gesturesEnabled:true,
    });

  componentDidMount() {
    this.listenForItems(this.itemsRef);
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

  _renderItem({item}){
      return(
        <View style={{backgroundColor:"transparent"}}>
          <Text style={{fontSize:16,padding:10,color:"#00a79d"}}>{item.name} {item.last_name}</Text>
        </View>
      );
    }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex:1}}>

        <View style={{flex:1,borderBottomWidth:1,borderColor:"#00a79d",flexDirection:"row",height:50}}>
          <View style={{flex:2,borderRightWidth:1,borderColor:"#00a79d"}}>
            <Text style={{fontSize:20,padding:10,color:"black"}}>student name</Text>
            <FlatList
              style={styles.flatListStyle}
              data = {this.state.students_array}
              renderItem = {this._renderItem}
              keyExtractor={item => item.name}
            />
          </View>
          <View style={{flex:1,borderRightWidth:1,borderColor:"#00a79d",}}>
            <Text style={{fontSize:20,padding:10,color:"black"}}>present</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={{fontSize:20,padding:10,color:"black"}}>mark</Text>
          </View>
        </View>
      </View>
    );
  }
}
