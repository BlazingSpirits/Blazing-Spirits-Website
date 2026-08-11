import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { View, Text, Image, Dimensions, Pressable, Modal} from "react-native";
import { useState } from 'react';
import { useWindowDimensions } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useResponsive from '@/hooks/useResponsive';
import * as FileSystem from 'expo-file-system';



export default function NavBar() {
  const { width, height } = useWindowDimensions();
  const { isMobile } = useResponsive();

  const [modalVisible, setModalVisible] = useState(false);
  const pathname = usePathname();

  const navLinkStyle = (route: string) => ({
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
    borderBottomWidth: pathname === route ? 2 : 0,
    paddingBottom: 5,
  });

  const styles = StyleSheet.create({
    navBar:{
      width: width,
      height: 75,
      paddingHorizontal: 25,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      
    },
    logoView:{
      width: 270,
      height: 70,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logoImage:{
      width: 60,
      height: 60,
      borderRadius: 0,
    },
    directLinksView:{
      width: 300,
      height: height * 0.1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logoText:{
      letterSpacing:-0.5,
      fontSize: 25,
      fontFamily: 'Lato_300Light_Italic'
    },
    directLinkText:{
      fontSize: 18,
      fontFamily: 'Lato_400Regular'
    },
    modalText:{
      fontSize: 25,
      fontFamily: 'Lato_400Regular'
    },
    cancelRow:{
      width: width,
      height: 50,
      padding: 10,
      flexDirection: "row-reverse"
    },
    modalRow:{
      width: width,
      height: 75,
      padding: 10,
      justifyContent: "center",
      borderTopWidth: 1,
    }

  });

  
  return (
    <>
      {!modalVisible ? (
        <View style={[styles.navBar]}>
          <Link href="/">
            <View style={styles.logoView}>
              <Image style={styles.logoImage} resizeMode='contain' source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYp2oJD7ooZ3R9cVnuiZLjG1g79_XCr06wvUjCI8d5GN_OigmEafgFx8&s=10" }} />
              {!isMobile ? (
                <Image style={{width: 250, height: 70}} resizeMode='contain' source={require('website_130/assets/images/blazing-spirits-text-logo.svg')}/>
              ) : (
                <Image style={{width: 200, height: 70}} resizeMode='contain' source={require('website_130/assets/images/blazing-spirits-text-logo.svg')}/>
              )}
              
            </View>
          </Link>


          {!isMobile ? (
            <View style={[styles.directLinksView,]}>
              <Link href="/about-us">
                <Text style={navLinkStyle("/about-us")}>
                  About Us
                </Text>
              </Link>
              <Link href="/events">
                <Text style={navLinkStyle("/events")}>
                  Events
                </Text>
              </Link>
              <Link href="/support">
                <Text style={navLinkStyle("/support")}>
                  Support Us
                </Text>
              </Link>
            </View>
          ) : (
            <View>
              <Pressable onPress={()=>{setModalVisible(true)}}>
                <MaterialIcons
                  name="menu"
                  size={30}
                  color="black"
                />
              </Pressable>
            </View>
          )}
        </View>
      ) : (
        <Modal style={{ flex: 1, height: height }} animationType='fade'>
          <View style={styles.cancelRow}>
            <Pressable onPress={()=>{setModalVisible(false)}}>
                <MaterialIcons
                  name="cancel"
                  size={30}
                  color="black"
                />
              </Pressable>
          </View>
          <View style={styles.modalRow}>
            <Link href="/about-us" onPress={()=>{setModalVisible(false)}}>
              <Text style={styles.modalText}>
                About Us
              </Text>
            </Link>
          </View>
          <View style={styles.modalRow}>
            <Link href="/events" onPress={()=>{setModalVisible(false)}}>
              <Text style={styles.modalText}>
                Events
              </Text>
            </Link>
          </View>
          <View style={[styles.modalRow, {borderBottomWidth: 1}]}>
            <Link href="/support" onPress={()=>{setModalVisible(false)}}>
              <Text style={styles.modalText}>
                Support Us
              </Text>
            </Link>
          </View>
        </Modal>
      )}
    </>
    
    
  );
}

