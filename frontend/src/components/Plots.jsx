import PieChart from "./PieChart";


const BarChart = ({ chartData, title, no_of_tweets }) => {
    return (
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>{ title }</h2>
        <h3>Total tweets: { no_of_tweets }</h3>
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: false,
                text: ''
              },
              legend: {
                display: false
              }
            }
          }}
        />
      </div>
    );
  };


const Plots = ({ chartData, title, no_of_tweets }) => {
    return (
            <div className="sent_card_plots">
                <PieChart chartData={chartData} title={title} no_of_tweets={no_of_tweets}/>
                <BarChart chartData={chartData} title={title} no_of_tweets={no_of_tweets}/>
            </div>
    )
}

export default Plots