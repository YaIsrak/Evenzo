'use client';

import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

interface LineChartProps {
	data: {
		labels: string[];
		datasets: {
			label: string;
			data: number[];
			backgroundColor: string[];
			borderColor?: string;
		}[];
	};
}

export function LineChart({ data }: LineChartProps) {
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
		<Line
			options={options}
			data={data}
		/>
	);
}
