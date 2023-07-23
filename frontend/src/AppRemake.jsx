import { useState, useEffect } from "react";
import "./App.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import makeData from "./utils/makeData";
import Search from "./components/Search";
import Plots from "./components/Plots";
import Sents from "./components/Sents";
import Tweets from "./components/Tweets";

Chart.register(CategoryScale);

function AppRemake() {
  const [keyword, setKeyword] = useState("");
  const [overallSent, setOverallSent] = useState([]);
  const [sent, setSent] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [value, setvalue] = useState("");

  const [loading, setLoading] = useState(false);

  const onInputChange = (e) => {
    setvalue(e.target.value);
  };

  const clearTweets = () => {
    setTweets([]);
  };

  const submitQuery = (e) => {
    e.preventDefault();
    clearTweets();

    if (!value) {
      alert("please enter a key word");
    }
    setKeyword(value);
    setvalue("");
  };

  const fetchOverallSent = async () => {
    const res = await fetch("https://social-media-ashok.onrender.com/overall");
    const data = await res.json();
    return data;
  };

  const fetchSent = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      query: keyword,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
      const res = await fetch(
        "https://social-media-ashok.onrender.com/sentiments",
        requestOptions
      );
      const data = await res.json();
      return data;
  };

  const fetchTweets = async (title) => {
    console.log("fetch tweets", title);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      query: title,
      no_of_tweets: 20,
      sentiment: 3,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    try {
      setLoading(true);
      let res = await fetch("https://social-media-ashok.onrender.com/tweets", requestOptions);
      let data = await res.json();
      if (data.detail === "Resources not found.") {
        throw Error("CResources not found.");
      }
      setTweets(data.tweets);
      setLoading(false);
      setKeyword(title);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getOverallSent = async () => {
      const overallSent = await fetchOverallSent();
      // console.log(overallSent);
      setOverallSent(overallSent);
    };
    getOverallSent();
  }, []);

  useEffect(() => {
    const getSent = async () => {
      const newsent = await fetchSent();
      // console.log("new sent", newsent);
      if (newsent.title) {
        // setSent(newsent);
        setSent([newsent, ...sent]);
      }
    };
    getSent();
  }, [keyword]);
  return (
    <div className="App">
      <div>
        <h1>Social media Analysis</h1>
      </div>
      <div>
        <Search
          onsubmit={submitQuery}
          value={value}
          onInputChange={onInputChange}
        ></Search>
      </div>
      
      <div id="tweet_container">
        <Tweets
          tweets={tweets}
          title={keyword}
          loading={loading}
          clearTweets={clearTweets}
        ></Tweets>
      </div>

      <div id="sents">
        <Sents sents={sent} showTweets={fetchTweets} />
      </div>

    
      <div id="overallSent">
        <Plots
          chartData={makeData(overallSent.count)}
          title={"Overall Sentiment"}
          no_of_tweets={overallSent.no_of_tweets}
        ></Plots>
      </div>
    </div>
  );
}
export default AppRemake;
