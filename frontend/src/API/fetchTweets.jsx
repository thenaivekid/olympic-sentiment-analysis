export const fetchTweets = async (title) => {
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

  let res = await fetch("https://social-media-ashok.onrender.com/tweets", requestOptions);

  return res;
};
