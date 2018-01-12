import React,{Component} from 'react';
import {
  View,
  Button,
  FlatList,
} from 'react-native';

import {
  Text,
  Thumbnail,
  Container,
  Content,
  Body,
  Left,
  Right,
  SwipeRow,
  Card,
  CardItem,
} from 'native-base';
import styles from './style';
import FB from '../BackEnd/firebase';
import {CurrentUser} from './History';


import {EvilIcons} from '@expo/vector-icons';



function DetailRow(props){
  //remember to add mark
  return(
    <Body>
      <Body
        style={styles.rowOne}>
        <Left style={styles.presentBox}>
          <Text style={styles.whiteColor}>Present</Text>
        </Left>
        <Body style={styles.absentBox}>
          <Text style={styles.whiteColor}>Absent</Text>
        </Body>
        <Right style={styles.lateBox}>
          <Text style={styles.whiteColor}>Late</Text>
        </Right>
      </Body>
      <Body style={styles.rowTwo}>
        <Left style={styles.box}>
          <Text style={styles.presentColor}>
              {props.present}
            </Text>
        </Left>
        <Body style={styles.box}>
          <Text style={styles.absentColor}>
              {props.absent}
          </Text>
        </Body>
        <Right style={styles.box}>
          <Text style={styles.absentColor}>
              {props.absent}
          </Text>
        </Right>
      </Body>
    </Body>
  );
};





export default class ProfileHistory extends Component{
  constructor(props){
    super(props);
    this.state={
      showTab:false,
      presentNumber:0,
      absentNumber:0,
      lateNumber:0,
      historyArray:[],
    };
    this._showFullHistory = this._showFullHistory.bind(this);
    this.itemsRef = FB.database().ref('test/'+CurrentUser+"/Date");
    this.totalItemsRef = FB.database().ref('test/'+CurrentUser+"/");
    // this.itemsRef = FB.database().ref('test/'+"-KzuES-mZ7dYu6_F6yDi"+"/");
    this._listenForItem = this._listenForItem.bind(this);
    this._renderHistory = this._renderHistory.bind(this);
    this._checkForStatus = this._checkForStatus.bind(this);
  }




componentDidMount(){
  this._listenForItem(this.itemsRef);
  this._checkForStatus(this.totalItemsRef);
}

_checkForStatus(totalItemsRef){
  return totalItemsRef.limitToLast(1).on('value',(snap)=>{
    snap.forEach((child)=>{
      if (child.hasChild("total_present")) {
        let newValue = child.val().total_present;
        console.log(newValue);
        this.setState({
          presentNumber:newValue,
        });
      }
      if (child.hasChild("total_absent")) {
        let newValue = child.val().total_absent;
        this.setState({
          absentNumber:newValue,
        });
      }
      if (child.hasChild("total_late")) {
        let newValue = child.val().total_late;
        this.setState({
          lateNumber:newValue,
        });
      }
    });
  });
}

_listenForItem(itemsRef){
  itemsRef.limitToFirst(1).on('value', (snap)=>{
    var items = [];
    snap.forEach((child)=>{
      items.push({
        date: child.key,
        user_id: child.val().status.user_id,
        user_lastName: child.val().status.user_lastName,
        user_name: child.val().status.user_name,
        user_status: child.val().status.user_status,
        Comment: child.val().status.Comment,
        Mark: child.val().status.Mark,
      });
    });

    console.log(items);
    this.setState({
      historyArray: items,
    });
  });
}


_renderHistory({item}){
  return(
    <CardItem
      style={{borderColor:"transparent"}}>
        <Body
          style={{borderLeftWidth:5,paddingLeft:8,borderColor:"#5067FF",borderBottomWidth:0.6}}>
          <Body
            style={{justifyContent:'center',alignItems:"center"}}>
              <Text>{item.date}</Text>
          </Body>
          <View style={{flex:1,flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start"}}>
              <Text style={{padding:5}}>Status: {item.user_status}</Text>
              <Text style={{padding:5}}>Mark: {item.Mark}</Text>
              <Text style={{padding:5}}>Comment: {item.Comment}</Text>
          </View>
        </Body>
    </CardItem>
  );
}

_showFullHistory(itemsRef){
  return(
        <Card>
          <FlatList
            style={styles.flatListStyle}
            data={this.state.historyArray}
            renderItem={this._renderHistory}
            keyExtractor={item => item.user_id}
          />
        </Card>

  );
}

render(){
    return(
      <Container
        style={{backgroundColor:"#e7f0f9"}}>
        <Content>
          <Body>
            <EvilIcons name={"user"} size={120} color={"#5067FF"}/>
            <Text>peyman ghazvini</Text>
          </Body>
          <DetailRow
            present={this.state.presentNumber}
            absent={this.state.absentNumber}
            late={this.state.lateNumber}/>
          <Body
            style={{marginTop:20}}>
            <Text
              style={{color:"#5067FF"}}
              onPress={()=>this.setState({showTab:!this.state.showTab})}>
               show history
             </Text>
            {this.state.showTab? this._showFullHistory() : null}
          </Body>
        </Content>
      </Container>

    );
  }
}
