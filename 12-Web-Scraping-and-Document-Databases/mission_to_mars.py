#!/usr/bin/env python
# coding: utf-8

# In[111]:


from bs4 import BeautifulSoup
from splinter import Browser
import requests
import pymongo
import pandas as pd
import numpy as np
import time

# In[2]:


def init_browser():
    executable_path = {'executable_path': 'chromedriver.exe'}
    return Browser('chrome', **executable_path, headless=False)


def scrape():
    browser = init_browser()
    all_results_dictionary = {}

    # # NASA Mars News

    url = "https://mars.nasa.gov/news/"
    browser.visit(url)
    time.sleep(2)

    html = browser.html
    news_soup = BeautifulSoup(html, 'html.parser')
    article = news_soup.find('li',class_='slide')
    headline = article.find('div', class_='content_title')
    news_title=headline.text

    description=article.find('div', class_='article_teaser_body')
    news_p=description.text
    
    all_results_dictionary['news_title']=news_title
    all_results_dictionary['news_p']=news_p     

    # # Featured Image
    # Scrape the nasa website for the latest featured Mars image

    url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(url)

    html = browser.html
    img_soup = BeautifulSoup(html, 'html.parser')
    image = img_soup.find('ul',class_='articles')

    first = image.find('div',class_='img')
    img=first.find('img')
    featured_image_url='https://www.jpl.nasa.gov/'+img['src']
    all_results_dictionary['featured_image_url']=featured_image_url

    # # Twitter
    # Scrape the latest Mars Weather Tweet
    url = "https://twitter.com/marswxreport?lang=en"
    browser.visit(url)

    html = browser.html
    twitter_soup = BeautifulSoup(html, 'html.parser')
    tweets = twitter_soup.find('div',class_='tweet')
    mars_weather=tweets.find('p','tweet-text').text
    all_results_dictionary['mars_weather'] = mars_weather

# # Mars Facts

    url='https://space-facts.com/mars/'
    tables=pd.read_html(url)
    df=pd.DataFrame(tables[0])
    df.columns=['Description','Value']
    df.set_index('Description',inplace=True)
    html_table=df.to_html()
    html_table=html_table.replace('\n', '')
    all_results_dictionary['html_table'] = html_table

# # Mars Hemispheres

    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url)

    html = browser.html
    hemispheres_soup = BeautifulSoup(html, 'html.parser')

    hemispheres = hemispheres_soup.find_all('div', class_='item')
    titles=[]
    for hemisphere in hemispheres:
        titles.append(hemisphere.find('h3').text.strip())

    image_urls=[]
    for title in titles:
            browser.click_link_by_partial_text(title)
            html=browser.html
            soup=BeautifulSoup(html, 'html.parser')
            img_soup = soup.find('div', class_='downloads')
            a=img_soup.find('li').find('a')
            image_urls.append(a['href'])
            browser.visit(url)

    keys = ['title', 'img_url']
    
    hemisphere1 = [titles[0],image_urls[0]]
    hemisphere2 = [titles[1],image_urls[1]]
    hemisphere3 = [titles[2],image_urls[2]]
    hemisphere4 = [titles[3],image_urls[3]]

    hemisphere_image_urls= []
    hemisphere_image_urls.append(dict(zip(keys, hemisphere1)))
    hemisphere_image_urls.append(dict(zip(keys, hemisphere2)))
    hemisphere_image_urls.append(dict(zip(keys, hemisphere3)))
    hemisphere_image_urls.append(dict(zip(keys, hemisphere4)))
    
    all_results_dictionary['hemisphere_image_urls'] = hemisphere_image_urls

    return all_results_dictionary



