import React,{useEffect} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image, StatusBar,FlatList,} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {getContacts} from '../actions/getcontacts';
import faker from 'faker'
import BigList from "react-native-big-list";
faker.seed(10);
const DATA = [...Array(2000).keys()].map((_, i) => {
    return {
        key: faker.datatype.number,
        image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.datatype.number(60)}.jpg`,
        displayName: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
        contact:faker.phone.phoneNumberFormat()
        
    };
});
const Item = ({ displayName,image,jobTitle,contact }) => (
  <TouchableOpacity style={styles.item}>
   
      <Image source={{uri:image}} style={{height:60,width:60,borderRadius:60,alignSelf:"center", resizeMode:"center"}} />
    
    <View style={{marginLeft:10,}}>
      <Text>{displayName}</Text>
      <Text>{contact}</Text>
    </View>
    <View>

    </View>
  </TouchableOpacity>
);

const PlaceholderComponent = () => (
  <TouchableOpacity style={styles.item}>
    <Image source={{uri:`https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.datatype.number(60)}.jpg`}} style={{height:60,width:60,borderRadius:60,alignSelf:"center", resizeMode:"center"}} />
    <View style={{marginLeft:10,}}>
      <Text>Loading</Text>
      <Text>Please Wait</Text>
    </View>
    <View>
    </View>
  </TouchableOpacity>
)


const Movies = () => {
 
  // const {contacts} = useSelector(state => state.ContactsReducer);
  // const dispatch = useDispatch();
  // const fetchContacts = () => dispatch(getContacts());
  
  
  // useEffect(() => {
  //   fetchContacts();
  // }, []);
  
  const renderItem = ({ item }) => (
    <Item 
      displayName={item.displayName} 
      image={item.image}
      jobTitle={item.jobTitle}
      contact={item.contact}      
    />
  );

  
  return (
    <View style={styles.container}>
     <BigList
        data={DATA.sort((a,b) => a.displayName > b.displayName)}
        itemHeight={96}
        renderItem={renderItem}
        placeholder={true}
        legacyImplementation={true}
        horizontal={false}
        windowSize={250}
        removeClippedSubviews={true}
        initialNumToRender={100}
        updateCellsBatchingPeriod={30}
        numColumns={1}
        onEndReachedThreshold={0.7}
        refreshing={true}
        maxToRenderPerBatch={120}
        placeholderComponent={PlaceholderComponent}
        keyExtractor={item => `${item.key.toString()}${item.displayName}${item.email}`}
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
    paddingHorizontal: 20,
    paddingVertical:10,
    marginVertical: 8,
    height:80,
    alignItems:"center",
    borderRadius:10,
    flexDirection:"row",
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Movies;