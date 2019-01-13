
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Navigator, Route } from './Navigator';

const Screen1 = ({ navigator }) => (
  <View style={[styles.screen, { backgroundColor: '#59C9A5' }]}>
    
  </View>
);

const Screen2 = ({ navigator }) => (
  <View style={[styles.screen, { backgroundColor: '#23395B' }]}>
    <Button
      title="Screen 3"
      onPress={() => navigator.push('Screen3')}
    />
    <Button
      title="Pop"
      onPress={() => navigator.pop()}
    />
  </View>
);

const Screen3 = ({ navigator }) => (
  <View style={[styles.screen, { backgroundColor: '#B9E3C6' }]}>
    <Button
      title="Pop"
      onPress={() => navigator.pop()}
    />
  </View>
);

export default class App extends React.Component {
  // _animatedValue = new Animated.Value(0);
  render() {
    return (
      <View style={{ backgroundColor: '#59C9A5',width:'100%',height: '100%'}}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// <Navigator>
        // {/* <Route name="Screen1" component={Screen1} /> */}
        // {/* <Route name="Screen2" component={Screen2} /> */}
        // {/* <Route name="Screen3" component={Screen3} /> */}
      // {/* </Navigator> */}