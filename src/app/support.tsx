
import useResponsive from '@/hooks/useResponsive';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet, View, Text, Image } from 'react-native';

export default function SupportUs() {
  const {isMobile} = useResponsive();
  function DesktopSupport() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      heroText: {
        alignSelf: "center",
        fontSize: 30,
        marginTop: 10,
        fontFamily: 'Lato_700Bold'
      },
      supportTypeView: {
        width: 1100,
        alignSelf: "center",
        marginTop: 25,
      },
    });

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 25 }}>
          <Text style={styles.heroText}>Support the Spirits!</Text>

          <View style={styles.supportTypeView}>
            <Text style={{ marginBottom: 10, fontSize: 25, fontFamily: 'Lato_700Bold' }}>
              Sponorships
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: 1100 }}>
              <Image style={{ width: 325, height: 200, backgroundColor: "#c4c4c4" }} />
              <View style={{ width: 750, justifyContent: "center" }}>
                <Text style={{ fontSize: 18, fontFamily: 'Lato_400Regular' }}>Becoming a sponsor helps not only with funding competitions. Through your support, we are also able to continue running events that support FIRST and the town of Windsor, and gain the expertise needed to become future professionals.</Text>
                <Pressable style={{ marginTop: 5 }}>
                  <View style={{ backgroundColor: "#c4c4c4", width: 175, justifyContent: "center", alignItems: "center", paddingVertical: 5 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato_400Regular' }}>Become a Sponsor!</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={[styles.supportTypeView, { marginTop: 50 }]}>
            <Text style={{ marginBottom: 10, fontSize: 25, fontFamily: 'Lato_700Bold' }}>
              Donations
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: 1100 }}>
              <Image style={{ width: 325, height: 200, backgroundColor: "#c4c4c4" }} />
              <View style={{ width: 750, justifyContent: "center" }}>
                <Text style={{ fontSize: 18, fontFamily: 'Lato_400Regular' }}>Individual donations help to keep our team functioning. As a community team, we are able to give students from around Connecticut and New England a chance to compete with us. So any donation that you can give will be very appreciated.</Text>
                <Pressable style={{ marginTop: 5 }}>
                  <View style={{ backgroundColor: "#c4c4c4", width: 140, justifyContent: "center", alignItems: "center", paddingVertical: 5 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato_400Regular' }}>Donate Today!</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  function MobileSupport(){
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      heroText: {
        alignSelf: "center",
        fontSize: 30,
        marginTop: 10,
        fontFamily: 'Lato_700Bold'
      },
      supportTypeView: {
        width: 350,
        alignSelf: "center",
        marginTop: 25,
      },
    });

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 25 }}>
          <Text style={styles.heroText}>Support the Spirits!</Text>

          <View style={styles.supportTypeView}>
            <Text style={{ marginBottom: 10, fontSize: 25, fontFamily: 'Lato_700Bold' }}>
              Sponorships
            </Text>
            <View style={{ flexDirection: "column", justifyContent: "space-between", width: 1100, height: 425 }}>
              <Image style={{ width: 325, height: 200, backgroundColor: "#c4c4c4" }} />
              <View style={{ width: 325, justifyContent: "center", }}>
                <Text style={{ fontSize: 18, fontFamily: 'Lato_400Regular' }}>Becoming a sponsor helps not only with funding competitions. Through your support, we are also able to continue running events that support FIRST and the town of Windsor, and gain the expertise needed to become future professionals.</Text>
                <Pressable style={{ marginTop: 5 }}>
                  <View style={{ backgroundColor: "#c4c4c4", width: 175, justifyContent: "center", alignItems: "center", paddingVertical: 5 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato_400Regular' }}>Become a Sponsor!</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.supportTypeView}>
            <Text style={{ marginBottom: 10, fontSize: 25, fontFamily: 'Lato_700Bold' }}>
              Donations
            </Text>
            <View style={{ flexDirection: "column", justifyContent: "space-between", width: 1100, height: 425 }}>
              <Image style={{ width: 325, height: 200, backgroundColor: "#c4c4c4" }} />
              <View style={{ width: 325, justifyContent: "center", }}>
                <Text style={{ fontSize: 18, fontFamily: 'Lato_400Regular' }}>Individual donations help to keep our team functioning. As a community team, we are able to give students from around Connecticut and New England a chance to compete with us. So any donation that you can give will be very appreciated.</Text>
                <Pressable style={{ marginTop: 5 }}>
                  <View style={{ backgroundColor: "#c4c4c4", width: 140, justifyContent: "center", alignItems: "center", paddingVertical: 5 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato_400Regular' }}>Donate Today!</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return isMobile ? <MobileSupport/> : <DesktopSupport/>
}


