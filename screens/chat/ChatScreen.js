import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ColorPalate, MyFonts } from "../../constants/var";
import Input from "../../components/Auth/Input";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { API_URL } from "../../config";
import axios from "axios";
import useMessages from "../../components/customHooks/useMessages";

const messageData = [
  { _id: 1, message: "Hi there!", msgBy: "user", time: "3:00" },
  {
    _id: 2,
    message: "Hello! How can I help you?",
    msgBy: "support",
    time: "3:01",
  },
  {
    _id: 3,
    message: "I'm having trouble with my account.",
    msgBy: "user",
    time: "3:02",
  },
  {
    _id: 4,
    message: "Sure, I can assist with that. What seems to be the issue?",
    msgBy: "support",
    time: "3:03",
  },
  { _id: 5, message: "I forgot my password.", msgBy: "user", time: "3:04" },
  {
    _id: 6,
    message: "No problem, I can help you reset it.",
    msgBy: "support",
    time: "3:05",
  },
  { _id: 7, message: "Thanks!", msgBy: "user", time: "3:06" },
  {
    _id: 8,
    message: "Can you provide your email address?",
    msgBy: "support",
    time: "3:07",
  },
  {
    _id: 9,
    message: "Sure, it's user@example.com",
    msgBy: "user",
    time: "3:08",
  },
  {
    _id: 10,
    message: "Great, I've sent a reset link to your email.",
    msgBy: "support",
    time: "3:09",
  },
  {
    _id: 11,
    message: "Received it, thanks for the quick help!",
    msgBy: "user",
    time: "3:10",
  },
  {
    _id: 12,
    message: "You're welcome! Anything else I can assist with?",
    msgBy: "support",
    time: "3:11",
  },
  { _id: 13, message: "No, that's all for now.", msgBy: "user", time: "3:12" },
  {
    _id: 14,
    message: "Alright, have a great day!",
    msgBy: "support",
    time: "3:13",
  },
  { _id: 15, message: "You too, goodbye!", msgBy: "user", time: "3:14" },
  {
    _id: 16,
    message: "Hello, I need help with my order.",
    msgBy: "user",
    time: "4:00",
  },
  {
    _id: 17,
    message: "Of course, can you provide your order number?",
    msgBy: "support",
    time: "4:01",
  },
  { _id: 18, message: "It's 123456.", msgBy: "user", time: "4:02" },
  {
    _id: 19,
    message: "Thanks, let me check that for you.",
    msgBy: "support",
    time: "4:03",
  },
  { _id: 20, message: "Appreciate it.", msgBy: "user", time: "4:04" },
  {
    _id: 21,
    message: "I see there was a delay in shipping. It should arrive tomorrow.",
    msgBy: "support",
    time: "4:05",
  },
  {
    _id: 22,
    message: "Okay, thank you for the update.",
    msgBy: "user",
    time: "4:06",
  },
  {
    _id: 23,
    message: "Is there anything else I can do for you?",
    msgBy: "support",
    time: "4:07",
  },
  {
    _id: 24,
    message: "No, that's all. Thanks again.",
    msgBy: "user",
    time: "4:08",
  },
  {
    _id: 25,
    message: "You're welcome! Have a good day.",
    msgBy: "support",
    time: "4:09",
  },
  {
    _id: 26,
    message: "Need assistance with a product.",
    msgBy: "user",
    time: "5:00",
  },
  {
    _id: 27,
    message: "Sure, what product are you inquiring about?",
    msgBy: "support",
    time: "5:01",
  },
  {
    _id: 28,
    message: "It's about the wireless headphones.",
    msgBy: "user",
    time: "5:02",
  },
  {
    _id: 29,
    message: "What seems to be the issue?",
    msgBy: "support",
    time: "5:03",
  },
  {
    _id: 30,
    message: "They stopped working suddenly.",
    msgBy: "user",
    time: "5:04",
  },
  {
    _id: 31,
    message: "I'm sorry to hear that. Have you tried charging them?",
    msgBy: "support",
    time: "5:05",
  },
];

