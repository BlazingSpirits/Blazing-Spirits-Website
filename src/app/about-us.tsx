import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Animated, Pressable, ScrollView, StyleSheet, View, Text, FlatList } from 'react-native';
import React, { useEffect, useState, useRef, use } from "react";
import { TEAM_LIST } from '../../config';
import { ProfileIcon } from '@/components/profile-icon';
import useResponsive from '@/hooks/useResponsive';
export default function AboutUs() {
  const {isMobile} = useResponsive();

  function DesktopAboutUs(){
    const slides = [
      {
        textColor: "orange",
        text: "Innovation.",
        image: "https://yt3.googleusercontent.com/bMktDT_cgZ2uq8huFiODYs1PXm9vmRBriOS3RMR4aHzuI14CdxrH0EvsDVnepNU3MkhR__wPBQ=s900-c-k-c0x00ffffff-no-rj",
        description: ""
      },
      {
        textColor: "blue",
        text: "Initiative.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRZmgtC_iRIpDJd0ruSeILRcPdftmUuGW1BHJNTvMcZxRnMr9tIiTIAHw&s=10",
        description: ""
      },
      {
        textColor: "white",
        text: "Inspiration.",
        image: "https://scontent-lga3-3.xx.fbcdn.net/v/t39.30808-6/702215295_1315125140765970_4747046272501456966_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1032&ctp=s2048x1032&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hCsZzZycK4kQ7kNvwG9yLT0&_nc_oc=AdpHnZZKsi3OzJd7ujfwizN21JDDNUrQ1Nfdry_hBFWXFZKAvx4SWQ5JqQcD_FIYIng&_nc_zt=23&_nc_ht=scontent-lga3-3.xx&_nc_gid=G4FFgvR4UFMI9J-wR0WcyA&_nc_ss=7b2a8&oh=00_AQBQ4xWYh31oT0qgggpJlEJ0eBgdHGSPDcycYlQ7YT2nkQ&oe=6A558D66",
        description: ""
      },
    ];

    const buttonColorSets = [
      {
        leftColor: "#ffb731",
        rightColor: "#c4c4c4"
      },
      {
        leftColor: "#c4c4c4",
        rightColor: "#3564ff"
      }
    ]

    const [buttonIndex, setButtonIndex] = useState(0);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const transitionDelay = 15000;

    const [colorList, setColorList] = useState<string[]>(["orange", "grey", "grey"]);
    const [currentCircleIndex, setCircleIndex] = useState(0);

    const currentImageOpacity = useRef(new Animated.Value(1)).current;
    const nextImageOpacity = useRef(new Animated.Value(0)).current;

    const fadeTransition = () => {
      Animated.sequence([
        Animated.delay(transitionDelay),
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
      ]).start(() => {
        // Switch the image
        setCurrentImageIndex(prev => (prev + 1) % slides.length);
        updateCircleColorList();

        // Reset for the next transition
        currentImageOpacity.setValue(1);
        nextImageOpacity.setValue(0);
        // Repeat
        fadeTransition();
      });
    };

    useEffect(() => {
      fadeTransition();
    }, []);

    const updateCircleColorList = () => {
      setCircleIndex(prev => {
        const next = (prev + 1) % 3;

        setColorList([
          next === 0 ? "orange" : "grey",
          next === 1 ? "orange" : "grey",
          next === 2 ? "orange" : "grey",
        ]);

        return next;
      });
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      largeContentView: {
        height: 375,
        width: 1000,
        marginTop: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between"
      },
      contextView: {
        height: 310,
        width: 1000,
        justifyContent: "space-between",
      },
      miniSlideshowView: {
        width: 1000,
        height: 250,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      circle: {
        width: 25,
        height: 25,
        borderRadius: 50 / 2,
      },
      teamView: {
        marginTop: 100,
        width: 1000,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between"
      },
    });
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 25 }} style={styles.container}>
        <View style={styles.largeContentView}>
          <Text style={{ fontSize: 35, fontFamily: "Lato_700Bold", alignSelf: "flex-start"}}>Our History</Text>
          <View style={styles.contextView}>
            <View style={styles.miniSlideshowView}>
              <View style={{ width: 550, height: 250, backgroundColor: "grey" }}>
                <Animated.Image source={{ uri: slides[2].image }} style={[StyleSheet.absoluteFill, { opacity: nextImageOpacity }]} />
                <Animated.Image source={{ uri: slides[2].image }} style={[StyleSheet.absoluteFill, { opacity: currentImageOpacity }]} />
              </View>
              <Text style={{ width: 425, fontFamily: "Lato_400Regular", fontSize: 18 }}>Our FIRST Tech Challenge journey started in 2007 (Before every member currently on our team was born). We were initially a part of the Loomis Chaffee School, but later separated into our own FTC team</Text>
            </View>
            <View style={{ width: 550, height: 50, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', paddingHorizontal: 50 }}>
              <View style={[styles.circle, { backgroundColor: colorList[0] }]}></View>
              <View style={[styles.circle, { backgroundColor: colorList[1] }]}></View>
              <View style={[styles.circle, { backgroundColor: colorList[2] }]}></View>
            </View>
          </View>
        </View>

        <View style={[styles.largeContentView, { marginTop: 50 }]}>
          <Text style={{ fontSize: 35, fontFamily: "Lato_700Bold", alignSelf: "flex-start" }}>Our Robot</Text>
          <View style={styles.contextView}>
            <View style={styles.miniSlideshowView}>
              <View style={{ width: 550, height: 250, backgroundColor: "grey" }}>
                <Animated.Image source={{ uri: slides[2].image }} style={[StyleSheet.absoluteFill, { opacity: nextImageOpacity }]} />
                <Animated.Image source={{ uri: slides[2].image }} style={[StyleSheet.absoluteFill, { opacity: currentImageOpacity }]} />
              </View>
              <Text style={{ width: 425, fontFamily: "Lato_400Regular", fontSize: 18 }}>Our FIRST Tech Challenge journey started in 2007 (Before every member currently on our team was born). We were initially a part of the Loomis Chaffee School, but later separated into our own FTC team</Text>
            </View>
            <View style={{ width: 550, height: 50, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', paddingHorizontal: 50 }}>
              <View style={[styles.circle, { backgroundColor: colorList[0] }]}></View>
              <View style={[styles.circle, { backgroundColor: colorList[1] }]}></View>
              <View style={[styles.circle, { backgroundColor: colorList[2] }]}></View>
            </View>
          </View>
        </View>

        <View style={styles.teamView}>
          <Text style={{ fontSize: 35, fontFamily: "Lato_700Bold" }}>
            Our Team
          </Text>
          <View /* Button*/
            style={{
              flexDirection: "row",
              width: 200,
              height: 50,
              borderRadius: 5,
              marginVertical: 25,
            }}
          >
            <Pressable onPress={() => { setButtonIndex(0) }}>
              <View
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: buttonColorSets[buttonIndex].leftColor,
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              >
                <Text style={{fontFamily: "Lato_400Regular"}}>Members</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => { setButtonIndex(1) }}>
              <View
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: buttonColorSets[buttonIndex].rightColor,
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              >
                <Text style={{fontFamily: "Lato_400Regular"}}>Mentors</Text>
              </View>
            </Pressable>
          </View>


          <FlatList
            data={TEAM_LIST[buttonIndex]}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  width: 800,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 50
                }}
              >
                {item.map((profile) => (
                  <ProfileIcon key={profile.id} {...profile} />
                ))}
              </View>
            )}
          />
        </View>

      </ScrollView>
    );
  }

  function MobileAboutUs(){
    const slides = [
    {
      textColor: "orange",
      text: "Innovation.",
      image: "https://yt3.googleusercontent.com/bMktDT_cgZ2uq8huFiODYs1PXm9vmRBriOS3RMR4aHzuI14CdxrH0EvsDVnepNU3MkhR__wPBQ=s900-c-k-c0x00ffffff-no-rj",
      description: ""
    },
    {
      textColor: "blue",
      text: "Initiative.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRZmgtC_iRIpDJd0ruSeILRcPdftmUuGW1BHJNTvMcZxRnMr9tIiTIAHw&s=10",
      description: ""
    },
    {
      textColor: "white",
      text: "Inspiration.",
      image: "https://scontent-lga3-3.xx.fbcdn.net/v/t39.30808-6/702215295_1315125140765970_4747046272501456966_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1032&ctp=s2048x1032&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hCsZzZycK4kQ7kNvwG9yLT0&_nc_oc=AdpHnZZKsi3OzJd7ujfwizN21JDDNUrQ1Nfdry_hBFWXFZKAvx4SWQ5JqQcD_FIYIng&_nc_zt=23&_nc_ht=scontent-lga3-3.xx&_nc_gid=G4FFgvR4UFMI9J-wR0WcyA&_nc_ss=7b2a8&oh=00_AQBQ4xWYh31oT0qgggpJlEJ0eBgdHGSPDcycYlQ7YT2nkQ&oe=6A558D66",
      description: ""
    },
  ];

  const buttonColorSets = [
    {
      leftColor: "orange",
      rightColor: "grey"
    },
    {
      leftColor: "grey",
      rightColor: "orange"
    }
  ]

  const [buttonIndex, setButtonIndex] = useState(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const transitionDelay = 15000; 

  const [colorList, setColorList] = useState<string[]>(["orange", "grey", "grey"]);
  const [currentCircleIndex, setCircleIndex] = useState(0);

  const currentImageOpacity = useRef(new Animated.Value(1)).current;
  const nextImageOpacity = useRef(new Animated.Value(0)).current;

  const fadeTransition = () => {
    Animated.sequence([
      Animated.delay(transitionDelay),
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
    ]).start(() => {
      // Switch the image
      setCurrentImageIndex(prev => (prev + 1) % slides.length);
      updateCircleColorList();
      
      // Reset for the next transition
      currentImageOpacity.setValue(1);
      nextImageOpacity.setValue(0);
      // Repeat
      fadeTransition();
    });
  };

  useEffect(() => {
    fadeTransition();
  }, []);

  const updateCircleColorList = () => {
    setCircleIndex(prev => {
      const next = (prev + 1) % 3;

      setColorList([
        next === 0 ? "orange" : "grey",
        next === 1 ? "orange" : "grey",
        next === 2 ? "orange" : "grey",
      ]);

      return next;
    });
  };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      largeContentView: {
        height: 215,
        width: 375,
        marginTop: 10,
        alignSelf: "center",
        justifyContent: "space-between"
      },
      contextView: {
        width: 375,
        height: 175,
        flexDirection: "row",
        justifyContent: "space-between",
      },
      miniSlideshowView: {
        width: 375,
        height: 175,
        flexDirection: "row",
        justifyContent: "space-between",
      },
      circle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
      },
      teamView: {
        marginTop: 50,
        width: 375,
        alignSelf: "center",
        justifyContent: "space-between"
      },
    });
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 25 }} style={styles.container}>
        <View style={styles.largeContentView}>
          <Text style={{ fontSize: 25, fontFamily: "Lato_700Bold" }}>Our History</Text>
          <View style={styles.contextView}>
              <View>
                <View style={{ width: 175, height: 125, backgroundColor: "grey" }}>
                  <Animated.Image source={{ uri: slides[2].image }} style={[StyleSheet.absoluteFill, { opacity: nextImageOpacity }]} />
                  <Animated.Image source={{ uri: slides[2].image }} style={[StyleSheet.absoluteFill, { opacity: currentImageOpacity }]} />
                </View>
                <View style={{ width: 175, height: 50, flexDirection: "row", justifyContent: "space-evenly", alignItems: 'center'}}>
                  <View style={[styles.circle, { backgroundColor: colorList[0] }]}></View>
                  <View style={[styles.circle, { backgroundColor: colorList[1] }]}></View>
                  <View style={[styles.circle, { backgroundColor: colorList[2] }]}></View>
                </View>
              </View>
              <Text style={{ width: 185, fontFamily: 'Lato_400Regular' }}>Info coming soon</Text>
          </View>
        </View>

        <View style={[styles.largeContentView, { marginTop: 50 }]}>
          <Text style={{ fontSize: 25, fontFamily: "Lato_700Bold" }}>Our History</Text>
          <View style={styles.contextView}>
              <View>
                <View style={{ width: 175, height: 125, backgroundColor: "grey" }}>
                  <Animated.Image source={{ uri: slides[2].image }} style={[StyleSheet.absoluteFill, { opacity: nextImageOpacity }]} />
                  <Animated.Image source={{ uri: slides[2].image }} style={[StyleSheet.absoluteFill, { opacity: currentImageOpacity }]} />
                </View>
                <View style={{ width: 175, height: 50, flexDirection: "row", justifyContent: "space-evenly", alignItems: 'center'}}>
                  <View style={[styles.circle, { backgroundColor: colorList[0] }]}></View>
                  <View style={[styles.circle, { backgroundColor: colorList[1] }]}></View>
                  <View style={[styles.circle, { backgroundColor: colorList[2] }]}></View>
                </View>
              </View>
              <Text style={{ width: 185, fontFamily: 'Lato_400Regular' }}>Info coming soon</Text>
          </View>
        </View>

        

        <View style={styles.teamView}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 340, marginBottom:25 }}>
            <Text style={{ fontSize: 25, fontFamily: "Lato_700Bold" }}>
              Our Team
            </Text>
            <View /* Button*/
              style={{
                flexDirection: "row",
                width: 200,
                height: 50,
                borderRadius: 5,
              }}
            >
              <Pressable onPress={() => { setButtonIndex(0) }}>
                <View
                  style={{
                    width: 100,
                    height: 50,
                    backgroundColor: buttonColorSets[buttonIndex].leftColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                >
                  <Text style={{fontFamily: 'Lato_400Regular'}}>Members</Text>
                </View>
              </Pressable>

              <Pressable onPress={() => { setButtonIndex(1) }}>
                <View
                  style={{
                    width: 100,
                    height: 50,
                    backgroundColor: buttonColorSets[buttonIndex].rightColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                >
                  <Text style={{fontFamily: 'Lato_400Regular'}}>Mentors</Text>
                </View>
              </Pressable>
            </View>


          </View>


          <FlatList
            data={TEAM_LIST[buttonIndex].flat()}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <ProfileIcon key={item.name} {...item} />
              
            )}
            contentContainerStyle={{paddingBottom: 25}}
            ItemSeparatorComponent={<View style={{width: 50}}></View>}
            horizontal={true}
          />
        </View>

      </ScrollView>
    );
  }


  return isMobile ? <MobileAboutUs /> : <DesktopAboutUs />;

}


