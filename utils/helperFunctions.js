import { Alert } from "react-native";
import Toast from 'react-native-toast-message';
import { getEmirates } from "./api";

export function showToast(type, msg1, msg2) {
  Toast.show({
    type: type,
    text1: msg1,
    text2: msg2,
    visibilityTime: 3000,
    style: { backgroundColor: 'red' }
  });
}

export const confirmationAlert = (title, message, onCancel, onConfirm) => {
    Alert.alert(title, message, [
      {
        text: 'Cancel',
        onPress: onCancel,
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: onConfirm,
      },
    ]);
  };
  

  // export const getEmirateName = async (id) =>{
  //   const emirates = await getEmirates()
  //   const emirate = emirates.data.find((emirate)=> emirate.RateCodeID == id )
  //   return emirate?.rate_code
  // }

  export const changeEmirateTo = async (value,changeTo) =>{
    try{
    const emirates = await getEmirates()
    if(changeTo === "name"){
        return emirates.data.find((emirate)=> emirate.RateCodeID == value )?.rate_code
    }
    
    else if(changeTo === "id"){
        return emirates.data.find((emirate)=> emirate.rate_code == value )?.RateCodeID
    }
    else{
      console.log('something went wrong')
    }
  }catch(e){
    console.log(e)
  }
  }

 export function formatDate(dateString) {
    const parts = dateString.split('/');
    const day = parts[1].padStart(2, '0');
    const month = parts[0].padStart(2, '0');
    const year = parts[2];
    return `${day}/${month}/${year}`;
  }