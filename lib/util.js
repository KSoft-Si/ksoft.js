module.exports = {

	methods: ['get', 'post', 'delete', 'patch', 'put'],
	reflectors: [
		'toString', 'toJSON', 'valueOf', 'inspect', 'constructor',
		Symbol.toPrimitive, Symbol.toStringTag, Symbol.for('util.inspect.custom')
	],
	noop: () => { }

}