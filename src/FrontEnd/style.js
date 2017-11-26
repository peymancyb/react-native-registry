
import {
  StyleSheet
} from 'react-native';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  containerMain:{
    flex: 1,
    backgroundColor: '#535353',
    justifyContent: "center",
    alignItems:"center",
  },
  //535353
  // 00a79d
  container: {
    flex: 1,
    backgroundColor: '#535353',
    justifyContent: "center",
  },
  HeadText: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 30,
    marginBottom: 60,
    color:"white",
    fontWeight:"normal",
  },
  inputStyle:{
    height: 50 ,
    borderColor: "#00a79d",
    borderBottomWidth: 1,
    paddingLeft: 10,
    marginLeft:10,
    marginRight:10,
    marginTop:20,
    width:window.width-60,
    color:"white",
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
    height: 110 ,
    width:110,
    borderRadius:55,
    backgroundColor:"#535353",
    borderWidth:4,
    borderColor:"#00a79d",
    margin:30,

  },
  SignUpButton:{
    alignItems: "center",
    justifyContent: "center",
    height: 110 ,
    width:110,
    borderRadius:55,
    backgroundColor:"#535353",
    borderWidth:4,
    borderColor:"#00a79d",
    margin:30,

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
  marginTopButtons:{
    alignItems:"center",
    justifyContent:"center",
    marginTop: 60,
    flexDirection:"row",
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
    backgroundColor:"#5fa0b6",
    alignItems:"center",
    justifyContent:"center",
    marginTop:window.height-(window.height/1.5),
  },
  inputStyleModal:{
    color:"black",
    height: 50 ,
    borderColor: "white",
    borderWidth:1,
    borderColor:"#64cdc8",
    borderRadius:40,
    paddingLeft: 20,
    marginLeft:10,
    marginRight:10,
    marginTop:20,
    width:window.width-60,
  },
  addStudentStyleModal:{
    fontSize:20,
    color:"white",
  },
  modalAddStudent:{
    backgroundColor:"#64cdc8",
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
    backgroundColor:"white",
    marginTop: 10,
    width:window.width-20,
    borderWidth: 1,
    borderColor: "#535353",
    borderRadius:5,
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
        borderTopWidth: 1,
        borderColor: "grey",
        borderBottomLeftRadius:4,
        backgroundColor:"#669801",
      },
      absentIsChecked:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        height:50,
        borderTopWidth: 1,
        borderColor: "grey",
        backgroundColor:"#cc0001",
      },
      lateIsChecked:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        height:50,
        borderTopWidth: 1,
        borderColor: "grey",
        borderBottomRightRadius:4,
        backgroundColor:"#FF8C00",
      },
      // borderBottomRightRadius:4,

      defaultButton:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        height:50,
        borderTopWidth: 1,
        borderColor: "grey",
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
        borderColor:"#00a79d",
        marginTop:10,
        width:window.width-20,
        height:1,
      },
});


export default styles;
