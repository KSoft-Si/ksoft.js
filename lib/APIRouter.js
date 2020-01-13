const centra = require('@aero/centra');
const { join } = require('path').posix;
const { noop, reflectors, methods } = require('./util');

const url = 'https://api.ksoft.si';

function buildRoute(token) {
	const route = [];
	let method = 'get';
	const handler = {
		get(target, prop) {
			if (reflectors.includes(prop)) return () => route.join('/');
			if (methods.includes(prop)) {
				method = prop;
				return new Proxy(noop, handler);
			}
			route.push(prop);
			return new Proxy(noop, handler);
		},

		apply(target, _, args) {
			const req = centra(url, method.toUpperCase())
				.header('Authorization', `Bearer ${token}`)
				.path(join(...route));
			if (method === 'get' && args.length) req.query(args[0]);
			if (method !== 'get' && args.length) req.body(args[0], args[1] ? 'form' : null);
			return req.send()
				.then(res => res.json);
		}
	}
	return new Proxy(noop, handler);
}

module.exports = buildRoute;