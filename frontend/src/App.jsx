import { useState, useEffect } from 'react'
import './App.css'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./components/PieChart";
import  BarChart  from './components/Barchart';
import makeData from './utils/makeData';
import Search from './components/Search';
import Plots from './components/Plots';
import Sents from './components/Sents';
import Tweets from './components/Tweets';
Chart.register(CategoryScale);

function App() {
  const fetchOverallSent = async() => {
    const res = await fetch('http://127.0.0.1:8000/overall');
    const data = await res.json();
    console.log('fetched overall sent data')
    return data;
  }

  const fetchSent = async() => {
    // FIXME when there is no keyword catch the error instead of setting error as sent
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      query: keyword
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

      const res = await fetch('http://127.0.0.1:8000/sentiments', requestOptions)
      const data = await res.json()
      console.log('fetch sent', data)
      return data
  }

  const submitQuery = (e) => {
    e.preventDefault();
    clearTweets();
    const query_text_element = document.getElementById('query_text');
    const query = query_text_element.value;
    console.log("search button clicked", query)
    if (!query){
      alert("please enter a key word")
    }
    setKeyword(query);
    query_text_element.value = '';
  }

  const fetchTweets = async(title) => {
    // FIXME
    console.log('fetch tweets', title)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "query": title,
      "no_of_tweets": 20,
      "sentiment": 3
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
  
    fetch('http://127.0.0.1:8000/tweet',requestOptions)
    .then ((res) => {
      console.log(res, "anil") 
      console.log("status", res.status)
    const data = res.json();
    setTweets(data.tweets)
    setKeyword(title)
    console.log(data.tweets)
    })
    .catch((error) =>{
      console.log("i am error", error)
    })
    // console.log("status", res.status)
    // const data = await res.json();
    // setTweets(data.tweets)
    // setKeyword(title)
    // console.log(data.tweets)
    
 
  }


  const clearTweets = () => {
    setTweets([])
  }
  

  const [overallSent, setOverallSent] = useState([])

  useEffect(() => {
    const getOverallSent = async() => {
      const overallSent = await fetchOverallSent();
      console.log(overallSent);
      setOverallSent(overallSent);
    }
    getOverallSent();
  }, []);

  const [keyword, setKeyword] = useState([])

  const [sent, setSent] = useState([])

  useEffect(() => {
    const getSent = async() => {
      const newsent = await fetchSent();
      console.log('new sent', newsent);
      if(newsent.title){
      // setSent(newsent);
      setSent([newsent, ...sent]);
    }
    }
    getSent();
  }, [keyword]);

  const [tweets, setTweets] = useState([]);
 
  return (
    <div className="App">
      <div>
        <h1>Tweet Analysis</h1>
      </div>
      <div>
        <Search onsubmit={submitQuery}></Search>
      </div>
      
      <div id='overallSent'>
        <Plots chartData={makeData(overallSent.count)} title={'Overall Sentiment'} no_of_tweets={overallSent.no_of_tweets} ></Plots>
      </div>

      <div id='tweet_container'>
        <Tweets tweets={tweets} title={keyword} clearTweets={clearTweets}></Tweets>
      </div>

      <div id='sents'>
        <Sents sents={sent} showTweets={fetchTweets}/>
      </div>
    </div>
  );
}

export default App
