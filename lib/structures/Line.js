class Line {

	constructor({ milliseconds, duration, line }) {
		this.timestamp = milliseconds;
		this.duration = duration;
		this.text = line;
	}

}

module.exports = Line;
