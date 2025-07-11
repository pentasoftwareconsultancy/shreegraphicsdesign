import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const IntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* SHREE GRAPHICS (Outline Text) */}
      <View style={styles.header}>
        <Svg height="125" width={width - 40}>
          <SvgText
            fill="transparent"
            stroke="#FF6F00"
            strokeWidth="0.7"
            fontSize="64"
            fontWeight="bold"
            fontFamily='poppins-bold'
            x="0"
            y="60"
          >
            SHREE
          </SvgText>
          <SvgText
            fill="transparent"
            stroke="#FF6F00"
            strokeWidth="0.7"
            fontSize="64"
            fontWeight="bold"
            fontFamily='poppins-bold'
            x="0"
            y="120"
          >
            GRAPHICS
          </SvgText>
        </Svg>

        {/* Intro Image */}
        <Image
          source={require('../../assets/images/intro.png')}
          style={styles.introImage}
          resizeMode="contain"
        />
      </View>

      {/* Description */}
      <View style={styles.descriptionBox}>
        <Text style={styles.subHeading}>Best Quality Products</Text>
        <Text style={styles.bullet}>• Custom Designs.</Text>
        <Text style={styles.bullet}>• Premium Quality.</Text>
        <Text style={styles.bullet}>• Delivered to Your Door.</Text>
      </View>

      {/* Tagline */}
      <Text style={styles.tagline}>We Print{'\n'}What You Want!</Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('home')}
      >
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>

      {/* Wave Background */}
      <Image
        source={require('../../assets/images/wave.png')}
        style={styles.wave}
        resizeMode="cover"
      />
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    top:10,
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  introImage: {
    top: 30,
    width: 240,
    height: 240,
    right: 200,
  },
  descriptionBox: {
    marginTop: -50,
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
    
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily:'poppins-bold',
    color: '#111',
    marginBottom: 5,
  },
  bullet: {
    fontSize: 13,
    fontFamily:'poppins-light-italic',
    color: '#666',
    lineHeight: 20,
  },
  tagline: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily:'poppins-bold',
    textAlign: 'left',
    marginTop: 30,
    color: '#000',
  },
  button: {
    marginTop: 20,
    alignSelf: 'flex-start',
    backgroundColor: '#FF6F00',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 35,
    zIndex: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily:'poppins-bold',
  },
  wave: {
    position: 'absolute',
    bottom: -10,
    width: width,
    height: height * 0.5,
    zIndex: 0,
  },
});
