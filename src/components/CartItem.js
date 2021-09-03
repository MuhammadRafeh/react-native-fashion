import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import theme from '../constants/theme';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const CartItem = () => {

    const swipe = useSharedValue(0);

    const handleGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.translateX = swipe.value
        },
        onActive: (e, ctx) => {
            const currentDrag = ctx.translateX + e.translationX
            if (currentDrag > 0) {
                swipe.value = 0
                return
            } else if (currentDrag > -100) {
                swipe.value = currentDrag
            } else if (e.velocityX > -100) { //Here it's mean we are placing item back to its position
                // swipe.value = withTiming(0)
                swipe.value = withSpring(0, {velocity: e.velocityX})

            } else {
                swipe.value = withSpring(-100, {velocity: e.velocityX})
                return
            } 

        },
        onFinish: (e) => {
            console.log(e.velocityX)
            if (e.velocityX < -100){
                swipe.value = withSpring(-100, {velocity: e.velocityX })
            }
        }
    })

    const style = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: swipe.value }
            ]
        }
    })

    return (
        <View>
            <View style={{ position: 'absolute', bottom: 33, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', right: 20, height: 35 }}>
                <View style={{backgroundColor: 'rgb(223,44,44)', height: 25}}>

                    <Text>
                        <Ionicons name={'ios-heart-outline'} size={24} color={'white'}/>
                    </Text>
                </View>
            </View>
            <PanGestureHandler onGestureEvent={handleGestureEvent}>
                <Animated.View style={[styles.item, style]}>
                    <View style={{ flex: 1 }}>

                    </View>
                    <View style={{ flex: 3, paddingRight: 10, paddingLeft: 5, justifyContent: 'center' }}>
                        <View style={{ marginBottom: 6 }}>
                            <Text numberOfLines={1} style={{ fontSize: 15.5, fontWeight: 'bold', letterSpacing: -1 }}>
                                Veggie tomato mix asd asd a d a d asd a d s
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: theme.primary, fontWeight: 'bold', letterSpacing: -0.9 }}>
                                #1,900
                            </Text>
                        </View>
                        <View style={styles.counter}>
                            <Text style={{ color: 'white', paddingHorizontal: 8 }}>
                                -
                            </Text>
                            <Text style={{ color: 'white' }}>
                                1
                            </Text>
                            <Text style={{ color: 'white', paddingHorizontal: 8 }}>
                                +
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
}

export default CartItem;

const styles = StyleSheet.create({
    item: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 15,
        height: 85,
        marginVertical: 6
    },
    counter: {
        position: 'absolute',
        bottom: 12,
        right: 15,
        backgroundColor: theme.primary,
        height: 20,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})
