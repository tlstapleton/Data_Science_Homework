from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import mission_to_mars

app = Flask(__name__)


app.config["MONGO_URI"] = 'mongodb://localhost:27017/mission_to_mars'
mongo = PyMongo(app)

@app.route("/")
def index():
    mars_news = mongo.db.mars.find_one()
    return render_template("index.html", all_results_dictionary= mars_news)


@app.route("/scrape")
def scraper():
    mars_news = mongo.db.mars
    all_results_dictionary = mission_to_mars.scrape()
    mars_news.update({}, all_results_dictionary, upsert=True)
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)


