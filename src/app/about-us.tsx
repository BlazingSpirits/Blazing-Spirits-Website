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
    const ourHistorySlides = [
      {
        textColor: "orange",
        text: "Innovation.",
        image: require("website_130/assets/images/our-history-1.png"),
        description: ""
      },
      {
        textColor: "blue",
        text: "Initiative.",
        image: require("website_130/assets/images/our-history-2.png"),
        description: ""
      },
      {
        textColor: "white",
        text: "Inspiration.",
        image: require("website_130/assets/images/our-history-3.png"),
        description: ""
      },
    ];

    const ourRobotSlides = [
      {
        textColor: "orange",
        text: "Innovation.",
        image: require("website_130/assets/images/our-robot-2024.png"),
        description: ""
      },
      {
        textColor: "blue",
        text: "Initiative.",
        image: require("website_130/assets/images/our-robot-2025.png"),
        description: ""
      },
      {
        textColor: "white",
        text: "Inspiration.",
        image: require("website_130/assets/images/our-robot-2026.png"),
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
    //This is a comment
    const [buttonIndex, setButtonIndex] = useState(0);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const transitionDelay = 3000;

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
              duration: 1500,
              useNativeDriver: true
            }),
            Animated.timing(nextImageOpacity, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true
            }),
          ])
        ]),
      ]).start(() => {
        // Switch the image
        setCurrentImageIndex(prev => (prev + 1) % ourHistorySlides.length);
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
                <Animated.Image source={ourHistorySlides[(currentImageIndex+1)%3].image } style={[{width: 550, height: 250}, { opacity: nextImageOpacity }]} resizeMode='cover'/>
                <Animated.Image source={ourHistorySlides[currentImageIndex].image } style={[{width: 550, height: 250,  position: "absolute"}, { opacity: currentImageOpacity }]} resizeMode='cover'/>
              </View>
              <Text style={{ width: 425, fontFamily: "Lato_400Regular", fontSize: 18 }}>Our FIRST Tech Challenge journey started in 2005 before all current members of this team were born. We were originally a part of the Loomis Chaffee School called Blazing Paranormals. In 2016, we separated from them and became The Blazing Spirits. As a community team, we accept anyone from the New England region.</Text>
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
                <Animated.Image source={ourRobotSlides[(currentImageIndex+1)%3].image} style={[{width: 550, height: 250}, { opacity: nextImageOpacity }]} resizeMode='cover'/>
                <Animated.Image source={ourRobotSlides[currentImageIndex].image} style={[{width: 550, height: 250, position: "absolute"}, { opacity: currentImageOpacity }]} resizeMode='cover'/>
              </View>
              <Text style={{ width: 425, fontFamily: "Lato_400Regular", fontSize: 18 }}>Every year, our team is tasked with to complete a certain set of tasks using our robot. However, each year has vastly different objectives, whether it's depositing samples or launching artifacts. This leads to unique robot designs and fabrications every year, allowing students to improve their problem-solving skills.</Text>
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
            data={TEAM_LIST[buttonIndex].flat()}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{width: 800}}
            numColumns={3}
            ItemSeparatorComponent={<View style={{ height: 50}}></View>}
            renderItem={({ item }) => (
              <ProfileIcon key={item.id} {...item}/>
            )}
          />
        </View>

      </ScrollView>
    );
  }

  function MobileAboutUs(){
    const ourHistorySlides = [
      {
        textColor: "orange",
        text: "Innovation.",
        image: require("website_130/assets/images/our-history-1.png"),
        description: ""
      },
      {
        textColor: "blue",
        text: "Initiative.",
        image: require("website_130/assets/images/our-history-2.png"),
        description: ""
      },
      {
        textColor: "white",
        text: "Inspiration.",
        image: require("website_130/assets/images/our-history-3.png"),
        description: ""
      },
    ];

    const ourRobotSlides = [
      {
        textColor: "orange",
        text: "Innovation.",
        image: require("website_130/assets/images/our-robot-2024.png"),
        description: ""
      },
      {
        textColor: "blue",
        text: "Initiative.",
        image: require("website_130/assets/images/our-robot-2025.png"),
        description: ""
      },
      {
        textColor: "white",
        text: "Inspiration.",
        image: require("website_130/assets/images/our-robot-2026.png"),
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
      setCurrentImageIndex(prev => (prev + 1) % ourHistorySlides.length);
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
                  <Animated.Image source={ourHistorySlides[(currentImageIndex+1)%3].image } style={[{width: 175, height: 125}, { opacity: nextImageOpacity }]} />
                  <Animated.Image source={ourHistorySlides[currentImageIndex].image } style={[{width: 175, height: 125, position: "absolute"}, { opacity: currentImageOpacity }]} />
                </View>
                <View style={{ width: 175, height: 50, flexDirection: "row", justifyContent: "space-evenly", alignItems: 'center'}}>
                  <View style={[styles.circle, { backgroundColor: colorList[0] }]}></View>
                  <View style={[styles.circle, { backgroundColor: colorList[1] }]}></View>
                  <View style={[styles.circle, { backgroundColor: colorList[2] }]}></View>
                </View>
              </View>
              <Text style={{ width: 185, fontFamily: 'Lato_400Regular' }}>Our FIRST Tech Challenge journey started in 2005 before all current members of this team were born. We were originally a part of the Loomis Chaffee School called Blazing Paranormals. In 2016, we separated from them and became The Blazing Spirits. As a community team, we accept anyone from the New England region.</Text>
          </View>
        </View>

        <View style={[styles.largeContentView, { marginTop: 50 }]}>
          <Text style={{ fontSize: 25, fontFamily: "Lato_700Bold" }}>Our History</Text>
          <View style={styles.contextView}>
              <View>
                <View style={{ width: 175, height: 125, backgroundColor: "grey" }}>
                  <Animated.Image source={ourRobotSlides[(currentImageIndex+1)%3].image } style={[{width: 175, height: 125}, { opacity: nextImageOpacity }]} />
                  <Animated.Image source={ourRobotSlides[currentImageIndex].image } style={[{width: 175, height: 125, position: "absolute"}, { opacity: currentImageOpacity }]} resizeMode='cover'/>
                </View>
                <View style={{ width: 175, height: 50, flexDirection: "row", justifyContent: "space-evenly", alignItems: 'center'}}>
                  <View style={[styles.circle, { backgroundColor: colorList[0] }]}></View>
                  <View style={[styles.circle, { backgroundColor: colorList[1] }]}></View>
                  <View style={[styles.circle, { backgroundColor: colorList[2] }]}></View>
                </View>
              </View>
              <Text style={{ width: 185, fontFamily: 'Lato_400Regular' }}>Every year, our team is tasked with to complete a certain set of tasks using our robot. However, each year has vastly different objectives, whether it's depositing samples or launching artifacts. This leads to unique robot designs and fabrications every year, allowing students to improve their problem-solving skills.</Text>
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


