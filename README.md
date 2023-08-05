# Social Media Analysis

Try it out:
https://olympic-sentiment-analysis-gdgyrsntw-thenaivekid.vercel.app/

Demo Video 
https://youtu.be/5lwiuEWD7ko


# Documentation

## Working with data

An easy to use app to visualize what people are talking on social  media during an Oympics.

<!-- ## Features to be added:

- see visualizations according to the locations of audiences
- feature to let use specify the type of sentiment and number of tweets to read the tweets -->


For the sake of demonstration of the app, instead of getting live posts from the social media APIs, we used data of tokyo olympics 2020 that is found <a href="https://www.kaggle.com/datasets/amritpal333/tokyo-olympics-2021-tweets">here</a>

The EDA can be found in the `tokyo_olympics0.ipynb` file. The sentiments were predicted using hugging face pretrained model.
```python
from transformers import pipeline

sent_pipeline = pipeline("sentiment-analysis", 
    model='finiteautomata/bertweet-base-sentiment-analysis'
    )   
```
This model gives {sentiment, sentiment_score} for the input text. EG.
```
('NEG', 0.7984506487846375)
```
Precomputed sentiment and score columns are added to dataset for fast accessing and scalability. Now the data and the sentiments are ready to be consumed by the web app.

## Web app 

### Backend

We have used Fast API for making our web app faster.
We have three API endpoints:
- `/overall`: It takes get request and returns title, total number of posts and a list with number of posts with negative, neutral and positive sentiments respectively.
- `/sentiments`: It takes keyword and  filters all the rows with the given keyword . It also returns title, total number of posts and a list with number of posts with negative, neutral and positive sentiments respectively.
- `/tweets`: It takes keyword, number of posts and sentiment of the posts and returns the filtered posts.


### Frontend

We have written frontend on react js and used chart js for visualization.
In the `src/components` we have:
- `BarGraph`
- `PieChart`
- `Plots`: It puts the charts together.
- `Sent`: It creates a card for an individual keyword query
- `Sents`: It contains all the `Sent` items
- `Tweets`: It shows the actual posts from the social media
- `Search`: It has a input field to take the keyword and a submit button to call the API for the keyword.

`AppRemake.jsx` renders all the components in the right order and calls the APIs.


## Usage

1. clone the repo
2. To run the backed

```
cd backend
pip3 install -r requirements.txt
uvicorn main:app --reload

```
1. To run the frontend
```
npm install react
cd frontend
npm run dev
```

# live 
backend: https://social-media-ashok.onrender.com/greet/
<br>
frontend: https://olympic-sentiment-analysis-gdgyrsntw-thenaivekid.vercel.app/

<img src="ss.png">

