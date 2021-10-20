import React from 'react';
import {
    SafeAreaView,
    Text,
    Image,
    View,
    StyleSheet,
    StatusBar,
    Platform,
    Animated,
    TouchableOpacity
} from "react-native";
import {COLORS, FONTS, SIZES, images} from '../../constants'
import {
    useFonts,
    AdventPro_400Regular,
    AdventPro_500Medium,
    AdventPro_600SemiBold
} from '@expo-google-fonts/advent-pro'

const onBoardings = [
    {
        title: "Let's Travelling",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: images.onboarding1
    },
    {
        title: "Navigation",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: images.onboarding2
    },
    {
        title: "Destination",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: images.onboarding3
    }
];

const OnBoarding = () => {
    
    let [fontsLoaded] = useFonts ({
        AdventPro_400Regular,
        AdventPro_500Medium,
        AdventPro_600SemiBold
    })
    const scrollX = new Animated.Value(0)
    const [completed, setCompleted] = React.useState(false)
    // check if user has finished scrolling all pages
    React.useEffect(() => {
        scrollX.addListener(({ value }) => {
            if(Math.floor(value / SIZES.width) === onBoardings.length - 1) {
                setCompleted(true)
            }
        })
        return () => scrollX.removeListener();
    })



    
    function renderContent() {
        return (

            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } },
                ], { useNativeDriver: false })}
            >
                {onBoardings.map((item, index) => (
                    <View 
                        key={index}
                        style={{
                            width: SIZES.width,
                        }}
                    >
                        {/* images */}
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image 
                                source={item.img}
                                resizeMode= "cover"
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                        </View>
                        {/* text */}
                        <View style={{ position: 'absolute', bottom: '5%', left: 40,right: 40}}>
                            <Text style={{ ...FONTS.h1, color: COLORS.gray, textAlign: 'center'}}>{item.title}</Text>
                            <Text style={{ ...FONTS.body3, textAlign: 'center', color: COLORS.gray, marginTop: SIZES.base}}>{item.description}</Text>
                        </View>
                        {/* buttons*/}
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                justifyContent: 'center',
                                paddingLeft: 20,
                                width: 120,
                                height: 40,
                                borderTopLeftRadius: 30,
                                borderBottomLeftRadius: 30,
                                backgroundColor: COLORS.blue,
                            }}
                        >
                            <Text style={{ ...FONTS.h1, color: COLORS.white}}>{completed ? "Let's Go": "Skip"}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Animated.ScrollView>
        )
    }

    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width)
        return (
            <View style={styles.dotContainer}>
                {onBoardings.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    });

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base, 17, SIZES.base],
                        extrapolate: "clamp"
                    });
                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, {width: dotSize, height: dotSize}]}
                        />
                    )
                })}
            </View>
            
        )
    }

    if (!fontsLoaded) {
        return null
    }else{

        return(
            <SafeAreaView style={styles.container}>
                <View>{renderContent()}</View>
                <View style={ styles.dotsRootContainer}>{renderDots()}</View>
            </SafeAreaView>
        )
    }
}
 const styles = StyleSheet.create({
     container:{
         flex:  1 ,
         backgroundColor: COLORS.white,
         alignItems: 'center',
         justifyContent: 'center',
         paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
     },
     dotsRootContainer:{
         position: 'absolute',
         bottom: SIZES.height > 700 ? '30%' : '25%'
     },
     dotContainer:{
         flexDirection: 'row',
         height: SIZES.padding,
         justifyContent: 'center',
         alignItems: 'center'
     },
     dot:{
         borderRadius: SIZES.radius,
         backgroundColor: COLORS.blue,
         marginHorizontal: SIZES.radius /2
     }
 })
export default OnBoarding;