import React, { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from './colorsArray'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'



let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("If you will live like no one else, later you can live like no one else.");
  const [author, setAuthor] = useState("Dave Ramsey");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  }

  useEffect (() => {
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(Math.random() * quotesArray.length); 
    setAccentColor(COLORS_ARRAY[randomInteger])
    setRandomNumber(randomInteger)
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }
  
  return (
    <div className="App">
      <head>
      <script src="https://kit.fontawesome.com/dba54a08d4.js" crossorigin="anonymous"></script>
      </head>
      <header className="App-header" style={
        {backgroundColor: accentColor, color: accentColor}}>
          <wrapper id="quote-box" style={
        {color: accentColor}}>
            <p id="text">
              <FontAwesomeIcon icon={faQuoteLeft} id="quote-left"/>{quote}
            </p>

            <p id="author">
              - {author}
            </p>

            <button class="btn" id="new-quote" onClick={() => getRandomQuote()} style={
              {backgroundColor: accentColor}}>
              New quote
            </button>

            <a class="btn" id="tweet-quote" target="_blank" href="https://www.twitter.com/intent/tweet" style={
        {color: accentColor}}>
          <FontAwesomeIcon icon={faRetweet} id="twitter"/>Tweet Quote
            </a>
          </wrapper>
      </header>
    </div>
  );
}

export default App;
