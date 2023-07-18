from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

df = pd.read_csv('data_small.csv')
class KeywordRequest(BaseModel):
    query: str
    

class TweetsRequest(BaseModel):
    query: str
    no_of_tweets: int
    sentiment: int

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/greet/')
def greet():
    print()
    return {'geeting': 'Hello world'}
    
@app.get('/overall')
def overall_sentiment():
    count = df['num_labels'].value_counts()
    return {'title': 'overall', 'no_of_tweets': df.shape[0], 'count': list(count)}

@app.post("/sentiments")
def process_text(request: KeywordRequest):
    print(request.query)
    filtered_df = df[df['text'].str.contains(request.query, case=False)]
    count = filtered_df['num_labels'].value_counts()
    return {'title': request.query, 'no_of_tweets': filtered_df.shape[0], 'count': list(count)}

@app.post('/tweets')
def show_tweets(request: TweetsRequest):
    """request should contain keyword to filter, no of tweets, neg/pos/neu/any. returns the actual tweets"""
    filtered_df = df[df['text'].str.contains(request.query, case=False)]
    if 0 <= request.sentiment <= 2:
        filtered_df = filtered_df[filtered_df['num_labels'] == request.sentiment]
    tweets = list(filtered_df.head(request.no_of_tweets)['text'])
    print(tweets)
    return {'tweets': tweets}