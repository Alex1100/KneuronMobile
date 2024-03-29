import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base';
const { width, height } = Dimensions.get("window");

import Navbar from '../NavBar/NavBar';
import axios from 'axios';
import Config from 'react-native-config';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'test',
      email: 'test',
      fName: 'test',
      lName: 'test',
    };
  }

componentDidMount() {
  this.fetchStudentData()
}
fetchStudentData() {
  AsyncStorage.getItem('id_token')
  .then(res => {
  console.log('this is the token in profile please work ', res)
  axios.get(`${Config.Local_Host}/api/students/${res}`)
  .then(data => {
    console.log("this is the data for the students",data)
    this.setState({ username: data.data.username, email: data.data.email, fName: data.data.fName, lName: data.data.lName });
  })
  })
    .catch((err) => {
      if (err){
        console.log('there was an error fetching user', err);
      }
    })
  }


  render() {
    const { navbar, container } = styles;
    console.log("this is the state of profile", this.state)
    return (
      <View style={container} >
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../images/loginpic.jpg')} />
          <Text style={styles.title}>{this.state.fName + " " + this.state.lName}</Text>
          <Text style={styles.title}>{this.state.email}</Text>
          <Text style={styles.title}>{this.state.username}</Text>
        </View> 
        {/*<Button
        onPress={Actions.editprofile}
        ><Text>Edit Profile</Text></Button>*/}

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={Actions.editprofile}>Edit Profile!</Text>
        </TouchableOpacity>
          <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <Navbar />
          </View> 
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    position: 'relative',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
  },
    buttonContainer: {
    backgroundColor: '#2980b9',
    padding: 80,

  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
}