import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ChatMainScreen = ({ navigation }) => {
  const currentCustomer = useSelector(
    (state) => state?.filteredData?.currentCustomerData
  );

  useEffect(() => {
    if(currentCustomer?.email !== "ikrambagban471@gmail.com"){
        navigation.replace("Chat");
    }
  }, []);
  return (
    <View>
      <Text>ChatMainScreen</Text>
    </View>
  );
};

export default ChatMainScreen;
