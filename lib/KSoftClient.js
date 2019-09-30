const { EventEmitter } = require('events');
const APIRouter = require('./APIRouter');
const { readdirSync } = require('fs');
const { join } = require('path');
const { reflectors } = require('./util');

class KSoftClient extends EventEmitter {
	constructor(token) {
		super();

		this.token = token;
		this.endpoints = {};
		this.init();

		const handler = {
			get(target, name) {
				if (target.endpoints.hasOwnProperty(name)) return target.endpoints[name];
				return target[name];
			}
		}

		return new Proxy(this, handler);
	}

	get api() {
		return APIRouter(this.token);
	}

	init() {
		const baseDir = join(process.cwd(), 'src', 'endpoints');
		for (const path of readdirSync(baseDir)) {
			this.endpoints[path] = {};
			for (const endpoint of readdirSync(join(baseDir, path))) {
				const Endpoint = require(join(baseDir, path, endpoint));
				const point = new Endpoint(this);
				this.endpoints[path][endpoint.replace('.js', '')] = point._run.bind(point);
			}
		}
	}
}

module.exports = KSoftClient;