const Line = require('./Line');

const { inspect } = require('util');

class Lyrics {

	constructor(text, singalong) {
		this.text = text;
		this.lines = singalong
			? singalong
				.map(line => line.milliseconds
					? { line: line.line, milliseconds: parseInt(line.milliseconds), duration: parseInt(line.duration) }
					: line)
				.map((line, idx, arr) => {
					console.log({ line });
					if (line.milliseconds) return new Line(line);
					if (!line.milliseconds && idx === 0) return new Line({ milliseconds: 0, duration: 0, line: line.line });
					return new Line({ milliseconds: arr[idx - 1].milliseconds + arr[idx - 1].duration, duration: 0, line: line.line });
				})
			: [];
	}

	toString() {
		return this.text;
	}

	valueOf() {
		return this.text;
	}

	[inspect.custom](_, options) {
		return inspect(this.text, options);
	}

}

module.exports = Lyrics;
