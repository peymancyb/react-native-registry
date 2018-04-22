// ================= commonComponents ==================== //

// if(firebaseData.length > 0){

  // checkingArray.
  // checkingArray.forEach((currentId)=>{
  //   let res = arrDate.includes(currentId);
  //   firebaseData.forEach((child)=>{
  //     let dates = Object.keys(child.toJSON().Date);
  //   });
  //   console.log(arrDate,currentId,res);
  //
  //   if(res){
  //     console.log('user exist');
  //   }else{
  //     console.log('user does not exist');
  //   }
  // });

//   arrDate.forEach((child)=>{
//     let result = arrDate.includes(userId);
//     console.log(child.key, userId,result);
//     if(result){
//       let dateArray = Object.keys(child.toJSON().Date);
//       let res = dateArray.includes(currentDate);
//       if(res){
//         return console.log('date exist');
//       }else{
//         console.log('date not exist');
//         return this._sendToFirebase(node);
//       }
//     }else{
//       console.log('user not exist');
//       return this._sendToFirebase(node);
//     }
//   });


// }else{
  // return this._sendToFirebase(node);
// }

// console.log(this.state.dateTemp.toJSON().current_date);
// this.state.dateTemp.forEach((child)=>{
//   let myData = child.toJSON().Date;
//   console.log(Object.keys(myData));
// })

// RegisteryDateRef.on('value',(snap)=>{
//   snap.forEach((child)=>{
//     if(child.key == currentDate){
//       this.setState({
//         checkStatus:false,
//       },()=>{
//         return Toast.show({
//             text: "Submitted!",
//             position: "bottom",
//         });
//       });
//     }else{
//       this.setState({
//         checkStatus:true,
//       });
//     }
//   });
//   if(this.state.checkStatus == true){
//     return this._sendToFirebase(tempArr[i]);
//   }
// });
