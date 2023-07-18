import Plots from "./Plots";
const Sent = ({chartData, title, no_of_tweets, showTweets}) => {
    // console.log(showTweets, 'from sent')
    return (
        <div className="sent_card" id={title}>
            <Plots chartData={chartData} title={title} no_of_tweets={no_of_tweets} />
            <button onClick={() => showTweets(title)}>Read Tweets</button>
        </div>

    )
}

export default Sent;