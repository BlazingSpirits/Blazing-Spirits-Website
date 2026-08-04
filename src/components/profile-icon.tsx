import { View, Text, Image} from "react-native";
import { StyleSheet, Animated, Pressable} from "react-native";
import { useRef } from "react";

export interface ProfileIconProps {
    id: number;
    name: string;
    isMentor: boolean;
    duration: number;
    role: string;
    note?: string;
    source?: string;
}

const iconMargins = [
    0, 50, 0
]

export const ProfileIcon: React.FC<ProfileIconProps> = ({
  id,
  name,
  isMentor,
  duration,
  role,
  note,
  source,
}) => {
    const AnimatedPressable =
        Animated.createAnimatedComponent(Pressable);

    
    const styles = StyleSheet.create({
        cardView:{
            backgroundColor: "#c4c4c4",
            width:200,
            height:300,
            justifyContent: "space-between",
            alignItems: "center",
        },
        photoView:{
            width: 200,
            height: 250,
            justifyContent: "center",
            alignItems: "center",
        },
        descriptionView:{
            width: 200,
            height:40,
            alignItems: "center"
        },
    })

    const opacity = useRef(new Animated.Value(0)).current;

    const fadeInAnimation = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    const fadeOutAnimation = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    const fadeIn = () => {
        if(note){
            fadeInAnimation();
        }
    }

    const fadeOut = () => {
        if(note){
            fadeOutAnimation();
        }
    }

    const durationPhrase = () => {
        if(isMentor){
            return duration !== 1 ? duration + " years" : duration + "year"
        }else{
            if(duration % 10 === 1){
                return duration+"st year"
            }else if(duration % 10 === 2){
                return duration+"nd year"
            }else if(duration % 10 === 3){
                return duration+"rd year"
            }else{
                return duration+"th year"
            }
        }
    }

    return(
        
        <View style={[styles.cardView]}>
            <View style={styles.photoView}>
                <Image source={{uri: source !== null ? source : source}} />
                <AnimatedPressable style={[StyleSheet.absoluteFill, {backgroundColor: "#3d3d3de7", opacity: opacity, justifyContent: "center", alignItems: "center",}]} onHoverIn={() =>fadeIn()} onHoverOut={()=>fadeOut()}>
                    <Animated.Text style={{fontSize: 15, color: "white", opacity: opacity}}>{note}</Animated.Text>
                </AnimatedPressable>
                
            </View>
            <View style={styles.descriptionView}>
                <Text style={{fontSize: 15}}>{name}</Text>
                <Text style={{fontSize: 12}}>{role} • {durationPhrase()}</Text>
            </View>
        </View>
    );
}