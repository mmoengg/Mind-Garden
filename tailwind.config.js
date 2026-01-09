export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
            backgroundImage: {
                'bg-main': "url('/bg-main.png')",
            },
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
				"bright-snow": {
					50: "#f4f2f0",
					100: "#eae6e1",
					200: "#d5ccc3",
					300: "#c0b3a5",
					400: "#aa9988",
					500: "#95806a",
					600: "#776655",
					700: "#5a4d3f",
					800: "#3c332a",
					900: "#1e1a15",
					950: "#15120f"
				},
				"olive-bark": {
					50: "#f8f4ec",
					100: "#f1e9da",
					200: "#e3d4b5",
					300: "#d6be8f",
					400: "#c8a96a",
					500: "#ba9345",
					600: "#957637",
					700: "#705829",
					800: "#4a3b1c",
					900: "#251d0e",
					950: "#1a150a"
				},
			},
			fontFamily: {
                chosungu: ['ChosunGu', 'sans-serif'],
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