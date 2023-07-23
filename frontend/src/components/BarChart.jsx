import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData, title, no_of_tweets }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{ title }</h2>
      <h3>Total tweets: { no_of_tweets }</h3>
      <Bar
        data={chartData}
        
      />
    </div>
  );
};

export default BarChart;