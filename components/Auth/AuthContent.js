import {useState} from 'react';
import {Alert, StyleSheet, View, Text} from 'react-native';

import AuthForm from './AuthForm';
import {useNavigation} from '@react-navigation/native';
import Caption from '../Caption';

const AuthContent = ({isLogin, onAuthenticate}) => {
  const navigate = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    firstName:false,
    last_name:false,
    rate_code:false,
    area:false,
    street_name:false,
    apartment:false,
    contact_number:false,
    alter_Contact_Number:false,
    email:false,
    Password:false,
    confirmPassword:false
  });

  function switchAuthModeHandler() {
    isLogin ? navigate.replace('SignUp') : navigate.replace('SignIn');
  }

  function submitHandler(credentials) {
    let {
      first_name,
      last_name,
      rate_code,
      area,
      street_name,
      apartment,
      address,
      contact_number,
      alter_Contact_Number,
      email,
      Password,
      confirmPassword
    } = credentials;

    onAuthenticate({
      first_name,
      last_name,
      rate_code,
      area,
      street_name,
      apartment,
      address,
      contact_number,
      alter_Contact_Number,
      email,
      Password,
      confirmPassword
    });
  }

  return (
    <View style={[styles.authContent,{marginTop: isLogin && 64,}]}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <Caption
          text={isLogin ? 'Create a new user' : 'Log in instead'}
          onPressBtn={switchAuthModeHandler}
        />
        {/* <Text></Text> */}
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  // authContent: {
  //   marginTop: 30,
  //   marginHorizontal: 20,
  //   padding: 16,
  //   borderRadius: 8,
  // },
  // buttons: {
  //   marginTop: 8,
  // },
  authContent: {
    // 
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
  },
  buttons: {
    marginTop: 8,
  },
});