const ChatScreen = () => {
  const currentCustomer = useSelector(
    (state) => state?.filteredData?.currentCustomerData
  );

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [senderId, setsenderId] = useState(currentCustomer?._id);

  // 'ikrambagban471@gmail.com
  const [recipient, setRecipient] = useState("65a66a02247e626af832b320");
  const [name, setName] = useState(currentCustomer?.first_name);

  const [msges, isLoading] = useMessages();

  useEffect(() => {
    setMessages(msges);
  }, [msges]);

  useEffect(() => {
    const newSocket = io(API_URL);
    setSocket(newSocket);

    newSocket.on("message_received", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && senderId) {
      socket.emit("register_user", senderId);
    }
  }, [socket]);

  const sendMessageHandler = () => {
    if (socket) {
      const messageData = {
        message: input,
        senderId: senderId,
        recipient: recipient,
        name: name,
      };

      socket.emit("new_message", messageData);
      setInput("");
    } else {
      console.error("Socket not connected");
    }
  };

  const inputChangeHandler = (value) => {
    setInput(value);
  };
  return (
    <View style={{ height: "100%", backgroundColor: ColorPalate.lgrey }}>
      {/* <View style={styles.supportTextContainer}>
        <Text style={styles.supportText}>support</Text>
      </View> */}

      <View style={styles.messagesContainer}>
        <FlatList
          data={messages}
          renderItem={({ item }) => {
            return (
              <View style={styles.userMessageContainer}>
                <Text
                  style={[
                    styles.userMessage,
                    {
                      alignSelf:
                        item.senderId === currentCustomer?._id
                          ? "flex-end"
                          : "flex-start",
                    },
                  ]}
                >
                  {item.message}
                </Text>
              </View>
            );
          }}
        />
      </View>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: ColorPalate.themeprimary,
        }}
      >
        <TextInput
          onChangeText={inputChangeHandler}
          style={styles.chatInput}
          value={input}
          placeholder="type here..."
          placeholderTextColor={ColorPalate.dgrey}
          multiline
        />
        {/* <Input style={styles.chatInput} /> */}
        <View style={styles.sendIconContainer}>
          <Pressable
            onPress={sendMessageHandler}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <MaterialIcons
              name="send"
              color={ColorPalate.themeprimary}
              size={26}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  supportTextContainer: {
    backgroundColor: ColorPalate.white,
    elevation: 5,
    shadowColor: "#000",
  },
  supportText: {
    color: ColorPalate.themeprimary,
    fontSize: 24,
    fontFamily: MyFonts.fontbold,
    alignSelf: "center",
    padding: 15,
  },
  messagesContainer: {
    flex: 1,
    // paddingHorizontal: 10,
    marginBottom: 55,
    // paddingTop: 10,
  },
  userMessageContainer: {
    marginVertical: 5,
    //   alignSelf: 'stretch',
  },
  userMessage: {
    borderWidth: 1,
    borderColor: ColorPalate.themeprimary,
    borderRadius: 15,
    color: ColorPalate.themeprimary,
    backgroundColor: ColorPalate.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    maxWidth: "80%",
    alignSelf: "flex-start",

    fontFamily: MyFonts.fontregular,
  },
  chatInput: {
    flex: 1,
    borderColor: ColorPalate.themeprimary,
    padding: 10,
    color: ColorPalate.dgrey,
    backgroundColor: "#e6e6e6",
    // borderRadius: 10,
    // borderWidth: 1,
    // marginRight: 5,
    maxHeight: 100,
    fontFamily: MyFonts.fontregular,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: ColorPalate.white,
    borderTopColor: ColorPalate.themeprimary,
    borderTopWidth: 1,
  },
  sendIconContainer: {
    borderLeftWidth: 1,
    borderColor: ColorPalate.themeprimary,
    padding: 10,
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPalate.white,
  },
  sendIcon: {
    color: ColorPalate.themeprimary,
  },
});
