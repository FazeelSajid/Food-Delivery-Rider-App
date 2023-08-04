import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Icons, Fonts, Images} from '../../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StackHeader from '../../../components/Header/StackHeader';
import CInput from '../../../components/TextInput/CInput';
import FoodCardWithRating from '../../../components/Cards/FoodCardWithRating';
import AntDesign from 'react-native-vector-icons/AntDesign';

const OrderHistory = ({navigation, route}) => {
  const [isSearch, setIsSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([
    {
      id: 0,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
      rating: 4.5,
    },
    {
      id: 3,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
      rating: 4.5,
    },
    {
      id: 4,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
      rating: 4.5,
    },
    {
      id: 5,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
      rating: 4.5,
    },
    {
      id: 6,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
      rating: 4.5,
    },
    {
      id: 7,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
      rating: 4.5,
    },
    {
      id: 8,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
      rating: 4.5,
    },
    {
      id: 9,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
      rating: 4.5,
    },
    {
      id: 10,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
      rating: 4.5,
    },
    {
      id: 11,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
      rating: 4.5,
    },
  ]);

  const handleSearch = query => {
    setSearchQuery(query);
    const filteredData = data.filter(item =>
      item?.title?.toLowerCase()?.includes(query?.toLowerCase()),
    );
    setFilteredData(filteredData);
  };

  const handleCloseSearch = async () => {
    setIsSearch(false);
    setFilteredData([]);
    setSearchQuery('');
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <StackHeader
          title={'Order History'}
          showTitle={!isSearch}
          iconContainerStyle={{marginTop: isSearch ? -12 : 8}}
          headerStyle={{paddingVertical: isSearch ? 0 : 10}}
          onBackPress={() =>
            isSearch ? handleCloseSearch() : navigation?.goBack()
          }
          rightIcon={
            <>
              {isSearch ? (
                <TouchableOpacity
                  style={{flex: 1, width: wp(70), marginTop: 7}}>
                  <CInput
                    width={wp(75)}
                    height={38}
                    placeholder={'Search'}
                    value={searchQuery}
                    onChangeText={text => handleSearch(text)}
                    leftContent={<Icons.SearchIcon style={{marginRight: 10}} />}
                    rightContent={
                      <TouchableOpacity
                        style={{padding: 10, paddingRight: 0}}
                        onPress={() => handleCloseSearch()}>
                        <AntDesign
                          name="closecircle"
                          size={20}
                          color={'#838383'}
                        />
                      </TouchableOpacity>
                    }
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{paddingLeft: 15}}
                  onPress={() => setIsSearch(true)}>
                  <Icons.SearchIcon />
                </TouchableOpacity>
              )}
            </>
          }
        />

        <View style={{flex: 1, marginTop: -15, paddingBottom: 30}}>
          <FlatList
            data={isSearch ? filteredData : data}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            // ListHeaderComponent={() => <View style={{height: 10}} />}
            renderItem={({item, index}) => {
              return (
                <FoodCardWithRating
                  onPress={() => {
                    navigation.navigate('MyOrdersDetail', {
                      type: 'order_history',
                    });
                  }}
                  // disabled={true}
                  title={item?.title}
                  image={item?.image}
                  description={item?.description}
                  price={item?.price}
                  rating={item?.rating}
                  // label={item?.status}
                  // type={'all'}
                  cardStyle={{marginTop: 15}}
                  showNextButton={false}
                  showRatingOnBottom={true}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
