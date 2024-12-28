import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import StackHeader from '../../../../components/Header/StackHeader';
import CustomerCard from '../../../../components/Cards/CustomerCard';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import api from '../../../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../../components/Loader';
import NoDataFound from '../../../../components/NotFound/NoDataFound';
import { useSelector } from 'react-redux';

const Complaints = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const { rider_id, Colors } = useSelector(store => store.auth)

  const [data, setData] = useState([
    // {
    //   id: 0,
    //   name: 'John Doe',
    //   description:
    //     'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consat ',
    // },
    // {
    //   id: 1,
    //   name: 'John Doe',
    //   description:
    //     'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consat ',
    // },
    // {
    //   id: 2,
    //   name: 'John Doe',
    //   description:
    //     'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consat ',
    // },
    // {
    //   id: 3,
    //   name: 'John Doe',
    //   description:
    //     'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consat ',
    // },
    // {
    //   id: 4,
    //   name: 'John Doe',
    //   description:
    //     'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consat ',
    // },
    // {
    //   id: 5,
    //   name: 'John Doe',
    //   description:
    //     'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consat ',
    // },
    // {
    //   id: 6,
    //   name: 'John Doe',
    //   description:
    //     'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consat ',
    // },
    // {
    //   id: 7,
    //   name: 'John Doe',
    //   description:
    //     'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consat ',
    // },
    // {
    //   id: 8,
    //   name: 'John Doe',
    //   description:
    //     'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consat ',
    // },
    // {
    //   id: 9,
    //   name: 'John Doe',
    //   description:
    //     'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consat ',
    // },
    // {
    //   id: 10,
    //   name: 'John Doe',
    //   description:
    //     'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consat ',
    // },
  ]);

  const getData = async () => {
    fetch(api.get_all_complaints_by_rider + rider_id)
      .then(response => response.json())
      .then(response => {
        if (response?.status == true) {
          setData(response.result);
        }
      })
      .catch(err => console.log('error : ', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.secondary_color}}>
      <Loader loading={loading} />
      <FlatList
        data={data}
        ListHeaderComponent={() => <StackHeader title={'Complaints'} />}
        ListEmptyComponent={() => <NoDataFound loading={loading} />}
        renderItem={({item, index}) => (
          <CustomerCard
            onPress={() =>
              navigation?.navigate('ComplaintDetail', {
                detail: item,
              })
            }
            width={wp(90)}
            // profile={Images.user2}
            showNameProfile={item?.customer?.user_name}
            name={item?.customer?.user_name}
            description={item.description}
            textContainerStyle={{flex: 0.95}}
            descriptionStyle={{
              marginLeft: 0,
              lineHeight: 18,
            }}
            descriptionLines={2}
            itemContainerStyle={{marginBottom: 20, marginTop: 0}}
          />
        )}
      />
    </View>
  );
};

export default Complaints;

const styles = StyleSheet.create({});
