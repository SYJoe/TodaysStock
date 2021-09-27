import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import openWeatherApi from '../api/OpenWeatherApi';
import Constants from 'expo-constants';
import _get from 'lodash.get';
import { LinearGradient } from "expo-linear-gradient";
import sise from "./Sise"

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
	var currentValue, preValue;
  }

  componentDidMount() {
	  var check_current, check_pre = 0;
    this.setState({ isLoading: true });
    sise.CurrentValue.then(info => {
        console.log(info);
        currentValue = info;
		check_current = 1;
      });
	  sise.PreValue.then(info => {
        console.log(info);
		  preValue = info;
		check_pre = 1;
      });
	  if(check_pre && check_current)
		  {
        this.setState({isLoading: false});
		  }
  }

	renderCurrentValue() {
		return (
      <View style = {styles.container_temp}>
        <Text style={styles.text_temp}>{currentValue}</Text>
      </View>
    	);
	}
	
	renderPreValue() {
		return (
      <View style = {styles.container_temp}>
        <Text style={styles.text_temp}>{currentValue}</Text>
      </View>
    	);
	}
	
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <LinearGradient
          colors={["#00C6FB", "#005BEA"]}
          style = {styles.container}
       >
        <View style = {styles.container_mid}>
          <View>
            {this.renderCurrentValue()}
          </View>
          <View>
            {this.renderPreValue()}
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight,
  },

  conditionContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  text_temp: {
    fontSize: 90,
    justifyContent: 'flex-end',
    alignItems: "flex-start",
    color: "white",
  },
  text_temp1: {
    fontSize: 30,
    color: "white",
  },
  container_temp: {
    flex: 1,
    flexDirection: 'row',
  },

  container_mid: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  container_today: {
    flexDirection: 'column',
    padding: 10,
  },
  text_day: {
    fontSize: 20,
    color: "white",
  },

  container_wind: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },

  container_location: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 3,
  },
  text_location: {
    fontSize: 25,
    color: "white",
  },

  text_wind: {
    fontSize: 30,
    color: "white",
  },
  text_wind1: {
    fontSize: 20,
    color: "white",
  },

  mapContainer: {
    flex: 2,
  },
  mapImage: {
    aspectRatio: 1.5,
    width: "100%",
  },
});