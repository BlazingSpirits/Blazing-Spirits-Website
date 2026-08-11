import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet, View, Text } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { EVENT_DATES, MARKED_DATES } from '../../config';
import { useState, useEffect } from 'react';
import { JumpingTransition } from 'react-native-reanimated';
import { WebView } from 'react-native-webview';
import useResponsive from '@/hooks/useResponsive';
import { useLocalSearchParams } from 'expo-router';
import { useWindowDimensions } from "react-native";
import { router } from 'expo-router';

export default function Events() {
  
  const {isMobile} = useResponsive();
  

  function DesktopEvents(){
    const {width, height} = useWindowDimensions();
    const isoDateString = new Date().toISOString().split('T')[0];
    const [currentMonth, setCurrentMonth] = useState(isoDateString);
    const [eventDetailsHeight, setEventDetailsHeight] = useState(375 + 0.25 * (height-601));
    const eventDetailsWidth =  425 + 0.5 * (width-1272)
    const calendarWidth = 700 + 0.5 * (width - 1272);
    const calendarHeight = 375 + 0.25 * (height - 601);
    const eventFont = 15 + (width-1272)/200;

    const { event_index } = useLocalSearchParams();
    const [urlEventIndex, setUrlEventIndex] = useState(Array.isArray(event_index)
      ? Number(event_index[0])
      : event_index
        ? Number(event_index)
        : null);
    

    const checkDates = (day: string) => {
      const index = EVENT_DATES.findIndex(
        event => event.dateString === day
      );
      

      if (index !== -1) {
        setUrlEventIndex(index);

        if (EVENT_DATES[index].signupNeeded) {
          setEventDetailsHeight(450 + 0.25 * (height-601));
        } else {
          setEventDetailsHeight(375 + 0.25 * (height-601))
        }
      } else {
        setUrlEventIndex(null);
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
                height: calendarHeight,
                width: calendarWidth,
              }}
              current={currentMonth}

              onMonthChange={month => {
                setCurrentMonth(month.dateString);
              }}

              onDayPress={day => {
                console.log('selected day', day);
                checkDates(day.dateString);
              }}
              // Mark specific dates as marked
              markedDates={MARKED_DATES}
            />
            {urlEventIndex !== null && urlEventIndex !== undefined ? (
              <View style={{ flexDirection: "column", width: eventDetailsWidth, height: eventDetailsHeight, justifyContent: "center" }}>
                <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between", height: eventDetailsHeight-40 }}>
                  <Text style={styles.eventNameHeader}>{EVENT_DATES[urlEventIndex].eventName}</Text>
                  <Image style={{ backgroundColor: "grey", width: 425 + 0.25 * (width-1272), height: 225 + 0.125 * (height-601) }} />
                  <Text style={{fontSize: eventFont, fontFamily:"Lato_400Regular", textAlign: "center"}}>{EVENT_DATES[urlEventIndex].description} ({EVENT_DATES[urlEventIndex].dateDisplay} • {EVENT_DATES[urlEventIndex].time})</Text>
                </View>
                {EVENT_DATES[urlEventIndex].signupNeeded ? (
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
              <View style={{ justifyContent: "center", alignItems: "center", width: eventDetailsWidth, height: eventDetailsHeight }}>
                <Text style={{fontSize: 20, fontFamily:"Lato_400Regular"}}>
                  Select a date to view an event
                </Text>
              </View>
            )}
            
          </View>

        </ScrollView>

      </View>
    );

  }


function MobileEvents() {
  const isoDateString = new Date().toISOString().split('T')[0];

  const [currentMonth, setCurrentMonth] = useState(isoDateString);
  const [eventDetailsHeight, setEventDetailsHeight] = useState(375);

  const { event_index } = useLocalSearchParams();

  const [urlEventIndex, setUrlEventIndex] = useState(
    Array.isArray(event_index)
      ? Number(event_index[0])
      : event_index
        ? Number(event_index)
        : null
  );

  const checkDates = (day: string) => {
    const index = EVENT_DATES.findIndex(
      event => event.dateString === day
    );

    if (index !== -1) {
      setUrlEventIndex(index);

      if (EVENT_DATES[index].signupNeeded) {
        setEventDetailsHeight(375);
      } else {
        setEventDetailsHeight(375);
      }
    } else {
      setUrlEventIndex(null);
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
        <View
          style={{
            marginTop: 25,
            justifyContent: "space-between",
            height: 750,
            alignItems: "center",
          }}
        >
          <Calendar
            style={{
              borderWidth: 1,
              borderColor: "gray",
              height: 375,
              width: 375,
            }}

            current={currentMonth}

            onMonthChange={month => {
              setCurrentMonth(month.dateString);
            }}

            onDayPress={day => {
              console.log("selected day", day);
              checkDates(day.dateString);
            }}

            markedDates={MARKED_DATES}
          />

          {urlEventIndex !== null && urlEventIndex !== undefined ? (
            <View
              style={{
                flexDirection: "column",
                width: 350,
                height: eventDetailsHeight,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 300,
                }}
              >
                <Text style={styles.eventNameHeader}>
                  {EVENT_DATES[urlEventIndex].eventName}
                </Text>

                <Image
                  style={{
                    backgroundColor: "grey",
                    width: 250,
                    height: 150,
                  }}
                />

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Lato_400Regular",
                  }}
                >
                  {EVENT_DATES[urlEventIndex].description} (
                  {EVENT_DATES[urlEventIndex].dateDisplay} •{" "}
                  {EVENT_DATES[urlEventIndex].time})
                </Text>
              </View>

              {EVENT_DATES[urlEventIndex].signupNeeded ? (
                <View
                  style={{
                    flexDirection: "row",
                    width: 150,
                    height: 30,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                >
                  <Pressable onPress={() => {}}>
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
                      <Text style={{ fontSize: 18 }}>
                        Event Sign Up
                      </Text>
                    </View>
                  </Pressable>
                </View>
              ) : (
                <View />
              )}
            </View>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 350,
                height: 350,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Lato_400Regular",
                }}
              >
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


