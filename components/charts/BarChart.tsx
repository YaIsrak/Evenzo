'use client';

import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

interface BarChartProps {
	data: {
		labels: string[];
		datasets: {
			label: string;
			data: number[];
			backgroundColor: string[];
		}[];
	};
}

export function BarChart({ data }: BarChartProps) {
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1,
				},
			},
		},
	};

	return (
		<Bar
			options={options}
			data={data}
		/>
	);
}
