import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getWeatherForecast, WeatherForecast } from '../services/WeatherService';

interface WeatherForecastComponentProps {
	testID?: string;
}

const WeatherForecastComponent: React.FC<WeatherForecastComponentProps> = ({ testID }) => {
  const [weather, setWeather] = useState<WeatherForecast | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherForecast();
      setWeather(data);
    };

    fetchWeather();
  }, []);

  if (!weather) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.title} testID={`${testID}-title`}>Tomorrow's Weather</Text>
      <Text style={styles.summary} testID={`${testID}-summary`}>{weather.summary}</Text>
      <Text style={styles.temperature} testID={`${testID}-temp`}>Temperature: {weather.temperatureC}°C / {weather.temperatureF}°F</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summary: {
    fontSize: 18,
    marginBottom: 5,
  },
  temperature: {
    fontSize: 16,
  },
});

export default WeatherForecastComponent;
