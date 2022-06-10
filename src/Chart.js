import { Flex, Heading } from '@chakra-ui/react';
import {
  Chart,
  registerables
} from 'chart.js';
import $ from 'jquery';
import { useEffect } from "react";

Chart.register(...registerables);


function ChartTest() {

	useEffect(() => {
			// const ctx = document.getElementById('myChart').getContext('2d');
		    const ctx = 'myChartTest';
			const myChart = new Chart(ctx, {
		    type: 'line',
		    data: {
		        labels: ['July 2020', 'Aug 2020', 'Sep 2020', 'Oct 2020', 'Nov 2020', 'Dec 2020','Jan 2021'],
		        datasets: [{
		            label: ' $',
		            data: [ 3000, 9000 , 4000 , 15000, 5000, 4000, 10000],
					fill: true,
        			borderColor: "rgba(75,192,192,1.2)",
		            backgroundColor: [
		                'rgba(117, 179, 188 , 0.2)'
		            ],
		            borderColor: [
		                'rgba(117, 179, 188 , 2)'
		            ],
		            borderWidth: 2,
		        }]
		    },
		    options: {
		        scales: {
		            y: {
		                beginAtZero: false
		            },
					x: {
						grid: {
						   display: false
						}
					 },
					 y: {
						grid: {
						   display: true
						}
					 }
		        },
				plugins: {
					legend: {
						display: false,
					}
				}
		    },
		});

		//  return () => {
	    //   myChart.destroy()
	    // }
 }, [])

//   $('.myChartTest').css('height','100px !important')



	return(
		<div style={{'paddingTop':'20px',}}>
		 	<div className="chart-container"  style={{'border': '0.3px gray', 'border-style': 'solid', 'width':'100%',}}>
			

				<Heading size='md' textAlign='left' padding={'15px'}> Networth Trend</Heading>
			
				{/* <canvas id="myChartTest" style={{'height':'100px !important'}} /> */}
				<section >
				<canvas id="myChartTest" style={{'width':'800px','height':'290px', }}/>
				</section>
				

				
			
		
			
			 </div>
		</div>
		
		
		);
}

export default ChartTest;