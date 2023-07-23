// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData, title, no_of_tweets }) => {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>{ title }</h2>
      <h3>Total Posts: { no_of_tweets }</h3> */}
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: ''
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;