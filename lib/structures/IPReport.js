const Location = require('./Location');

class IPRecord {
	constructor({ city, country_name: country, latitude, longitude, apis }) {
		this.location = new Location(latitude, longitude, `${city}, ${country}`)
		this.map = apis.googlemaps;
	}
}

module.exports = IPRecord;