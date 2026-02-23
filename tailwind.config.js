/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},

	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				voyage: {
					primary: '#834AED',
					'primary-focus': '#6E35D9',
					'primary-content': '#FFFFFF',

					secondary: '#4AB565',
					'secondary-focus': '#3E9E57',
					'secondary-content': '#FFFFFF',

					accent: '#22D3EE', // soft cyan for highlights
					'accent-content': '#0F172A',

					neutral: '#1E293B', // slate-800
					'neutral-content': '#F1F5F9',

					'base-100': '#F8FAFC', // very soft background
					'base-200': '#F1F5F9',
					'base-300': '#E2E8F0',
					'base-content': '#0F172A',

					info: '#0EA5E9',
					success: '#16A34A',
					warning: '#F59E0B',
					error: '#EF4444'
				}
			}
		]
	}
};
