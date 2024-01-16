import React, { useEffect, useState, useContext } from "react";
import RNBootSplash from "react-native-bootsplash";
import { StatusBar } from "react-native";
import LoadingOverlay from "./UI/LoadingOverlay";
import Welcome from "./screens/Welcome";
import SignIn from "./screens/auth/SignIn";
import SignUp from "./screens/auth/SignUp";
import store from "./store/redux/store";
import AuthContentProvider from "./store/checkAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./store/checkAuth";
import { Provider, useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreenNavigator,
  OrderScreenNavigator,
  ProfileScreenNavigator,
} from "./CustomNavigation";
import { ColorPalate, MyFonts } from "./constants/var";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwsomeIcon from "react-native-vector-icons/FontAwesome";
import LoginAsGuest from "./screens/auth/LoginAsGuest";
import EnterEmail from "./screens/auth/EnterEmail";
import OTPVarificationScreen from "./screens/auth/OTPVarificationScreen";
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen";
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Email" component={EnterEmail} />
      <Stack.Screen name="OTPVarify" component={OTPVarificationScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Guest" component={LoginAsGuest} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarActiveTintColor: ColorPalate.themeprimary,
        headerShown: false,
      }}
    >
      <Bottom.Screen
        name="HomeScreen"
        component={HomeScreenNavigator}
        options={{
          title: "Modern Laundry",
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontFamily: MyFonts.fontregular },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Bottom.Screen
        name="OrdersScreen"
        component={OrderScreenNavigator}
        options={{
          tabBarLabel: "Orders",
          tabBarLabelStyle: { fontFamily: MyFonts.fontregular },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list-alt" color={color} size={26} />
          ),
        }}
      />
      <Bottom.Screen
        name="ProfileScreen"
        component={ProfileScreenNavigator}
        options={{
          tabBarLabel: "Account",
          tabBarLabelStyle: { fontFamily: MyFonts.fontregular },
          tabBarIcon: ({ color, size }) => (
            <FontAwsomeIcon name="user" color={color} size={26} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
}

function Navigation() {
  const authCntx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCntx.isAuthendicate && <AuthStack />}
      {authCntx.isAuthendicate && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
function TokenCheck() {
  const [isTryingToLogging, setisTryingToLogging] = useState(true);
  const authCntx = useContext(AuthContext);
  useEffect(() => {
    const checkStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("customerId");
        storedToken && authCntx.authenticate(storedToken);
        setisTryingToLogging(false);
      } catch (error) {
        console.log(error);
      }
    };
    checkStoredToken();
  }, []);

  if (isTryingToLogging) {
    return <LoadingOverlay message="wait a moment" />;
  }

  return <Navigation />;
}

const App = () => {
  useEffect(() => {
    RNBootSplash.hide();
  }, []);
  return (
    <>
      <Provider store={store}>
        <AuthContentProvider>
          <StatusBar style="light" />
          <TokenCheck />
          <FlashMessage
            position="top"
            textStyle={{
              fontFamily: MyFonts.fontregular,
            }}
            titleStyle={{
              fontFamily: MyFonts.fontregular,
            }}
          />
        </AuthContentProvider>
      </Provider>
    </>
  );
};

export default App;
