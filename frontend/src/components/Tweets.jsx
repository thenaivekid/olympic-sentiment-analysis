import React from "react";

const Tweets = ({ tweets, title, clearTweets, loading }) => {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div id="tweets">
      {tweets?.length > 0 && (
        <div>
          <div id="tweet_heading">
            <h2>
              Reading tweets on <span className="twit_title">{title}</span>
            </h2>
            <button id="clear_tweet" onClick={clearTweets}>
              X
            </button>
          </div>
          <ol id="tweets_list">
            {tweets.map((tweet, index) => (
              <li key={index} className="tweet_list">
                {tweet}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Tweets;
