import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const images = [
      'https://placeimg.com/640/640/nature',
      'https://placeimg.com/640/640/people',
      'https://placeimg.com/640/640/animals',
      'https://placeimg.com/640/640/beer',
    ];

const ImageSlider1 = (props) => {
    return (
        <View style={styles.sliderContainer}>
           <ImageSlider
          loopBothSides
          autoPlayWithInterval={3000}
          images={images}
          customSlide={({ index, item, style, width }) => (
            // It's important to put style here because it's got offset inside
            <View key={index} style={[style, styles.customSlide]}>
              <Image 
                           resizeMode={'cover'}
                           source={require('../assets/images/Banner.jpg')} style={styles.customImage} />
            </View>
          )}
          // customButtons={(position, move) => (
          //   <View style={styles.buttons}>
          //     {images.map((image, index) => {
          //       return (
          //         <TouchableHighlight
          //           key={index}
          //           underlayColor="#ccc"
          //           onPress={() => move(index)}
          //           style={styles.button}
          //         >
          //           <Text style={position === index && styles.buttonSelected}>
          //             {index + 1}
          //           </Text>
          //         </TouchableHighlight>
          //       );
          //     })}
          //   </View>
          // )}
        />
           </View>  
    );
  };
  
  const styles = {
    customImage:{
      width:wp('100%'),
      height:hp('25%'),
       overflow:'hidden',
        padding: 0,
    },
    customSlide:{
     width:wp('100%'),
     height:hp('25%')
    },
  };
  
  export { ImageSlider1 };
  