import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TabView, TabBar } from "react-native-tab-view";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import { ColorPalate, MyFonts } from "../../constants/var";
import ProductItem from "./ProductItem";
import HomeDropdown from "../HomeDropdown";
import useEmirates from "../customHooks/getEmirates";
import useCustomerId from "../customHooks/customerId";
import useCurrentCustomer from "../customHooks/currentCustomer";
import useCurrentUserOrders from "../customHooks/getOrders";
import { useProducts } from "../customHooks/allProducts";
import {
  setAllProductsData,
  setCurrentCustomerData,
  setEmiratesData,
  setOrderData,
} from "../../store/redux/reduxToolkit/filteredDataSlice";

import products from "../../utils/products";

const routes = [
  { key: "Men", title: "Men" },
  { key: "Ladies", title: "Ladies" },
  { key: "Kids", title: "Kids" },
  { key: "Home", title: "Home" },
];

const renderTabBar = (props) => (
  <TabBar
    {...props}
    bounces
    inactiveColor={ColorPalate.dgrey}
    activeColor={ColorPalate.themeprimary}
    pressColor={ColorPalate.lgrey}
    indicatorStyle={{ backgroundColor: ColorPalate.themeprimary, height: 3 }}
    style={{ backgroundColor: ColorPalate.white }}
    labelStyle={{ fontFamily: MyFonts.fontregular, fontSize: 12 }}
  />
);

const MyTabView = ({ selectedTime, selectedServiceId }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [index, setIndex] = useState(0);
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [selectedEmirate, setSelectedEmirate] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [isLoading , setIsLoading] = useState(true)

  const dispatch = useDispatch();


  // const { products, isLoading } = useProducts();
  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  },[])
  // let isLoading = false;
  console.log("length of products : " , products.length)

  const orders = useCurrentUserOrders();
  const emirates = useEmirates();
  const customerId = useCustomerId();
  const currentCustomer = useCurrentCustomer(customerId);

  console.log(`customerId => (${customerId}) - selected emirate => (${selectedEmirate})`);
  // console.log("selectedEmirate ==========> ", selectedEmirate);

  useEffect(() => {
    dispatch(setCurrentCustomerData(currentCustomer));
    setSelectedEmirate(currentCustomer?.rate_code);
  }, [currentCustomer]);

  useEffect(() => {
    dispatch(setOrderData(orders));
  }, [orders]);

  useEffect(() => {
    if (emirates) {
      dispatch(setEmiratesData(emirates));
    }
  }, [emirates]);

  // Got an error while postin the order
  useEffect(() => {
    const handleSearch = () => {
      if (searchKeyword.trim() !== "") {
        const filtered = products?.filter((product) =>
          product.item_name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setFilteredProducts(filtered);

        // Check if the filtered product is in a different tab and switch to that tab
        const category = filtered.length > 0 ? filtered[0].item_cat1 : null;
        const tabIndex = routes.findIndex((route) => route.key === category);
        if (tabIndex !== -1 && tabIndex !== index) {
          setIndex(tabIndex);
        }
      } else {
        setFilteredProducts(products);
      }
    };
    handleSearch();
  }, [searchKeyword, products]);

  const headerCollapseHandler = useCallback((shouldExpand) => {
    setSearchExpanded(shouldExpand);
  }, []);

  const CategoryList = ({ categoryName }) => {
    const filteredData = useMemo(() => {
      return filteredProducts?.filter(
        (item) => item.item_cat1 === categoryName
      );
    }, [filteredProducts, categoryName]);

    return isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={ColorPalate.themeprimary} />
      </View>
    ) : (
      <FlatList
        initialNumToRender={10}
        data={filteredData}
        keyExtractor={(item) => item.itemID}
        renderItem={({ item, index }) => (
          <ProductItem
            product={item}
            selectedEmirate={selectedEmirate}
            index={index}
            serviceId={selectedServiceId}
            delveryTimeId={selectedTime}
          />
        )}
      />
    );
  };

  const renderScene = ({ route }) => {
    return <CategoryList categoryName={route.key} />;
  };

  return (
    <View style={styles.container}>
      {/* <View styles={[styles.collapseContainer]}> */}
      <View
        style={{
          height: 53,
          backgroundColor: ColorPalate.white,
          zIndex: 100000,
          flexDirection: "row",
          paddingTop: 10,
        }}
      >
        {isSearchExpanded ? (
          <View
            style={[
              styles.searchContainer,
              { flex: 1, justifyContent: "center", alignItems: "center" },
            ]}
          >
            <View
              style={[
                styles.searchInputContainer,
                {
                  backgroundColor: ColorPalate.white,
                  width: "100%",
                  position: "absolute",
                },
              ]}
            >
              <TextInput
                style={styles.searchInput}
                placeholder="Search product"
                value={searchKeyword}
                onChangeText={(text) => setSearchKeyword(text)}
                placeholderTextColor={ColorPalate.dgrey}
              />
              <FontAwesomeIcon
                name="search"
                size={24}
                color={ColorPalate.dgrey}
                style={styles.searchIcon}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              position: "relative",
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 7,
            }}
          >
            <Pressable style={{}} onPress={() => headerCollapseHandler(true)}>
              <Text style={{}}>
                <FontAwesomeIcon
                  name="search"
                  size={22}
                  style={styles.searchIcon}
                  color={ColorPalate.dgrey}
                />
              </Text>
            </Pressable>
          </View>
        )}

        {isSearchExpanded ? (
          <Pressable
            style={{
              position: "relative",
              height: 45,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => headerCollapseHandler(false)}
          >
            <View>
              <Text style={{ marginRight: 14 }}>
                <FontAwesomeIcon
                  name="map"
                  size={22}
                  color={ColorPalate.dgrey}
                  style={styles.mapIcon}
                />
              </Text>
            </View>
          </Pressable>
        ) : (
          <View
            style={{
              flex: 1,
              height: 50,
              position: "relative",
              right: 1,
            }}
          >
            <HomeDropdown
              options={emirates}
              onSelect={setSelectedEmirate}
              key={"RateCodeID"}
              value={"rate_code"}
              selectedValue={selectedEmirate ?? currentCustomer?.rate_code}
            />
          </View>
        )}
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  collapseContainer: {
    flex: 1,
    width: "100%",
    borderTopWidth: 10,
    backgroundColor: ColorPalate.white,
  },
  searchContainer: {
    paddingHorizontal: 16,
    backgroundColor: ColorPalate.white,
    paddingTop: 16,
  },
  smallSearchContainer: {
    marginLeft: 16,
    backgroundColor: ColorPalate.white,
    paddingTop: 16,
    width: "12%",
    justifyContent: "center",
    alignItems: "center",
  },

  searchInputContainer: {
    // position: "relative",
  },

  searchInput: {
    backgroundColor: ColorPalate.lgrey,
    color: ColorPalate.dgrey,
    borderColor: ColorPalate.dgrey,
    fontFamily: MyFonts.fontregular,
    fontSize: 14,
    height: 40,
    paddingHorizontal: 8,
    paddingRight: 40,
    borderWidth: 1,
    borderRadius: 8,
  },

  searchIcon: {
    position: "absolute",
    right: 8,
    top: 8,
    color: ColorPalate.themeprimary,
  },
  centerSearchIcon: {
    position: "absolute",
    alignSelf: "center",
    top: 8,
  },
});

export default MyTabView;
