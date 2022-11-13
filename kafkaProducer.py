import tweepy
from kafka.producer import KafkaProducer
import logging

"""API ACCESS KEYS"""

consumerKey = "48IEAbdxH1MpT6ErcQb4M5k0X"
consumerSecret = "qNl4yNYlh1e6M964e9Ve23rKVbwWnRaZWaKsvGFJM6xqiiPyKi"
accessToken = "1583496220525309952-tjdvzt4zzWMVdL6vSrBBbojjDPLBLG"
accessTokenSecret = "wQNYIjOHEQJL6NE87h1fWmTmYuMn66mXwF70YDBTCFzln"

producer = KafkaProducer(bootstrap_servers='172.17.0.1:9092')
search_term = 'Bitcoin'
topic_name = 'twitter'


def twitterAuth():
    # create the authentication object
    authenticate = tweepy.OAuthHandler(consumerKey, consumerSecret)
    # set the access token and the access token secret
    authenticate.set_access_token(accessToken, accessTokenSecret)
    # create the API object
    api = tweepy.API(authenticate, wait_on_rate_limit=True)
    return api


class TweetListener(tweepy.Stream):

    def on_data(self, raw_data):
        logging.info(raw_data)
        producer.send(topic_name, value=raw_data)
        return True

    def on_error(self, status_code):
        if status_code == 420:
            # returning False in on_data disconnects the stream
            return False

    def start_streaming_tweets(self, search_term):
        self.filter(track=search_term, stall_warnings=True, languages=["en"])


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    twitter_stream = TweetListener(consumerKey, consumerSecret, accessToken, accessTokenSecret)
    twitter_stream.start_streaming_tweets(search_term)