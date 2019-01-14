// By Sajad Beheshti
import React from 'react';
import { StyleSheet,Easing,Animated,PanResponder,Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
export default class SJSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 1,
            totalSlides: 3,

            minNeededMove : this.props.minNeededMove ? this.props.minNeededMove : 45,
            marginBetweenSlides: this.props.marginBetweenSlides ? this.props.marginBetweenSlides : 10,

            slideWidth: this.props.slideWidth ? this.props.slideWidth : width - 50,
            slideBorderRadius: this.props.slideBorderRadius ? this.props.slideBorderRadius : 15,
            slideHeight: this.props.slideHeight ? this.props.slideHeight : 250,
            slideBackgroundColor: this.props.slideBackgroundColor ? this.props.slideBackgroundColor : 'rgba(255,255,255,0)',

            wrapperHeight: this.props.wrapperHeight ? this.props.wrapperHeight : 300,
            wrapperWidth: this.props.wrapperWidth ? this.props.wrapperWidth : width,
            wrapperBackgroundColor: this.props.wrapperBackgroundColor ? this.props.wrapperBackgroundColor : 'rgba(255,255,255,0)',
            wrapperBorderRadius: this.props.wrapperBorderRadius ? this.props.wrapperBorderRadius : 0,
        }
    }
  _left = new Animated.Value(0); // current left value of wrapper
  _startTap = 0; // start tap X value to compute dx and to check it's a drag or it's a tap
  _preLeft = 0; // it holds the previous left value to come back that in some cases
  _detaX = 0; // amount of changing the position of finger :)
  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
        this._startTap = gestureState.moveX;
        this._preLeft = this._left._value;
        return true;
    },
    onPanResponderMove: (evt, gestureState) => {
        this._detaX = gestureState.moveX - this._startTap;
        if(this._detaX != 0) {
            this._left.setValue(this._preLeft + this._detaX);
        } else {
            return false;
        }
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
            if(this._detaX > 0 && this._detaX > this.state.minNeededMove) {
                Animated.timing(this._left, {toValue: this.state.currentSlide != 1 ? this._preLeft+(this.state.slideWidth - this.state.marginBetweenSlides + 15) : 0,duration: 350,useNativeDriver: false,easing:Easing.elastic(1)}).start();
                if(this.state.currentSlide != 1) {
                    this.setState({currentSlide: this.state.currentSlide - 1})
                }
            } else if(this._detaX < -this.state.minNeededMove) {
                Animated.timing(this._left, {toValue: this.state.currentSlide != this.state.totalSlides ? this._preLeft-(this.state.slideWidth - this.state.marginBetweenSlides + 15)  : this._preLeft,duration: 350,useNativeDriver: false,easing:Easing.elastic(1)}).start();
                if(this.state.currentSlide != this.state.totalSlides) {
                    this.setState({currentSlide: this.state.currentSlide + 1})
                }
            } else {
                Animated.timing(this._left, {toValue:this._preLeft,duration: 350,useNativeDriver: false,easing:Easing.elastic(1)}).start();
            }
    },
    onPanResponderTerminate: (evt, gestureState) => {
        this._preLeft = this._left._value;
        this._startTap = 0; // reset the value of start tap
    },
  });
  render() {
      let {slideWidth,marginBetweenSlides,slideHeight,slideBackgroundColor,slideBorderRadius,wrapperHeight,wrapperWidth,wrapperBackgroundColor,wrapperBorderRadius} = this.state;
      let slideStyle = {
        width:slideWidth,
        backgroundColor: slideBackgroundColor,
        height: slideHeight,
        borderRadius: slideBorderRadius,
        marginLeft:marginBetweenSlides,marginRight:marginBetweenSlides
      }
      let wrapperStyle = {
        width: wrapperWidth,
        height:wrapperHeight,
        backgroundColor: wrapperBackgroundColor,
        borderRadius: wrapperBorderRadius
      }
    return (
      <Animated.View style={[styles.wrap,wrapperStyle]} {...this._panResponder.panHandlers}>
        <Animated.View style={[styles.allSlides,{left: this._left}]}>
            <Animated.View style={[slideStyle]}></Animated.View>
            <Animated.View style={[slideStyle]}></Animated.View>
            <Animated.View style={[slideStyle]}></Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
    allSlides: {
        position:'absolute',
        width: 'auto',
        height: '100%',
        overflow: 'hidden',
        flexDirection:'row',
        alignItems:'center'
    },
    wrap: {
        position:'relative',
        overflow: 'hidden',
    },
});

// if you wnat a scroll view with auto select current slider, change whole of onPanResponderRelease function with commented codes below :

// if(this._left._value > 0 || (this._left._value < 0 && this._left._value >= -(width - 100))) {
    // Animated.timing(this._left, {toValue: 0,duration: 250,useNativeDriver: false,easing:Easing.elastic(1.2)}).start();
// } else if(this._left._value < -(width - 100) && this._left._value >= -(2*width - 100)) {
    // Animated.timing(this._left, {toValue: - (width-60),duration: 250,useNativeDriver: false,easing:Easing.elastic(1.2)}).start();
// }