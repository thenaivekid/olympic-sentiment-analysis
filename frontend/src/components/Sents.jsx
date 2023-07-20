import Sent from "./Sent"
import makeData from "../utils/makeData"
const Sents = ({ sents, showTweets }) => {
    // console.log('sents', sents)
    // console.log(showTweets, 'from sents')
    
    return (
        <>
            {
                sents.map((sent, index) => (
                    <Sent key={index} chartData={makeData(sent.count)} title={sent.title} no_of_tweets={sent.no_of_tweets} showTweets={showTweets}/>
                ))
            }
        </>
    )
}

export default Sents