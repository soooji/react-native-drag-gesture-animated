# react-native-drag-gesture-animated
This project includes some animated components using **PanResponder** functions, **Animated** and **Easing**.
# Demo :
 ![alt tag](preview-anime.gif)
- [x] Drag and drop ball (App.js)
- [x] Slider with lots of customize props (Slider.js)
### Install Slider :
```
npm i react-native-sooji-slider --save
```
### You can import Slider and set your own customize props to slider like below :
```
import Slide from './Slide';
```
```
<Slide
    minNeededMove={45} //current doesn't change slider by this amount of movement

    allSlidersCustomStyle={{opacity: 1}} // custom slider for the patent of all sliders, which is as long as sum of all widhts of slides
    wrapperCustomStyle={{opacity: 1}} // custom style for wrapper (background of slider)
    sliderCustomStyle={{opacity: 1}} // custom style for slides

    easing={Easing.elastic(1)} // for custom easing you should import Easing from React

    slideWidth={width - 100}
    slideBorderRadius={13}
    slideHeight={193}
    slideBackgroundColor={'white'}

    wrapperHeight={220}
    wrapperWidth={width - 50}
    wrapperBackgroundColor='rgba(255,255,255,.3)'
    wrapperBorderRadius={15}
>
        <View></View>
        <View></View>
        <View></View>
</Slide>
```
You can add your slides as children of Slide component. For example in the top instance we have three slides.
In addition you can edit default props in Slider.js.
I will handle customization of these features in the next version :
- [X] custom animation Easing
- [X] custom slide item for children
- [X] custom style for wrapper, box of all sliders and slider
- [ ] margin between between slides
- [ ] seperate the components
- [ ] create package and npmjs link

Tell me your requests and problems : soojibht@gmail.com