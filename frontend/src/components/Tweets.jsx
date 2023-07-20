const Tweets = ({tweets, title, clearTweets,loading}) => {
    // console.log('tweets', tweets)
    if(loading){
        return <div className="loading">Loading...</div>
    }
    return (
        <div id="tweets">
            
            {(tweets?.length > 0) && <div>

            <div id="tweet_heading">
                <div><h2>Reading tweets on <span className="twit_title">{title}</span></h2></div>
                <div><button id="clear_tweet" onClick={clearTweets}>X</button></div>
            </div>
            <ol id="tweets_list">
            { 
            tweets?.map((tweet, index) => (
                    <li key={index} className="tweet_list">{tweet}</li>
                ))
            }
            </ol>
            </div>
            }
        </div>
    )
}

export default Tweets