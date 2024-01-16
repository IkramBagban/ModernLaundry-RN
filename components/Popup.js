import {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Modal, Pressable, View, Text, StyleSheet} from 'react-native';

const Popup = ({checkvisible}) => {
  const [visible, setvisible] = useState(false);
  return (
    <View>
      <Modal visible={visible} transparent>
        <SafeAreaView>
          <Text>helow</Text>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Popup;

const styles = StyleSheet.create({
  popup: {
    top: 10,
    right: 20,
  },
});
