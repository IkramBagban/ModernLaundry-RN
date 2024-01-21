import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorPalate, MyFonts } from "../../constants/var";
import useFetch from "../../components/customHooks/useFetch";
import { addAllConversationToStore } from "../../store/redux/reduxToolkit/chatSlice";
import useMessages from "../../components/customHooks/useMessages";

const ChatMainScreen = ({ navigation }) => {
  const [accounts, isLoading] = useFetch("/message/accounts");
  const [filteredAccounts, setFilteredAccounts] = useState(null);
  const [msges] = useMessages();

  const dispatch = useDispatch();

  const currentCustomer = useSelector(
    (state) => state?.filteredData?.currentCustomerData
  );

  useEffect(() => {
    if (!msges) return;
    dispatch(addAllConversationToStore(msges));
  }, [msges]);

  useEffect(() => {
    if (!currentCustomer) return;

    if (currentCustomer?.email !== "ikrambagban471@gmail.com") {
      return navigation.replace("Chat");
    }
  }, [currentCustomer && currentCustomer.email]);

  useEffect(() => {
    if (!accounts) return;

    const filtered = accounts.filter((a) => a.isStartedChatting);
    setFilteredAccounts(filtered);
  }, [isLoading]);

  const contactClickHandler = (senderId, recipient, name, lastname) => {
    navigation.navigate("AdminChat", {
      senderId: senderId,
      recipient: recipient,
      name: name,
      lastname: lastname,
    });
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={ColorPalate.themeprimary} />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={filteredAccounts && filteredAccounts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.7 : 1 },
            ]}
              onPress={() => {
                const recipient = item._id;
                contactClickHandler(
                  currentCustomer?._id,
                  recipient,
                  item.first_name,
                  item.last_name
                );
              }}
            >
              <View
                style={{
                  width: "100%",
                  padding: 10,
                  borderWidth: 1,
                  display: "flex",
                }}
              >
                <Text
                  style={{
                    color: ColorPalate.themeprimary,
                    fontFamily: MyFonts.fontbold,
                  }}
                >
                  {item?.first_name + " " + item?.last_name || "Guest"}
                </Text>
                <Text style={{color : ColorPalate.dgrey}}>{item?.email}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default ChatMainScreen;
