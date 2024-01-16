

// import React, { useRef, useEffect } from "react";
// import {
//   ScrollView,
//   TextInput,
//   View,
//   StyleSheet,
//   Animated,
//   Text,
// } from "react-native";
// import MyTabView from "../../components/Category/TabView";
// import { ColorPalate, MyFonts } from "../../constants/var";
// import { useSelector } from "react-redux";
// import { Totaling } from "../../components/Totaling";

// const Home = () => {
//   const scrollY = useRef(new Animated.Value(0)).current;
//   let firstInputHeight = useRef(0).current;
//   let secondInputHeight = useRef(0).current;
//   const secondInputRef = useRef(null);

//   useEffect(() => {
//     scrollY.addListener(({ value }) => {
//       if (value >= firstInputHeight) {
//         secondInputRef.current.setNativeProps({ style: { zIndex: 1 } });
//       } else {
//         secondInputRef.current.setNativeProps({ style: { zIndex: -1 } });
//       }
//     });

//     return () => {
//       scrollY.removeAllListeners();
//     };
//   }, [firstInputHeight]);

//   const handleFirstLayout = (event) => {
//     firstInputHeight = event.nativeEvent.layout.height;
//   };

//   const handleSecondLayout = (event) => {
//     secondInputHeight = event.nativeEvent.layout.height;
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.contentContainer}
//       onScroll={Animated.event(
//         [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//         { useNativeDriver: true }
//       )}
//       scrollEventThrottle={16}
//     >
//       <View style={styles.searchContainer} onLayout={handleFirstLayout}>
//         <TextInput style={styles.searchInput} placeholder="Search" />
//       </View>
//       <View
//         style={styles.secondInputContainer}
//         onLayout={handleSecondLayout}
//         ref={secondInputRef}
//       >
//         <TextInput style={styles.secondInput} placeholder="Second Input" />
//       </View>
//       {/* Rest of the content */}

//       <View style={styles.container}>
//         <View style={{ flex: 3 }}>
//           <MyTabView />
//         </View>
//         <Totaling navigateTo="SelectService" />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   contentContainer: {
//     paddingVertical: 20,
//   },
//   searchContainer: {
//     paddingHorizontal: 20,
//     marginTop: 30,
//   },
//   searchInput: {
//     width: "100%",
//     height: 40,
//     backgroundColor: "#EDEDED",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//   },
//   secondInputContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 20,
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: -1,
//   },
//   secondInput: {
//     width: "100%",
//     height: 40,
//     backgroundColor: "#EDEDED",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//   },
// });

// export default Home;
