// By Sajad Beheshti
import React from 'react';
import { StyleSheet,View,Easing,Animated,PanResponder,Dimensions,Text} from 'react-native';
const {width,height} = Dimensions.get('window');
export default class App extends React.Component {
    _left = new Animated.Value(0);
    _preLeft = 0; // it holds the previous left value to come back that in some cases
    _startTap = 0;
    _detaX = 0;
    _panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            this._startTap = gestureState.moveX;
            this._preLeft = this._left._value;
            return true;
        },
        onPanResponderMove: (evt, gestureState) => {
            this._detaX = gestureState.moveX - this._startTap;
            this._left.setValue(this._preLeft + this._detaX);
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            let so =  this._preLeft+this._detaX;
            Animated.timing(this._left, {toValue: this._detaX > 0 ? so + 2*this._detaX : so+2*this._detaX,duration: 650,useNativeDriver: false}).start();
        },
        onPanResponderTerminate: (evt, gestureState) => {
        },
      });


  render() {
    const spin = this._left.interpolate({
        inputRange: [0, 200],
        outputRange: ['0deg', '360deg']
      })
    return (
      <View style={styles.cont}>
        <Animated.View style={{transform:[
            { rotate: spin }
        ],width:150,height:150,backgroundColor:'white',borderRadius: 15}}  {...this._panResponder.panHandlers}>

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