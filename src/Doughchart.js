import { Heading, UnorderedList, ListItem, List, ListIcon, Flex, } from '@chakra-ui/react';
import { MdLens } from 'react-icons/md'
import {
	Chart,
	registerables
} from 'chart.js';

import { useEffect } from "react";
import App from './App';

Chart.register(...registerables);


function DoughnutChart() {

	useEffect(() => {
		const ctx = 'myChartdough';
		const myChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: ['Staked', 'Lending', 'Liquidity', 'Farmed', 'Borrowed', 'NFT'],
				datasets: [{
					// label: '# of Votes',
					data: [1104, 1731, 1866, 2279, 737, 1132],
					cutout: 105,
					backgroundColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1,
				}]
			},
			options: {
				plugins: {
					legend: {
						position: "right",
						display: false,
					}
				},
				layout: {
					padding: {
						bottom: 70,
						left: 30,
						right: 0,
					}
				},
			},
		});

		return () => {
			myChart.destroy()
		}
	}, [])



	return (
		
		<div style={{ 'border': '0.5px gray', 'border-style': 'solid', 'width': '100%' }}>
			<div className='networth'><Heading size='md' textAlign='left' padding={'15px'}> Networth</Heading></div>
			<div className="chart-container" style={{ 'paddingTop': '02px', 'display': 'flex', 'alignItems': 'center', 'marginTop': '-20px' }}>
				<div style={{ 'width': '360px', 'height': '250px', 'marginTop': '45px', 'marginLeft': '-25px' }}>

					<canvas id="myChartdough" ></canvas>

				</div>

				<div style={{ 'width': '100%', 'margin-top': '-20px' }}>
					<Flex>

					</Flex>
					<List spacing={5} fontSize={12} fontWeight={'normal'} marginTop='35px'>

						<ListItem display={'flex'} justifyContent='space-between' width={'90%'} className>
							<div><ListIcon as={MdLens} color='rgba(255, 99, 132, 1)' />Staked</div>
							<Flex><div style={{ 'marginRight': '10px' }}>$1104.05</div><div>1.2%</div></Flex>
						</ListItem>


						<ListItem display={'flex'} justifyContent='space-between' width={'90%'}>
							<div><ListIcon as={MdLens} color='rgba(54, 162, 235, 1)' />Lending</div>
							<Flex><div style={{ 'marginRight': '10px' }}>$1731</div><div>1.2%</div></Flex>
						</ListItem>

						<ListItem display={'flex'} justifyContent='space-between' width={'90%'}>
							<div><ListIcon as={MdLens} color='rgba(255, 206, 86, 1)' />Liquidity</div>
							<Flex><div style={{ 'marginRight': '10px' }}>$1866</div><div>1.2%</div></Flex>
						</ListItem>

						<ListItem display={'flex'} justifyContent='space-between' width={'90%'}>
							<div><ListIcon as={MdLens} color='rgba(75, 192, 192, 1)' />Farmed</div>
							<Flex><div style={{ 'marginRight': '10px' }}>$2279</div><div>1.2%</div></Flex>
						</ListItem>

						<ListItem display={'flex'} justifyContent='space-between' width={'90%'}>
							<div><ListIcon as={MdLens} color='rgba(153, 102, 255, 1)' />Borrowed</div>
							<Flex><div style={{ 'marginRight': '10px' }}>$737</div><div>1.2%</div></Flex>
						</ListItem>

						<ListItem display={'flex'} justifyContent='space-between' width={'90%'}>
							<div><ListIcon as={MdLens} color='rgba(255, 159, 64, 1)' />NFT</div>
							<Flex><div style={{ 'marginRight': '10px' }}>$1132</div><div>1.2%</div></Flex>
						</ListItem>

					</List>
				</div>

			</div>

		</div>
	
	);
}

export default DoughnutChart;