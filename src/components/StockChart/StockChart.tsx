import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

interface Dataset {
  borderColor: string
  data: number[]
  fill: boolean
  label: string
}

interface StockData {
  labels: string[]
  datasets: Dataset[]
}

interface IProps {
  data: StockData
}

const StockChart = (props: IProps) => {
  const { data } = props

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        text: 'Date'
      },
      y: {
        title: {
          display: true,
          text: 'Price'
        }
      }
    },
  };

  return <Line data={data} options={options} />
};

export default StockChart;
