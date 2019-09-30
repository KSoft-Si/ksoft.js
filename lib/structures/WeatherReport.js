const Location = require('./Location');

class WeatherReport {
	constructor({ icon_url: icon, summary, temperature, uvIndex, humidity, pressure, precipProbability, location }) {
		this.location = new Location(location.lat, location.lon, location.address);
		this.icon = icon;
		this.summary = summary;
		this.temperature = temperature;
		this.uvIndex = uvIndex;
		this.humidity = humidity;
		this.pressure = pressure;
		this.precipProbability = precipProbability;
	}
}

module.exports = WeatherReport;