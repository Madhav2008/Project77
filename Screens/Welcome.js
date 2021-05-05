import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';



export default class Welcome extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModalVisible:'false'
    }
  }

  userSignUp = (emailId, password,confirmPassword) =>{
   if(password !== confirmPassword){
       return alert("password doesn't match\nCheck your password.")
   }else{
     firebase.auth().createUserWithEmailAndPassword(emailId, password)
     .then(()=>{
       db.collection('users').add({
         first_name:this.state.firstName,
         last_name:this.state.lastName,
         contact:this.state.contact,
         email_id:this.state.emailId,
         address:this.state.address
       })
       return alert(
            'User Added Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
        );
     })
    .catch((error)=> {
     return alert('Something Went Wrong')
   })
   }
 }

userLogin = (emailId, password)=>{
   firebase.auth().signInWithEmailAndPassword(emailId, password)
   .then(()=>{
     return alert("Successfully Login")
   })
   .catch((error)=> {
     return alert('Something Went Wrong')
   })
 }

showModal = ()=>{
  return(
  <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
    <Text style={styles.modalTitle1}>
      Barter System App
    </Text>
    <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <Text style={styles.modalTitle}>
          Registration
        </Text>
        <TextInput
          style={styles.loginBox}
          placeholder ={"First Name"}
          placeholderTextColor="black"
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.loginBox}
          placeholder ={"Last Name"}
          placeholderTextColor="black"
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.loginBox}
          placeholder ={"Contact No."}
          placeholderTextColor="black"
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.loginBox}
          placeholder ={"Address"}
          placeholderTextColor="black"
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TextInput
          style={styles.loginBox}
          placeholder ={"E-mail"}
          keyboardType ={'email-address'}
          placeholderTextColor="black"
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        /><TextInput
          style={styles.loginBox}
          placeholder ={"Password"}
          placeholderTextColor="black"
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.loginBox}
          placeholder ={"Confrim Password"}
          placeholderTextColor="black"
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'#ff5722'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  </Modal>
)
}
  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>

        </View>
          {
            this.showModal()
          }
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity style={styles.header}>
          <Text style={styles.headerText}>Barter system App</Text>
        </TouchableOpacity>
        <Image style={styles.image}
        source={require('../barterAppLogo.jpg')}
        />
        </View>
        <View>
            <TextInput
            style={styles.loginBox}
            placeholder="Enter Your E-mail Here"
            placeholderTextColor="black"
            keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          />
          <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="Enter Your Password Here"
          placeholderTextColor="black"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        <TouchableOpacity
           style={[styles.button,{marginTop:20, marginBottom:20, alignSelf:'center'}]}
           onPress = {()=>{
             this.userLogin(this.state.emailId, this.state.password)
           }}
           >
           <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   alignItems: 'center',
   justifyContent: 'center'
  },
  headerText: {
    fontFamily: 'Eras Bold ITC',
    fontSize: 38,
    textAlign: 'center',
    padding: 8,
    color:'white',
  },
  header: {
    backgroundColor: '#072F5F',
    borderWidth: 4,
    borderColor:'cyan',
  },
  loginBox:{
   width: 300,
   height: 40,
   textAlign:'center',
   borderBottomWidth: 1.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
  },
  KeyboardAvoidingView:{
   backgroundColor: 'gold',
   flex:1,
   justifyContent:'center',
   alignItems:'center',
   borderRadius: 20
  },
  modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   fontWeight: 'bold',
   color:'#ff5722',
   margin:50
  },
  modalTitle1 :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize: 30,
   fontWeight: 'bold',
   color:'black',
   textDecorationLine: 'underline',
   marginTop: 20,
   marginBottom: -50,
  },
  modalContainer:{
   width: 280,
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
  },
  registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
  },
  registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
  },
  cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
  },
  button:{
   width: 300,
   height: 50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#ff9800",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
    },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation:16,
   padding: 10
  },
  buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
  },
  image:{
   width: 300,
   height: 200,
   marginTop: 28,
   marginBottom: 60
  }
})