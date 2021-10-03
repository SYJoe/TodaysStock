import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
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
	  
        currentValue = sise.currentValue;
		check_current = 1;
	  
		  preValue = sise.preValue;
		check_pre = 1;
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
        <Text style={styles.text_temp}>{preValue}</Text>
      </View>
    	);
	}
	
	renderWeatherIcon() {
		if(currentValue - preValue > 0)
		{
			return (
        	<View>
          		<Image source={{
            		uri: `http://http://openweathermap.org/img/wn/01d@4x.png`,
            		width: 180,
            		height: 180,
          		}} />
        	</View>
			);
		}
		else if(currentValue - preValue < 0)
		{
			return (
        	<View>
          		<Image source={{
            		uri: `http://http://openweathermap.org/img/wn/09d@4x.png`,
            		width: 180,
            		height: 180,
          		}} />
        	</View>
			);
		}
		else
		{
			return (
        	<View>
          		<Image source={{
            		uri: `http://http://openweathermap.org/img/wn/03d@4x.png`,
            		width: 180,
            		height: 180,
          		}} />
        	</View>
			);
		}
	}
	
	renderGradient() {
		if(currentValue - preValue > 0)
		{
			return (
        	<LinearGradient
          colors={["#00C6FB", "#005BEA"]}
          style = {styles.container}/>
			);
		}
		else if(currentValue - preValue < 0)
		{
			return (
        	<LinearGradient
          colors={["#D7D2CC", "#304352"]}
          style = {styles.container}/>
			);
		}
		else
		{
			return (
        	<LinearGradient
          colors={["#F0F2F0", "#000C40"]}
          style = {styles.container}/>
			);
		}
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
      <View style={styles.container}>
          {this.renderGradient()}
		<View style={styles.conditionContainer}>
          {this.renderWeatherIcon()}
        </View>
        <View style = {styles.container_mid}>
          <View>
            {this.renderCurrentValue()}
          </View>
          <View>
            {this.renderPreValue()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
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