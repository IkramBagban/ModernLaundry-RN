import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import MyTabView from "../../components/Category/TabView";
import { ColorPalate, MyFonts } from "../../constants/var";
import { Totaling } from "../../components/Totaling";

const ProductCategory = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <MyTabView />
      </View>
      <Totaling navigateTo="SelectService" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  totalContainer: {
    backgroundColor: ColorPalate.themesecondary,
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderTopColor: ColorPalate.lgrey,
  },
  totalText: {
    color: ColorPalate.white,
    fontFamily: MyFonts.fontregular,
    fontSize: 18,
  },
});

export default ProductCategory;
