import { StyleSheet } from "react-native";
import { ColorPalate, MyFonts } from "../../constants/var";

 const commonStyle = StyleSheet.create({
    rootContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    alignSelf: "center",
  },
  textContainer:{
    alignSelf: "center",
    width:'80%'
  },
  headText: {
    alignSelf: "center",
    fontSize: 25,
    color: ColorPalate.themeprimary,
    fontFamily: MyFonts.fontmid,
    marginBottom: 20,
  },
  text: {
    textAlign:'center',
    fontSize: 14,
    color: ColorPalate.dgrey,
    fontFamily: MyFonts.fontregular,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },

 })

 export default commonStyle