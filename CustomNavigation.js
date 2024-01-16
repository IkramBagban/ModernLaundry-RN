import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductCategory from "./screens/HomeScreens/ProductCategory";
import OrderScreen from "./screens/OrderScreens/Orders";
import OrderDetailsScreen from "./screens/OrderScreens/OrderDetails";
import Welcome from "./screens/Welcome";
import CartReview from "./screens/HomeScreens/CartReview";
import SelectService from "./screens/HomeScreens/SelectService";
import { ColorPalate, MyFonts } from "./constants/var";
import ProfileScreen from "./screens/ProfileScreens/Profile";
import UpdateProfileScreen from "./screens/ProfileScreens/UpdateProfileScreen";
import ThanksScreen from "./screens/HomeScreens/ThanksScreen";


const Stack = createNativeStackNavigator();
const HomeScreenNavigator = () => {
  
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            color: ColorPalate.themeprimary,
            fontFamily: MyFonts.fontbold,
            fontSize: 18,
          },
        }}
      >
        {/* <Stack.Screen
        name="Home"
        component={ProductCategory}
        // headerShown={false}
        options={{
          // title: currentCustomer?.rate_code,
          headerShown:false
          }}
      /> */}
        <Stack.Screen
          name="Category"
          component={ProductCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectService"
          component={SelectService}
          options={{ title: "Select Service" }}
        />
        <Stack.Screen
          name="CartReview"
          component={CartReview}
          options={{ title: "Review Order" }}
        />
        <Stack.Screen
          name="Thanks"
          component={ThanksScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{ title: "Update Profile" }}
      />

      </Stack.Navigator>
    </>
  );
};

const OrderScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: ColorPalate.themeprimary,
          fontFamily: MyFonts.fontbold,
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen name="Orders" component={OrderScreen} />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: "Order Details" }}
      />
    </Stack.Navigator>
  );
};

const ProfileScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: ColorPalate.themeprimary,
          fontFamily: MyFonts.fontbold,
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "My Account" }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{ title: "Update Profile" }}
      />

      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export { HomeScreenNavigator, OrderScreenNavigator, ProfileScreenNavigator };
