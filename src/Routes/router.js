import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../Screens/Auth/SignIn';
import OnBoarding from '../Screens/Auth/OnBoarding';
import SignUp from '../Screens/Auth/SignUp';
import RegistrationForm from '../Screens/Auth/RegistrationForm';
import RegistrationDocuments from '../Screens/Auth/RegistrationDocuments';
import ForgetPassword from '../Screens/Auth/ForgetPassword';
import Verification from '../Screens/Auth/Verification';
import ResetPassword from '../Screens/Auth/ResetPassword';
import Home from '../Screens/App/Home';
import Profile from '../Screens/App/BottomTab/Profile';
import {Colors, Fonts, Icons, Images} from '../constants';
import MyOrders from '../Screens/App/BottomTab/MyOrders';
import Dashboard from '../Screens/App/BottomTab/Dashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MyWallet from '../Screens/App/Drawer/MyWallet';
import UpdateProfile from '../Screens/App/Drawer/UpdateProfile';
import UpdatePassword from '../Screens/App/Drawer/UpdatePassword';
import PrivacyPolicy from '../Screens/App/Drawer/PrivacyPolicy';
import TermsAndCondition from '../Screens/App/Drawer/TermsAndCondition';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import RBSheetConfirmation from '../components/BottomSheet/RBSheetConfirmation';
import {useNavigation} from '@react-navigation/native';
import ConfirmationModal from '../components/Modal/ConfirmationModal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Notifications from '../Screens/App/Notifications';
import MyOrdersDetail from '../Screens/App/BottomTab/MyOrders/MyOrdersDetail';
import OrderHistory from '../Screens/App/OrderHistory';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: ({focused}) => {
          focused ? {paddingTop: 3} : {paddingTop: 0};
        },
        tabBarLabel: ({focused}) => {
          return focused ? (
            <Text
              style={{
                fontSize: RFPercentage(1.4),
                fontFamily: Fonts.PlusJakartaSans_Regular,
                color: '#FF5722',
              }}>
              {route?.name}
            </Text>
          ) : null;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <Icons.DiscoverActive /> : <Icons.Discover />,
        }}
      />

      <Tab.Screen
        name="My Orders"
        component={MyOrders}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <Icons.OrdersActive /> : <Icons.Order />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <Icons.ProfileActive /> : <Icons.Profile />,
        }}
      />
    </Tab.Navigator>
  );
}

// _____________________________ Drawer_Navigation --------------------------------

const CustomDrawerContent = props => {
  const ref_RBSheet = useRef();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  return (
    <DrawerContentScrollView
      {...props}
      style={{}}
      showsVerticalScrollIndicator={false}>
      <StatusBar
        translucent={false}
        barStyle={'dark-content'}
        backgroundColor={Colors.White}
      />
      <ConfirmationModal visible={visible} setVisible={setVisible} />
      <View
        style={{
          height: hp(100),
          backgroundColor: Colors.White,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // height: hp(25),
          }}>
          <Image
            source={Images.logo}
            style={{
              width: hp(25),
              height: hp(13),
              resizeMode: 'contain',
              marginVertical: hp(5),
            }}
          />
          <View
            style={{
              width: wp(67),
              height: hp(0.1),
              backgroundColor: '#00000021',
            }}
          />
        </View>

        <View style={{flex: 1, marginVertical: 20}}>
          <View style={{marginLeft: 20}}>
            <DrawerItem
              label="My Wallet"
              onPress={() => navigation.navigate('MyWallet')}
              icon={focused => <Icons.Wallet />}
              labelStyle={drawerItemStyles.label}
              style={drawerItemStyles.item}
            />
            <DrawerItem
              label="Update Profile"
              onPress={() => navigation.navigate('UpdateProfile')}
              icon={focused => <Icons.EditProfile />}
              labelStyle={drawerItemStyles.label}
              style={drawerItemStyles.item}
            />
            <DrawerItem
              label="Update Password"
              onPress={() => navigation.navigate('UpdatePassword')}
              icon={focused => <Icons.LockBlack />}
              labelStyle={drawerItemStyles.label}
              style={drawerItemStyles.item}
            />
            <DrawerItem
              label="Privacy Policy"
              onPress={() => navigation.navigate('PrivacyPolicy')}
              icon={focused => <Icons.Note />}
              labelStyle={drawerItemStyles.label}
              style={drawerItemStyles.item}
            />
            <DrawerItem
              label="Terms & Conditions"
              onPress={() => navigation.navigate('TermsAndCondition')}
              icon={focused => <Icons.Note />}
              labelStyle={drawerItemStyles.label}
              style={drawerItemStyles.item}
            />
          </View>
          <View
            style={{
              flex: 0.85,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                // navigation?.popToTop();
                // navigation?.navigate('SignIn');
                ref_RBSheet?.current?.open();
              }}
              style={{
                width: wp(60),
                height: 40,
                backgroundColor: Colors.Orange,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                flexDirection: 'row',
              }}>
              <Icons.LogoutIcon />
              <Text style={{color: 'white', marginLeft: 10}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <RBSheetConfirmation
        refRBSheet={ref_RBSheet}
        title={'Logout?'}
        description={'Do you want to logout?'}
        okText={'LOGOUT'}
        onOk={() => {
          ref_RBSheet?.current?.close();
          navigation?.popToTop();
          navigation?.navigate('SignIn');
        }}
      />
    </DrawerContentScrollView>
  );
};

const drawerItemStyles = StyleSheet.create({
  item: {
    marginBottom: -5,
  },
  label: {
    color: '#0A212B',
    fontFamily: Fonts.PlusJakartaSans_Medium,
    marginLeft: -15,
  },
  label1: {
    color: '#0A212B',
    fontFamily: Fonts.PlusJakartaSans_Medium,
    marginLeft: -6,
  },
});

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        // gestureEnabled: false,
        // drawerStatusBarAnimation: 'none',
        // activeTintColor: 'black', // Customize the active item text color
        // inactiveTintColor: 'black', // Customize the inactive item text color
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Tab"
        component={DashboardTabs}
        options={{title: 'Home'}}
      />
      <Drawer.Screen name="MyWallet" component={MyWallet} />
      <Drawer.Screen name="UpdateProfile" component={UpdateProfile} />
      <Drawer.Screen name="UpdatePassword" component={UpdatePassword} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Drawer.Screen name="TermsAndCondition" component={TermsAndCondition} />
    </Drawer.Navigator>
  );
};

// _____________________________ Drawer_Navigation --------------------------------

function Router() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="RegistrationForm" component={RegistrationForm} />
      <Stack.Screen
        name="RegistrationDocuments"
        component={RegistrationDocuments}
      />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="MyOrdersDetail" component={MyOrdersDetail} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      {/* --------------------- app stack --------------------------------- */}
      {/* <Stack.Screen name="Home" component={Home} /> */}
      {/* <Stack.Screen name="Home" component={DashboardTabs} /> */}
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
}
export default Router;
