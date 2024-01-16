import {Text, View, StyleSheet} from 'react-native';
// import {ColorPalate} from '../constants/var';
import {ColorPalate} from '../constants/var';

const CardItem = ({children}) => {
  return (
    <View style={styles.item}>
      <Text style={{color:ColorPalate.dgrey}}>{children}</Text>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  item: {
    marginVertical: 5,
    padding: 20,
    backgroundColor: ColorPalate.white,
    borderRadius: 5,
    height: 70,
    justifyContent: 'center',
  },
});
