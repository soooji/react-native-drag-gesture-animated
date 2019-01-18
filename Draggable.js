// By Sajad Beheshti
import React from 'react';
import { StyleSheet,View,Easing,Animated,PanResponder,Dimensions,Text} from 'react-native';
const {width,height} = Dimensions.get('window');
export default class App extends React.Component {
    _bopacity = new Animated.Value(0.4);
  _left = new Animated.Value(Math.floor(width/2)-75);
  _top = new Animated.Value(Math.floor(height/2)-75);
  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
    },
    onPanResponderMove: (evt, gestureState) => {
            this._left.setValue(gestureState.moveX-75);
            this._top.setValue(gestureState.moveY-75);
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
        if(((gestureState.moveY-75) >= height - 190 ) && ((gestureState.moveX-75) >= 100) && ((gestureState.moveX-75) <= (width - 200))) {
            Animated.timing(this._top, {toValue: height-200,duration: 250,useNativeDriver: false,easing: Easing.elastic(1.2)}).start();
            Animated.timing(this._bopacity, {toValue: 0.8,duration: 200,useNativeDriver: false}).start();
        }else {
            Animated.timing(this._top, {toValue: Math.floor(height/2)-75,duration: 250,useNativeDriver: false,easing: Easing.elastic(1.2)}).start();
            Animated.timing(this._bopacity, {toValue: 0.4,duration: 200,useNativeDriver: false}).start();
        }
        Animated.timing(this._left, {toValue: Math.floor(width/2)-75,duration: 250,useNativeDriver: false,easing:Easing.elastic(1.2)}).start();
    },
    onPanResponderTerminate: (evt, gestureState) => {
    },
  });
  render() {
    return (
      <View style={styles.cont}>
        <Animated.View style={[styles.box,{top:this._top,left:this._left}]} {...this._panResponder.panHandlers}>
        </Animated.View>
        <Animated.View style={[styles.bar,{opacity: this._bopacity}]}>
            <Text style={styles.text}>
                Drag here
            </Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    text: {
        width: '100%',
        textAlign: 'center',
        color: 'black',
        fontSize: 25,
        top: 60
    },
    bar: {
        left: 100,
        right: 100,
        height: 210,
        borderTopLeftRadius:100,
        borderTopRightRadius:100,
        position:'absolute',
        bottom: 0,
        backgroundColor:'white'
    },
    box: {
        position: 'absolute',
        zIndex: 11111,
        width: 150,
        height: 150,
        borderRadius: 135,
        backgroundColor:'white'
  },
  cont: {
    backgroundColor: '#1B77F1',
    width:'100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }
});