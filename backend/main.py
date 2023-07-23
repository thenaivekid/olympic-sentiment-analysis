from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

df = pd.read_csv('data_small.csv')

class KeywordRequest(BaseModel):
    query: str

class TweetsRequest(BaseModel):
    query: str
    no_of_tweets: int
    sentiment: int

@app.get('/greet/')
def greet():
    return {'greeting': 'Hello, world!'}

@app.get('/overall')
def overall_sentiment():
    sentiment_counts = df['num_labels'].value_counts().to_dict()
    return {
        'title': 'Overall Sentiment',
        'no_of_tweets': df.shape[0],
        'count': sentiment_counts
    }

@app.post("/sentiments")
def process_text(request: KeywordRequest):
    filtered_df = df[df['text'].str.contains(request.query, case=False)]
    sentiment_counts = filtered_df['num_labels'].value_counts().to_dict()
    return {
        'title': request.query,
        'no_of_tweets': filtered_df.shape[0],
        'count': sentiment_counts
    }

@app.post('/tweets')
def show_tweets(request: TweetsRequest):
    filtered_df = df[df['text'].str.contains(request.query, case=False)]
    
    if request.sentiment in range(3):
        filtered_df = filtered_df[filtered_df['num_labels'] == request.sentiment]
    
    tweets = filtered_df['text'].head(request.no_of_tweets).tolist()
    if tweets:
        return {'tweets': tweets}
    else:
        raise HTTPException(status_code=404, detail='Resources not found.')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
