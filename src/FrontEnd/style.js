import {
  StyleSheet
} from 'react-native';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  deviceHalf:{
    marginTop:window.height/2.5,
    justifyContent:"center",
    alignItems:"center",
  },
  fixedBottom:{
    bottom:0,
  },
  BackgroundColor:{
    backgroundColor:'white',
  },
  FabBackground:{
    backgroundColor:"#0f6abc",
  },
  flexOne:{
    flex:1,
  },
  center:{
    justifyContent:"center",
    alignItems:"center",
  },
  justifyContentCenter:{
    justifyContent:"center",
  },
  marginFromTop:{
    marginTop:window.height/5,
  },
  flexDirectionRow:{
    flexDirection:"row",
  },
  cardItemStyle:{
    marginTop:5,
    marginBottom:5,
    width:"98%",
    marginLeft:"2%",
    borderBottomWidth:0.4,
    borderColor:"#0f6abc",
  },
  ClassLeftItemStyle:{
    flex:2,
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start",
  },
  ClassLeftStyleText:{
    marginTop:8,
    fontSize:12,
    fontWeight:"100",
  },
  MainPageViewStyle:{
    flexDirection:"row",
    alignItems:"center",
    borderLeftWidth:5,
    paddingLeft:8,
    borderColor:"#0f6abc",
  },
  MainPageBodyStyle:{
    borderColor:"#0f6abc",
    borderBottomWidth:0.6,
  },
  transparentBorderColor:{
    borderColor:"transparent",
  },
  MarkTextInputStyle:{
    textAlign:'center',
    height:45,
    width:120,
    borderWidth:1,
    borderColor:"#0f6abc",
    borderRadius:4,
    color:"#0f6abc",
  },
  MarkViewStyle:{
    flexDirection:"row",
    borderLeftWidth:5,
    borderColor:"#0f6abc",
    padding:10,
  },
  MarkItemView:{
    flexDirection:"row",
    justifyContent:"center",
  },
  MarkCardItemStyle:{
    borderColor:"transparent",
    borderWidth:0,
  },
  MarkBodyItemStyle:{
    justifyContent:"center",
    borderColor:"transparent",
    borderWidth:0,
  },
  MarkSwipeRow:{
    justifyContent:"center",
    borderColor:"#0f6abc",
    borderBottomWidth:0.5,
  },
  CommentsBody:{
    alignItems:"center",
    justifyContent:"center",
    paddingLeft:10,
  },
  HoshiStyle:{
    flex:3,
    width:"80%",
    backgroundColor:"white",
  },
  commentStyleInput:{
    flex:1,
    height:50,
    alignItems:"center",
    backgroundColor:"#0f6abc",
    justifyContent:"center",
    borderWidth:1,
    borderColor:"#0f6abc",
    paddingBottom:0,
    marginTop:5,
    borderRadius:4,
  },
  HistoryHeight:{
    height:50,
  },
  ProfileHistoryStyle:{
    borderLeftWidth:5,
    paddingLeft:8,
    borderColor:"#0f6abc",
    borderBottomWidth:0.6,
  },
  //====
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: "center",
  },
  HeadText: {
    marginTop:15,
    marginBottom:15,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
    color:"#0f6abc",
    fontWeight:"normal",
  },
  inputStyle:{
    height: 50 ,
    borderColor: "#0f6abc",
    borderBottomWidth: 1,
    paddingLeft: 10,
    marginLeft:10,
    marginRight:10,
    marginTop:40,
    width:window.width-60,
    color:"#0f6abc",
  },
  inputRow:{
    flexDirection:"row",
    justifyContent: "center",
    alignItems:"center",
  },
  iconStyle:{
    alignItems:"center",
    justifyContent: "center",
    paddingTop:20,
  },
  loginButton:{
    alignItems: "center",
    justifyContent: "center",
    height: 60 ,
    width:window.width/2,
    borderRadius:5,
    backgroundColor:"#0f6abc",
    margin:10,
  },
  SignUpButton:{
    alignItems: "center",
    justifyContent: "center",
    height: 60 ,
    width:window.width/2,
    borderRadius:5,
    backgroundColor:"#0f6abc",
    margin:10,
  },
  signInCenterText:{
    color:"white",
    textAlign: "center",
    fontSize: 20,
  },
  signUpCenterText:{
    color:"white",
    textAlign: "center",
    fontSize: 20,
  },
  singUpButton:{
    justifyContent: "center",
    alignItems: "center",
    height:40,
    marginTop:45,
    marginLeft:100,
    marginRight:100,
    backgroundColor: "#1e88e5",
    borderRadius: 40,
  },
  centerTextsignUp:{
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  userDetails:{
    textAlign: "left",
    fontSize: 16,
    color: "#1e88e5",
  },

  StatusSection:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentSection:{
    marginTop:10,
    height:60,
    borderColor: "#1e88e5",
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: window.width-10,
    borderRadius:20,
  },
  processSection:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatListDesign:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  SendDataButton:{
    justifyContent: "center",
    alignItems: "center",
    height:50,
    width: window.width-20,
    backgroundColor: "#1e88e5",
    marginLeft:10,
    borderRadius:30,
  },
  dataText:{
    color: "white",
  },
  addStudentStyle:{
    width: window.width,
    height: 40,
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderColor: "black",
    alignItems:"center",
    justifyContent: "center",
    borderRadius:60,
  },
  myList:{
    textAlign:"center",
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:50,
  },

  flatListStyle:{
    width:window.width-10,
  },

  addStudentButtonStyle:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#00a79d",
    borderRadius:40,
    width:60,
    height:60,
    marginBottom:15,
    marginTop:5,

  },
  addStudentStyle:{
    color:"white",
    fontSize:18,
  },
  inputcontainerModal:{
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
  },
  inputStyleModal:{
    padding:10,
    color:"white",
    height: 50 ,
    borderColor: "white",
    borderWidth:1,
    borderColor:"#64cdc8",
    borderRadius:40,
    marginTop:20,
    width:window.width-60,
  },
  addStudentStyleModal:{
    fontSize:20,
    color:"white",
  },
  modalAddStudent:{
    backgroundColor:"#00BFFF",
    alignItems:"center",
    justifyContent:"center",
    width:window.width-100,
    height:45,
    marginTop:10,
    borderRadius:40,
    marginBottom:10,
  },
  marginTopButton:{
    marginTop:30,
  },
  containerStudentRow:{
    backgroundColor:"#00a79d",
    marginTop: 10,
    width:window.width-20,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius:5,
  },
  studentContainer:{
    flexDirection:"row",
    marginTop: 10,
  },
  dataBorder:{
      flex:1,
      flexDirection:"row",
      marginTop:10,
      marginBottom:5,
      alignItems:"center",
      justifyContent:"center",
    },
    flatListFont:{
        fontSize:20,
        padding:10,
        color:"white",
      },
    closeModal:{
        paddingTop:20,
        marginLeft:0,
      },
      moDal:{
        flex:1,
      },
      DetailContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
      },
      MarkContainer:{
        flex:1,
      },
      CommentContainer:{
        flex:1,
      },
      SatisfactionContainer:{
        flex:1,
      },



      presentIsChecked:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        height:50,
        backgroundColor:"#669801",
      },
      absentIsChecked:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        height:50,
        backgroundColor:"#cc0001",
      },
      lateIsChecked:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        height:50,
        backgroundColor:"#FF8C00",
      },
      // borderBottomRightRadius:4,

      defaultButton:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        height:50,
        backgroundColor:"#ffffff",
      },
      colorOffStatus:{
        color:"black",
      },
      colorOnStatus:{
        color:"white",
      },
      confirmStyle:{
        alignItems:"center",
        justifyContent: "center",
        flex:1,
        backgroundColor: "white",
        height:50,
      },
      borderBottomStyle:{
        borderWidth:1,
        borderColor:"#01b4df",
        marginTop:10,
        width:window.width-20,
        height:1,
      },

//==========================================

      //standard style

      //standard colors
      whiteColor:{
        color:"white",
      },
      presentColor:{
        color:"#669801",
      },
      absentColor:{
        color:"#cc0001",
      },
      lateColor:{
        color:"#FF8C00",
      },
      //================
      box:{
        height:40,
        width:60,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
      },
      presentBox:{
        height:40,
        width:60,
        backgroundColor:"#669801",
        justifyContent:"center",
        alignItems:"center",
      },
      absentBox:{
        height:40,
        width:60,
        backgroundColor:"#cc0001",
        justifyContent:"center",
        alignItems:"center",
      },
      lateBox:{
        height:40,
        width:60,
        backgroundColor:"#FF8C00",
        justifyContent:"center",
        alignItems:"center",
      },
      MarkBox:{
        height:40,
        width:60,
        backgroundColor:"#088da5",
        justifyContent:"center",
        alignItems:"center",
      },
      rowOne:{
        flexDirection:"row",
        marginLeft:"5%",
        marginRight:"5%",
        marginTop:20,
      },
      rowTwo:{
        flexDirection:"row",
        marginLeft:"5%",
        marginRight:"5%",
        marginTop:10,
      },
//==========================================

});


export default styles;
