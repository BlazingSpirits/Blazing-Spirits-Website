import * as Device from 'expo-device';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, FlatList, ImageBackground, ScrollView, Animated, Easing } from "react-native";
import { useWindowDimensions } from "react-native";
import React, { useEffect, useState, useRef, use } from "react";
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import { withDelay } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { EVENT_DATES, IMAGE_LIST } from '../../config';
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
        image: "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/486645231_986508076961013_2841876963283168895_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1366&ctp=s2048x1366&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_39xAR6fRZwQ7kNvwEF5l4S&_nc_oc=AdqvmL1PvFzb_rfgfZb9LJWsVvjXZ8lva1G0Yd-0oANTt4_0lz_6nEaKG1m96CTc5cY&_nc_zt=23&_nc_ht=scontent-lga3-1.xx&_nc_gid=sgCN63bpo3PqoUgLkS0hYw&_nc_ss=7b2a8&oh=00_AQD8phZmrMaVTsiDUC8wT-J7zZ5K34vCKdgV_PRWPFDvtA&oe=6A55ABD8"
      },
      {
        textColor: "blue",
        text: "Initiative.",
        image: "https://scontent-lga3-3.xx.fbcdn.net/v/t39.30808-6/548207750_1116500543961765_2786141985300593860_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1536&ctp=s2048x1536&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=PQoRO41KWrkQ7kNvwHq2kIf&_nc_oc=AdpV1YpVqFF0OvDJpzQBL2UVTnJSuUqLE3j4LiU9fbSTmID3ZzwO6PB8s1OeG-T09r8&_nc_zt=23&_nc_ht=scontent-lga3-3.xx&_nc_gid=m2C8m0Zq4nhW-KiP1u7vGg&_nc_ss=7b2a8&oh=00_AQBNhcBrkKJJbRFKbN1Il4DdyLJMGWlSn1Fe4E2DGWB7TA&oe=6A5595D1"
      },
      {
        textColor: "white",
        text: "Inspiration.",
        image: "https://scontent-lga3-3.xx.fbcdn.net/v/t39.30808-6/702215295_1315125140765970_4747046272501456966_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1032&ctp=s2048x1032&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hCsZzZycK4kQ7kNvwG9yLT0&_nc_oc=AdpHnZZKsi3OzJd7ujfwizN21JDDNUrQ1Nfdry_hBFWXFZKAvx4SWQ5JqQcD_FIYIng&_nc_zt=23&_nc_ht=scontent-lga3-3.xx&_nc_gid=G4FFgvR4UFMI9J-wR0WcyA&_nc_ss=7b2a8&oh=00_AQBQ4xWYh31oT0qgggpJlEJ0eBgdHGSPDcycYlQ7YT2nkQ&oe=6A558D66"
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
        marginTop: 25,
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
        backgroundColor: "green",
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
      <View style={{ backgroundColor: "grey", flexDirection: "row", alignItems: "center", width: width, height: height-70}}>
        <Animated.Image source={{uri: slides[(currentImageIndex + 1) % 3].image}} style={[StyleSheet.absoluteFill, { opacity: nextImageOpacity}]} />
        <Animated.Image source={{uri: slides[currentImageIndex].image}} style={[StyleSheet.absoluteFill, { opacity: currentImageOpacity}]} />
        <View style={[StyleSheet.absoluteFill, {backgroundColor: "rgba(0, 0, 0, 0.15)"}]}></View>
        <Text style={[styles.slideshowText]}>Sparking</Text>
        <Animated.Text style={[{ transform: [{ translateX: textXTranslate }], opacity: textOpacity}, styles.slideshowText, {marginLeft: 10, color: slides[currentTextIndex].textColor}]}>{slides[currentTextIndex].text}</Animated.Text>
      </View>

      <View style={styles.teamInfoView}>
        <Text style={styles.teamTextIntro}>
          We are a <Link href="https://www.firstinspires.org/programs/ftc/" style={{color: "orange"}}>FIRST Tech Challenge</Link> Team based in <Link href="https://maps.app.goo.gl/xj5RwziAvQtdPPwz5" style={{color: "orange"}}>Windsor</Link>, Connecticut
        </Text>
        <View style={styles.teamSponsorView}>
          <Text style={styles.sponsorHeaderText}>
            Sponsored Byes 
          </Text>
          <Image source={{uri: slides[1].image}} style={styles.sponsorImage}/>
        </View>
      </View>

      <View style={styles.upcomingEventsView}>
        <Text style={styles.upcomingEventsHeader}> Upcoming Events</Text>
        <View style={styles.eventsHolderView}>
          <Pressable onPress={()=>{router.push({
              pathname: "/events",
              params: {
                event_index: 0
              }
            })}}>
            <View style={styles.eventView}>
                <Image style={styles.eventImage} source={{ uri: slides[0].image }} />
                <View style={styles.eventTextView}>
                  <Text style={styles.eventNameHeader}>{EVENT_DATES[0].eventName}</Text>
                  <Text style={styles.eventDescription}>{EVENT_DATES[0].description}</Text>
                </View>
            </View>
          </Pressable>
          <Pressable onPress={()=>{router.push({
              pathname: "/events",
              params: {
                event_index: 1
              }
            })}}>
          <View style={styles.eventView}>
            <Image style={styles.eventImage} source={{uri: slides[0].image}}/>
            <View style={styles.eventTextView}>
              <Text style={styles.eventNameHeader}>{EVENT_DATES[1].eventName}</Text>
              <Text style={styles.eventDescription}>{EVENT_DATES[1].description}</Text>
            </View>
          </View>
          </Pressable>
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
        image: "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/486645231_986508076961013_2841876963283168895_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1366&ctp=s2048x1366&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_39xAR6fRZwQ7kNvwEF5l4S&_nc_oc=AdqvmL1PvFzb_rfgfZb9LJWsVvjXZ8lva1G0Yd-0oANTt4_0lz_6nEaKG1m96CTc5cY&_nc_zt=23&_nc_ht=scontent-lga3-1.xx&_nc_gid=sgCN63bpo3PqoUgLkS0hYw&_nc_ss=7b2a8&oh=00_AQD8phZmrMaVTsiDUC8wT-J7zZ5K34vCKdgV_PRWPFDvtA&oe=6A55ABD8"
      },
      {
        textColor: "blue",
        text: "Initiative.",
        image: "https://scontent-lga3-3.xx.fbcdn.net/v/t39.30808-6/548207750_1116500543961765_2786141985300593860_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1536&ctp=s2048x1536&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=PQoRO41KWrkQ7kNvwHq2kIf&_nc_oc=AdpV1YpVqFF0OvDJpzQBL2UVTnJSuUqLE3j4LiU9fbSTmID3ZzwO6PB8s1OeG-T09r8&_nc_zt=23&_nc_ht=scontent-lga3-3.xx&_nc_gid=m2C8m0Zq4nhW-KiP1u7vGg&_nc_ss=7b2a8&oh=00_AQBNhcBrkKJJbRFKbN1Il4DdyLJMGWlSn1Fe4E2DGWB7TA&oe=6A5595D1"
      },
      {
        textColor: "white",
        text: "Inspiration.",
        image: "https://scontent-lga3-3.xx.fbcdn.net/v/t39.30808-6/702215295_1315125140765970_4747046272501456966_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1032&ctp=s2048x1032&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hCsZzZycK4kQ7kNvwG9yLT0&_nc_oc=AdpHnZZKsi3OzJd7ujfwizN21JDDNUrQ1Nfdry_hBFWXFZKAvx4SWQ5JqQcD_FIYIng&_nc_zt=23&_nc_ht=scontent-lga3-3.xx&_nc_gid=G4FFgvR4UFMI9J-wR0WcyA&_nc_ss=7b2a8&oh=00_AQBQ4xWYh31oT0qgggpJlEJ0eBgdHGSPDcycYlQ7YT2nkQ&oe=6A558D66"
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
          <Animated.Image source={{ uri: slides[(currentImageIndex + 1) % 3].image }} style={[StyleSheet.absoluteFill, { opacity: nextImageOpacity }]} />
          <Animated.Image source={{ uri: slides[currentImageIndex].image }} style={[StyleSheet.absoluteFill, { opacity: currentImageOpacity }]} />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0, 0, 0, 0.15)" }]}></View>
          <Text style={[styles.slideshowText]}>Sparking</Text>
          <Animated.Text style={[{ transform: [{ translateX: textXTranslate }], opacity: textOpacity }, styles.slideshowText, { marginLeft: 5, color: slides[currentTextIndex].textColor }]}>{slides[currentTextIndex].text}</Animated.Text>
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
              data={IMAGE_LIST}
              renderItem={({item})=><Image source={{uri:item}} style={{width:125, height: 85}}/>}
              horizontal={true}
              ItemSeparatorComponent={<View style={{width: 25, height: 10}}></View>}
              contentContainerStyle={{marginTop:10, width: width-100, height: 90}}
            />
          </View>
        </View>

        <View style={styles.upcomingEventsView}>
          <Text style={styles.upcomingEventsHeader}> Upcoming Events</Text>
          <View style={styles.eventsHolderView}>
            <Pressable onPress={()=>{router.push({
              pathname: "/events",
              params: {
                event_index: 0
              }
            })}}>
              <View style={styles.eventView}>
                <Image style={styles.eventImage} source={{ uri: slides[0].image }} />
                <View style={styles.eventTextView}>
                  <Text style={styles.eventNameHeader}>{EVENT_DATES[0].eventName}</Text>
                  <Text style={styles.eventDescription}>{EVENT_DATES[0].description}</Text>
                </View>
              </View>
            </Pressable>
            <Pressable onPress={()=>{router.push({
              pathname: "/events",
              params: {
                event_index: 1
              }
            })}}>
              <View style={styles.eventView}>
                <Image style={styles.eventImage} source={{ uri: slides[0].image }} />
                <View style={styles.eventTextView}>
                  <Text style={styles.eventNameHeader}>{EVENT_DATES[1].eventName}</Text>
                  <Text style={styles.eventDescription}>{EVENT_DATES[1].description}</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    );
  }

  return isMobile ? <MobileHome /> : <DesktopHome />;
}



