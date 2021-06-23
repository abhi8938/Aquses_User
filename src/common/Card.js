import React from 'react';
import { View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#fff',
    borderRadius: 3,
    borderBottomWidth: 0,
    shadowColor: '#F2F2F2',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: wp('1%'),
    marginRight: wp('1%'),
    marginBottom: wp('1.4%')
  }
};

export { Card };
