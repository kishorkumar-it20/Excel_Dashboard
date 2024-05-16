import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CustomsLeadTimeGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map((_, index) => `Data ${index + 1}`),
          datasets: [
            {
              label: 'Customs Lead Time',
              data: data.map(item => item.customsLeadTime),
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Transit Time',
              data: data.map(item => item.transitTime),
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Data Index',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Time (days)',
              },
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default CustomsLeadTimeGraph;
