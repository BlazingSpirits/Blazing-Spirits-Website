import * as Device from 'expo-device';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, FlatList, ImageBackground, ScrollView, Animated, Easing } from "react-native";
import { useWindowDimensions } from "react-native";
import React, { useEffect, useState, useRef, use } from "react";
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import { withDelay } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { EVENT_DATES, SPONSOR_IMAGE_LIST } from '../../config';
import useResponsive from '@/hooks/useResponsive';

import { router } from 'expo-router';


export default function HomeScreen() {
  const { isMobile } = useResponsive();
  const { width, height } = useWindowDimensions();



  function DesktopHome() {
    const slides = [
      {
        textColor: "orange",
        text: "Innovation.",
        image: require("website_130/assets/images/innovation-photo.png")
      },
      {
        textColor: "blue",
        text: "Initiative.",
        image: require("website_130/assets/images/initiative-photo.jpeg")
      },
      {
        textColor: "white",
        text: "Inspiration.",
        image: require("website_130/assets/images/inspiration-photo.png")
      },
    ];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const transitionDelay = 3000;


    const eventHolderWidth = 1200 + 0.75 * (width - 1272);
    const eventViewWidth = eventHolderWidth / 2 - 25;

    const textXTranslate = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(1)).current;

    const currentImageOpacity = useRef(new Animated.Value(1)).current;
    const nextImageOpacity = useRef(new Animated.Value(0)).current;

    const fadeTransition = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.delay(transitionDelay),
          Animated.parallel([
            Animated.sequence([
              Animated.parallel([
                Animated.timing(textXTranslate, {
                  toValue: -100,
                  duration: 1500,
                  useNativeDriver: true
                }),
                Animated.timing(textOpacity, {
                  toValue: 0,
                  duration: 1500,
                  useNativeDriver: true
                }),
              ]),
              Animated.delay(200),
              Animated.parallel([
                Animated.timing(textXTranslate, {
                  toValue: 0,
                  duration: 1500,
                  useNativeDriver: true
                }),
                Animated.timing(textOpacity, {
                  toValue: 1,
                  duration: 1500,
                  useNativeDriver: true
                }),
              ]),
            ]),

            Animated.sequence([
              Animated.delay(100),
              Animated.parallel([
                Animated.timing(currentImageOpacity, {
                  toValue: 0,
                  duration: 3000,
                  useNativeDriver: true
                }),
                Animated.timing(nextImageOpacity, {
                  toValue: 1,
                  duration: 3000,
                  useNativeDriver: true
                }),
              ])
            ]),
          ])

        ])


      ]).start(() => {
        // Switch the image
        setCurrentImageIndex(prev => (prev + 1) % slides.length);

        // Reset for the next transition
        currentImageOpacity.setValue(1);
        nextImageOpacity.setValue(0);
        // Repeat
        fadeTransition();
      });
      setTimeout(() => {
        setCurrentTextIndex(prev => (prev + 1) % 3);
      }, 1500 + transitionDelay);
    };

    useEffect(() => {
      fadeTransition();

    }, []);



    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',

      },
      slideshowTextView: {
        width: width * 0.8,
        height: height * 0.2,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      },
      slideshowText: {
        fontSize: 30,
        fontFamily: 'Lato_700Bold',
        marginLeft: 50,
        color: "rgb(241, 241, 241))"
      },
      teamInfoView: {
        width: width,
        height: 320,
        marginTop: 50,
        justifyContent: "space-between",
        alignItems: "center",
      },
      teamTextIntro: {
        fontSize: 25,
        fontFamily: 'Lato_400Regular'
      },
      teamSponsorView: {
        width: width,
        height: 260,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      },
      sponsorHeaderText: {
        fontSize: 20,
        fontWeight: "100",
        fontFamily: 'Lato_300Light'
      },
      sponsorImage: {
        width: 900,
        height: 225,
      },
      hero: {
        height: 500,
        overflow: "hidden",
        justifyContent: "center",
      },

      overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "rgba(0,0,0,0.35)",
      },

      textContainer: {
        paddingHorizontal: 30,
        zIndex: 10,
      },

      title: {
        color: "white",
        fontSize: 45,
        fontWeight: "700",
      },

      upcomingEventsView: {
        width: width,
        height: 365,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 75
      },
      upcomingEventsHeader: {
        fontSize: 25,
        fontFamily: "Lato_700Bold",
      },
      eventsHolderView: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: eventHolderWidth
      },
      eventView: {
        width: eventViewWidth,
        height: 300,
        flexDirection: "row"
      },
      eventImage: {
        width: eventViewWidth * (2 / 3),
        height: 300,
        backgroundColor: "blue"
      },
      eventTextView: {
        flexDirection: "column",
        width: eventViewWidth * (1 / 3) - 10,
        height: 300,
        marginLeft: 10
      },
      eventNameHeader: {
        width: 190,
        fontSize: 25,
        fontFamily: "Lato_700Bold",
      },
      eventDescription: {
        width: 190,
        height: 240,
        marginTop: 10,
        fontSize: 17,
        fontFamily: 'Lato_400Regular'
      },
    });
    return (
    
    <ScrollView contentContainerStyle={{paddingBottom: 100}} style={styles.container}>
      <View style={{ backgroundColor: "grey", flexDirection: "row", alignItems: "center", width: width, height: height-70, position: "relative"}}>
          <Animated.Image source={slides[(currentImageIndex + 1) % 3].image} style={[{ width: width, height: height - 70 }, { opacity: nextImageOpacity }]} resizeMode="cover" />
          <Animated.Image source={slides[currentImageIndex].image} style={[{ width: width, height: height - 70, position: "absolute", top: 0, left: 0 }, { opacity: currentImageOpacity }]} resizeMode="cover" />
          <View style={[{ width: width, height: height - 70, position: "absolute", top: 0, left: 0 }, { backgroundColor: "rgba(0, 0, 0, 0.15)" }]}></View>
          <Animated.View style={{position: "absolute", flexDirection: "row"}}>
            <Text style={[styles.slideshowText]}>Sparking</Text>
            <Animated.Text style={[{ transform: [{ translateX: textXTranslate }], opacity: textOpacity }, styles.slideshowText, { marginLeft: 10, color: slides[currentTextIndex].textColor }]}>{slides[currentTextIndex].text}</Animated.Text>
          </Animated.View>
      </View>

      <View style={styles.upcomingEventsView}>
        <Text style={styles.upcomingEventsHeader}> Upcoming Events</Text>
        <View style={styles.eventsHolderView}>
          <Pressable onPress={()=>{router.push({
              pathname: "/events",
              params: {
                event_index: 1
              }
            })}}>
            <View style={styles.eventView}>
                <Image style={styles.eventImage} source={EVENT_DATES[1].image} />
                <View style={styles.eventTextView}>
                  <Text style={styles.eventNameHeader}>{EVENT_DATES[1].eventName}</Text>
                  <Text style={styles.eventDescription}>{EVENT_DATES[1].description}</Text>
                </View>
            </View>
          </Pressable>
          <Pressable onPress={()=>{router.push({
              pathname: "/events",
              params: {
                event_index: 2
              }
            })}}>
          <View style={styles.eventView}>
            <Image style={styles.eventImage} source={EVENT_DATES[2].image}/>
            <View style={styles.eventTextView}>
              <Text style={styles.eventNameHeader}>{EVENT_DATES[2].eventName}</Text>
              <Text style={styles.eventDescription}>{EVENT_DATES[2].description}</Text>
            </View>
          </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.teamInfoView}>
        <Text style={styles.teamTextIntro}>
          We are a <Link href="https://www.firstinspires.org/programs/ftc/" style={{color: "orange"}}>FIRST Tech Challenge</Link> Team based in <Link href="https://maps.app.goo.gl/xj5RwziAvQtdPPwz5" style={{color: "orange"}}>Windsor</Link>, Connecticut
        </Text>
        <View style={styles.teamSponsorView}>
          <Text style={styles.sponsorHeaderText}>
            Sponsored By 
          </Text>
          <Image source={require("website_130/assets/images/logo-collage.png")} resizeMode='contain' style={styles.sponsorImage}/>
        </View>
      </View>

      

    </ScrollView>


  );
  }

  
  function MobileHome(){
    const slides = [
      {
        textColor: "orange",
        text: "Innovation.",
        image: require("website_130/assets/images/innovation-photo.png")
      },
      {
        textColor: "blue",
        text: "Initiative.",
        image: require("website_130/assets/images/initiative-photo.jpeg")
      },
      {
        textColor: "white",
        text: "Inspiration.",
        image: require("website_130/assets/images/inspiration-photo.png")
      },
    ];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const transitionDelay = 3000;


    const eventHolderWidth = 600;
    const eventViewWidth = eventHolderWidth / 2 - 25;

    const textXTranslate = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(1)).current;

    const currentImageOpacity = useRef(new Animated.Value(1)).current;
    const nextImageOpacity = useRef(new Animated.Value(0)).current;

    const fadeTransition = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.delay(transitionDelay),
          Animated.parallel([
            Animated.sequence([
              Animated.parallel([
                Animated.timing(textXTranslate, {
                  toValue: -100,
                  duration: 1500,
                  useNativeDriver: true
                }),
                Animated.timing(textOpacity, {
                  toValue: 0,
                  duration: 1500,
                  useNativeDriver: true
                }),
              ]),
              Animated.delay(200),
              Animated.parallel([
                Animated.timing(textXTranslate, {
                  toValue: 0,
                  duration: 1500,
                  useNativeDriver: true
                }),
                Animated.timing(textOpacity, {
                  toValue: 1,
                  duration: 1500,
                  useNativeDriver: true
                }),
              ]),
            ]),

            Animated.sequence([
              Animated.delay(100),
              Animated.parallel([
                Animated.timing(currentImageOpacity, {
                  toValue: 0,
                  duration: 3000,
                  useNativeDriver: true
                }),
                Animated.timing(nextImageOpacity, {
                  toValue: 1,
                  duration: 3000,
                  useNativeDriver: true
                }),
              ])
            ]),
          ])

        ])


      ]).start(() => {
        // Switch the image
        setCurrentImageIndex(prev => (prev + 1) % slides.length);

        // Reset for the next transition
        currentImageOpacity.setValue(1);
        nextImageOpacity.setValue(0);
        // Repeat
        fadeTransition();
      });
      setTimeout(() => {
        setCurrentTextIndex(prev => (prev + 1) % 3);
      }, 1500 + transitionDelay);
    };

    useEffect(() => {
      fadeTransition();

    }, []);



    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',

      },
      slideshowTextView: {
        width: width * 0.8,
        height: height * 0.2,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      },
      slideshowText: {
        fontSize: 25,
        fontFamily: 'Lato_700Bold',
        marginLeft: 10,
        color: "rgb(241, 241, 241))"
      },
      teamInfoView: {
        width: width,
        height: 215,
        marginTop: 25,
        justifyContent: "space-between",
        alignItems: "center",
      },
      teamTextIntro: {
        fontSize: 18,
        fontFamily: 'Lato_400Regular',
        textAlign: "center",
      },
      teamSponsorView: {
        width: width,
        height: 150,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      },
      sponsorHeaderText: {
        fontSize: 20,
        fontWeight: "100",
        fontFamily: 'Lato_300Light'
      },
      hero: {
        height: 500,
        overflow: "hidden",
        justifyContent: "center",
      },

      overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "rgba(0,0,0,0.35)",
      },

      textContainer: {
        paddingHorizontal: 30,
        zIndex: 10,
      },

      title: {
        color: "white",
        fontSize: 45,
        fontWeight: "700",
      },

      upcomingEventsView: {
        width: width,
        height: 375,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 50
      },
      upcomingEventsHeader: {
        fontSize: 25,
        fontFamily: "Lato_700Bold",
      },
      eventsHolderView: {
        justifyContent: "space-between",
        alignItems: "center",
        width: width
      },
      eventView: {
        width: 350,
        height: 150,
        flexDirection: "row",
        marginTop: 20
      },
      eventImage: {
        width: 150,
        height: 100,
        backgroundColor: "blue"
      },
      eventTextView: {
        flexDirection: "column",
        width: 200,
        height: 150,
        marginLeft: 10
      },
      eventNameHeader: {
        width: 190,
        fontSize: 17,
        fontFamily: "Lato_700Bold",
      },
      eventDescription: {
        width: 190,
        height: 100,
        marginTop: 10,
        fontSize: 15,
        fontFamily: 'Lato_400Regular'
      },
    });

    return(
      <ScrollView contentContainerStyle={{paddingBottom: 30}} style={styles.container}>
        <View style={{ backgroundColor: "grey", flexDirection: "row", alignItems: "center", width: width, height: height/2 - 70 }}>
          <Animated.Image source={slides[(currentImageIndex + 1) % 3].image } style={[{ width: width, height: height/2 - 70 }, { opacity: nextImageOpacity }]} />
          <Animated.Image source={slides[currentImageIndex].image } style={[{ width: width, height: height/2 - 70, position: "absolute"}, { opacity: currentImageOpacity }]} />
          <View style={[{ width: width, height: height/2 - 70, position: "absolute", top: 0, left: 0 }, { backgroundColor: "rgba(0, 0, 0, 0.15)" }]}></View>
          <Animated.View style={{position: "absolute", flexDirection: "row"}}>
            <Text style={[styles.slideshowText]}>Sparking</Text>
            <Animated.Text style={[{ transform: [{ translateX: textXTranslate }], opacity: textOpacity }, styles.slideshowText, { marginLeft: 5, color: slides[currentTextIndex].textColor }]}>{slides[currentTextIndex].text}</Animated.Text>

          </Animated.View>
          
        </View>

        <View style={styles.upcomingEventsView}>
          <Text style={styles.upcomingEventsHeader}> Upcoming Events</Text>
          <View style={styles.eventsHolderView}>
            <Pressable onPress={()=>{router.push({
              pathname: "/events",
              params: {
                event_index: 2
              }
            })}}>
              <View style={styles.eventView}>
                <Image style={styles.eventImage} source={EVENT_DATES[2].image } />
                <View style={styles.eventTextView}>
                  <Text style={styles.eventNameHeader}>{EVENT_DATES[2].eventName}</Text>
                  <Text style={styles.eventDescription}>{EVENT_DATES[2].description}</Text>
                </View>
              </View>
            </Pressable>
            <Pressable onPress={()=>{router.push({
              pathname: "/events",
              params: {
                event_index: 3
              }
            })}}>
              <View style={styles.eventView}>
                <Image style={styles.eventImage} source={EVENT_DATES[3].image } />
                <View style={styles.eventTextView}>
                  <Text style={styles.eventNameHeader}>{EVENT_DATES[3].eventName}</Text>
                  <Text style={styles.eventDescription}>{EVENT_DATES[3].description}</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.teamInfoView}>
          <Text style={styles.teamTextIntro}>
            We are a <Link href="https://www.firstinspires.org/programs/ftc/" style={{ color: "orange" }}>FIRST Tech Challenge</Link> Team based in <Link href="https://maps.app.goo.gl/xj5RwziAvQtdPPwz5" style={{ color: "orange" }}>Windsor</Link>, Connecticut
          </Text>
          <View style={styles.teamSponsorView}>
            <Text style={styles.sponsorHeaderText}>
              Sponsored By
            </Text>
            <FlatList
              data={SPONSOR_IMAGE_LIST}
              renderItem={({item})=><Image source={item} resizeMode='contain' style={{width:125, height: 85}}/>}
              horizontal={true}
              ItemSeparatorComponent={<View style={{width: 25, height: 10}}></View>}
              contentContainerStyle={{marginTop:10, width: width-100, height: 90}}
            />
          </View>
        </View>

        

      </ScrollView>
    );
  }

  return isMobile ? <MobileHome /> : <DesktopHome />;
}



