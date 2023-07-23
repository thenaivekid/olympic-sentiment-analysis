import Plots from "./Plots";
const Sent = ({chartData, title, no_of_tweets, showTweets}) => {
    console.log(showTweets, 'from sent')
    return (
        <div className="sent_card" id={title}>
            <h2>From Twitter</h2>
            <Plots chartData={chartData} title={title} no_of_tweets={no_of_tweets} />
            <a href="#tweet_container"><button onClick={() => showTweets(title)}>Read Posts</button></a>

            <h2>From Threads</h2>
            <Plots chartData={chartData} title={title} no_of_tweets={no_of_tweets} />
            <a href="#tweet_container"><button onClick={() => showTweets(title)}>Read Posts</button></a>

            <h2>From Facebook</h2>
            <Plots chartData={chartData} title={title} no_of_tweets={no_of_tweets} />
            <a href="#tweet_container"><button onClick={() => showTweets(title)}>Read Posts</button></a>

            <h2>From Reddit</h2>
            <Plots chartData={chartData} title={title} no_of_tweets={no_of_tweets} />
            <a href="#tweet_container"><button onClick={() => showTweets(title)}>Read Posts</button></a>
        </div>

    )
}

export default Sent;