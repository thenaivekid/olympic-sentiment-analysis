import PieChart from "./PieChart";
import BarGraph from "./BarGraph";

const Plots = ({ chartData, title, no_of_tweets }) => {
    return (
            <div className="sent_card_plots">
                <PieChart chartData={chartData} title={title} no_of_tweets={no_of_tweets}/>
                <BarGraph chartData={chartData} title={title} no_of_tweets={no_of_tweets}/>
            </div>
    )
}

export default Plots