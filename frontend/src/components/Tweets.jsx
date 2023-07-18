const Tweets = ({tweets, title, clearTweets}) => {
    console.log('tweets', tweets)
    return (
        <div id="tweets">
            
            {(tweets.length > 0) && <div>

            <div id="tweet_heading">
                <div><h2>Reading tweets on {title}</h2></div>
                <div><button id="clear_tweet" onClick={clearTweets}>X</button></div>
            </div>
            <ol id="tweets_list">
            { 
            tweets.map((tweet, index) => (
                    <li key={index}>{tweet}</li>
                ))
            }
            </ol>
            </div>
            }
        </div>
    )
}

export default Tweets