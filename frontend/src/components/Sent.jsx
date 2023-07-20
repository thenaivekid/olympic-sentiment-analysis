import Plots from "./Plots";
const Sent = ({chartData, title, no_of_tweets, showTweets}) => {
    console.log(showTweets, 'from sent')
    return (
        <div className="sent_card" id={title}>
            <Plots chartData={chartData} title={title} no_of_tweets={no_of_tweets} />
            <a href="#tweet_container"><button onClick={() => showTweets(title)}>Read Tweets</button></a>
        </div>

    )
}

export default Sent;