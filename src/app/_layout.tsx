import { View, StyleSheet, Dimensions } from "react-native";
import { Lato_100Thin_Italic, Lato_300Light, Lato_300Light_Italic, Lato_400Regular, Lato_700Bold, useFonts } from '@expo-google-fonts/lato';
import * as SplashScreen from 'expo-splash-screen';
import { Slot } from "expo-router"; 
import { useColorScheme } from 'react-native';
import { useEffect } from "react";

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import NavBar from '@/components/nav-bar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_300Light,
    Lato_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NavBar /> 
      
      
      <View style={styles.content}>
        <Slot /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, 
  }
});
