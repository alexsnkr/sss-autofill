module.exports = {
	theme: {
		extend: {
			colors: {
				'main': '#F6F4FC',
				'sidebar': '#FAF9FA',

				'primary-text': '#474D72',
				'primary': {
					100: '#E6F2FF',
					200: '#C0DDFF',
					300: '#9AC9FE',
					400: '#4FA1FE',
					500: '#0378FD',
					600: '#036CE4',
					700: '#024898',
					800: '#013672',
					900: '#01244C',
				},
			},

			width: {
				28: '7rem',
				30: '7.5rem',
				36: '9rem',
				54: '13rem',
				60: '15rem',
				70: '21rem'
			},

			padding: {
				7: '1.9rem',
			},

			fontFamily: {
				'body': ['Roboto'],
			}
		}
	},
	variants: {},
	plugins: [
		require('tailwindcss-transitions')(),
	]
}