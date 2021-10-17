import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { LinearGradient } from "expo-linear-gradient";
import Sise from './Sise'
export default class MainScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true
		};
	}
	
	componentDidMount() {
    this.setState({ isLoading: true });
	Sise.fetchSise()
		.then(info => {
        console.log(info);
        this.setState({
          ...info,
          isLoading: false
        });
      });
	}

	
	renderCurrentValue() {
		return (
			<Text style={styles.text_temp}>{this.state}</Text>
		);
	}
	
	renderPreValue() {
		return (
			<Text style={styles.text_temp}>{pre_value}</Text>
    	);
	}
	
	renderWeatherIcon() {
		if(cur_value - pre_value > 0)
		{
			return (
          		<Image source={{
            		uri: `http://http://openweathermap.org/img/wn/01d@4x.png`,
            		width: 180,
            		height: 180,
          		}} />
			);
		}
		else if(cur_value - pre_value < 0)
		{
			return (
          		<Image source={{
            		uri: `http://http://openweathermap.org/img/wn/09d@4x.png`,
            		width: 180,
            		height: 180,
          		}} />
			);
		}
		else
		{
			return (
          		<Image source={{
            		uri: `http://http://openweathermap.org/img/wn/03d@4x.png`,
            		width: 180,
            		height: 180,
          		}} />
			);
		}
	}
	
	renderGradient() {
		if(cur_value - pre_value > 0)
		{
			return (
        	<LinearGradient
          colors={["#00C6FB", "#005BEA"]}
          style = {styles.container}/>
			);
		}
		else if(cur_value - pre_value < 0)
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
        <View>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
		<View style={styles.container}>
			<View style = {styles.container_mid}>
				<Text>{this.renderCurrentValue()}</Text>
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
    color: "black",
  },
	container_temp: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 90,
    justifyContent: 'flex-end',
    alignItems: "flex-start",
    color: "black"
  },
  container_mid: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  }
});