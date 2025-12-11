export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f2fcf2',
					100: '#e1f8e1',
					200: '#c3eec3',
					300: '#95dd95',
					400: '#5fc35f',
					500: '#39a339',
					600: '#298229', // 기본 버튼 등
					700: '#236723',
					800: '#205220',
					900: '#1b431b',
				},
				background: '#f8f5f0',
				surface: '#ffffff',
			},
			fontFamily: {
				sans: ['Pretendard', 'sans-serif'],
			},
			borderRadius: {
				'2xl': '1rem',
				'3xl': '1.5rem',
				'4xl': '2rem',
			}
		},
	},
	plugins: [],
}