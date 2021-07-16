import React,{useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar,FlatList,} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {GetCallLogs} from '../actions/getcalllogs';

const Item = ({ name , phoneNumber}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name!=null?name:phoneNumber}</Text>
  </View>
);

const Movies = () => {
  const {calllogs} = useSelector(state => state.CallLogReducer);
  const dispatch = useDispatch();
  const fetchContacts = () => dispatch(GetCallLogs());
  useEffect(() => {
    fetchContacts();
  }, []);
  
  const renderItem = ({ item }) => (
    <Item name={item.name} phoneNumber={item.phoneNumber} />
  );

  
  return (
    <View style={styles.container}>
    <FlatList
        data={calllogs}
        renderItem={renderItem}
        keyExtractor={item => `${item.timestamp.toString()}${item.phoneNumber.toString()}`}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Movies;