import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet, View, Text } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { EVENT_DATES, MARKED_DATES } from '../../config';
import { useState } from 'react';
import { JumpingTransition } from 'react-native-reanimated';
import { WebView } from 'react-native-webview';
import useResponsive from '@/hooks/useResponsive';

export default function Events() {
  const {isMobile} = useResponsive();

  function DesktopEvents(){
    const isoDateString = new Date().toISOString().split('T')[0];
    const [eventDatesIndex, setEventDateIndex] = useState<number | null>(null);
    const [eventDetailsHeight, setEventDetailsHeight] = useState(375);

    const checkDates = (day: string) => {
      const index = EVENT_DATES.findIndex(
        event => event.dateString === day
      );

      if (index !== -1) {
        setEventDateIndex(index);
        if (EVENT_DATES[index].signupNeeded) {
          setEventDetailsHeight(450);
        } else {
          setEventDetailsHeight(375)
        }
      } else {
        setEventDateIndex(null);
      }
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      eventNameHeader: {
        fontSize: 25,
        fontFamily: "Lato_700Bold",
      },
    });

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flexDirection: "row", paddingHorizontal: 25, marginTop: 75, justifyContent: "space-between" }}>
            <Calendar
              // Customize the appearance of the calendar
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 375,
                width: 700,
              }}
              // Specify the current date
              current={isoDateString}
              // Callback that gets called when the user selects a day
              onDayPress={day => {
                console.log('selected day', day);
                checkDates(day.dateString);
              }}
              // Mark specific dates as marked
              markedDates={MARKED_DATES}
            />
            {eventDatesIndex !== null ? (
              <View style={{ flexDirection: "column", width: 425, height: eventDetailsHeight, justifyContent: "center" }}>
                <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between", height: 350 }}>
                  <Text style={styles.eventNameHeader}>{EVENT_DATES[eventDatesIndex].eventName}</Text>
                  <Image style={{ backgroundColor: "grey", width: 425, height: 225 }} />
                  <Text>{EVENT_DATES[eventDatesIndex].description} ({EVENT_DATES[eventDatesIndex].time})</Text>
                </View>
                {EVENT_DATES[eventDatesIndex].signupNeeded ? (
                  <View /* Button*/
                    style={{
                      flexDirection: "row",
                      width: 200,
                      height: 30,
                      borderRadius: 5,
                      marginVertical: 25,
                    }}
                  >
                    <Pressable onPress={() => { }}>
                      <View
                        style={{
                          width: 200,
                          height: 50,
                          backgroundColor: "grey",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ fontSize: 25 }}>Event Sign Up</Text>
                      </View>
                    </Pressable>
                  </View>
                ) : (
                  <View></View>
                )}

              </View>
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center", width: 425, height: 350 }}>
                <Text>
                  Select a date to view an event
                </Text>
              </View>
            )}
          </View>

        </ScrollView>

      </View>
    );

  }

  function MobileEvents(){
    const isoDateString = new Date().toISOString().split('T')[0];
    const [eventDatesIndex, setEventDateIndex] = useState<number | null>(null);
    const [eventDetailsHeight, setEventDetailsHeight] = useState(375);

    const checkDates = (day: string) => {
      const index = EVENT_DATES.findIndex(
        event => event.dateString === day
      );

      if (index !== -1) {
        setEventDateIndex(index);
        if (EVENT_DATES[index].signupNeeded) {
          setEventDetailsHeight(375);
        } else {
          setEventDetailsHeight(375)
        }
      } else {
        setEventDateIndex(null);
      }
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      eventNameHeader: {
        fontSize: 25,
        fontFamily: "Lato_700Bold",
      },
    });

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{marginTop: 25, justifyContent: "space-between", height: 750, alignItems: "center" }}>
            <Calendar
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 375,
                width: 375,
              }}
              current={isoDateString}
              onDayPress={day => {
                checkDates(day.dateString);
              }}
              // Mark specific dates as marked
              markedDates={MARKED_DATES}
            />
            {eventDatesIndex !== null ? (
              <View style={{ flexDirection: "column", width: 350, height: eventDetailsHeight, justifyContent: "center" }}>
                <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between", height: 300 }}>
                  <Text style={styles.eventNameHeader}>{EVENT_DATES[eventDatesIndex].eventName}</Text>
                  <Image style={{ backgroundColor: "grey", width: 250, height: 150 }} />
                  <Text>{EVENT_DATES[eventDatesIndex].description} ({EVENT_DATES[eventDatesIndex].time})</Text>
                </View>
                {EVENT_DATES[eventDatesIndex].signupNeeded ? (
                  <View /* Button*/
                    style={{
                      flexDirection: "row",
                      width: 150,
                      height: 30,
                      borderRadius: 5,
                      marginTop: 10
                    }}
                  >
                    <Pressable onPress={() => { }}>
                      <View
                        style={{
                          width: 150,
                          height: 30,
                          backgroundColor: "grey",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ fontSize: 18 }}>Event Sign Up</Text>
                      </View>
                    </Pressable>
                  </View>
                ) : (
                  <View></View>
                )}

              </View>
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center", width: 425, height: 350 }}>
                <Text>
                  Select a date to view an event
                </Text>
              </View>
            )}
          </View>

        </ScrollView>

      </View>
    );

  }



  return isMobile ? <MobileEvents/> : <DesktopEvents/>;
 
}


