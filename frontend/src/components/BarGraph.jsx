import { Bar } from "react-chartjs-2";

const BarGraph = ({ chartData, title, no_of_tweets }) => {
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{ title }</h2>
      <h3>Total tweets: { no_of_tweets }</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarGraph;