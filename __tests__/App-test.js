/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
{/*selectable Button*/}
           {/* <View>
           <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('Order2')}
             background={TouchableNativeFeedback.SelectableBackground()}
           >
           <View style={styles.touchable}>
             <Text style={{color:'#000', fontSize:wp('4%'), fontWeight:'500'}}>9:00 am to 10:00 am</Text>
           </View>
           </TouchableNativeFeedback>
           </View> */}