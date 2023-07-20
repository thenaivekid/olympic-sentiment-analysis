import { useState, useEffect } from "react";
import "./App.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./components/PieChart";
import BarChart from "./components/Barchart";
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
  const [error, seterror] = useState(null);

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

  //*To fetch all number of tweets tweets
  const fetchOverallSent = async () => {
    const res = await fetch("http://127.0.0.1:8000/overall");

    const data = await res.json();
    // console.log("fetched overall sent data");

    return data;
  };

  //*To fetch real tweets
  const fetchSent = async () => {
    // FIXME when there is no keyword catch the error instead of setting error as sent
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
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/sentiments",
        requestOptions
      );
      const data = await res.json();
      // console.log("fetch sent", data);
      return data;
    } catch (err) {
      console.log();
    }
  };

  const fetchTweets = async (title) => {
    // FIXME
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
      let res = await fetch("http://127.0.0.1:8000/tweets", requestOptions);
      let data = await res.json();
      if (data.detail === "Not Found") {
        throw Error("Couldn't find data");
      }
      console.log(data);

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
        <h1>Tweet Analysis</h1>
      </div>
      <div>
        <Search
          onsubmit={submitQuery}
          value={value}
          onInputChange={onInputChange}
        ></Search>
      </div>

      <div id="overallSent">
        <Plots
          chartData={makeData(overallSent.count)}
          title={"Overall Sentiment"}
          no_of_tweets={overallSent.no_of_tweets}
        ></Plots>
      </div>

      <div id="sents">
        <Sents sents={sent} showTweets={fetchTweets} />
      </div>

      <div id="tweet_container">
        <Tweets
          tweets={tweets}
          title={keyword}
          loading={loading}
          clearTweets={clearTweets}
        ></Tweets>
      </div>
    </div>
  );
}
export default AppRemake;
