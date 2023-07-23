export const fetchSent = async () => {
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

    const res = await fetch("https://social-media-ashok.onrender.com/sentiments", requestOptions);
    const data = await res.json();
    // console.log("fetch sent", data);
    return data;
  };