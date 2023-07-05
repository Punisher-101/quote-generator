const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");

let apiQuotes = [];

const showLoadingSpinner = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingSpinner = function () {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

const newQuote = function () {
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Checking where the author exists or not
  if (!authorText.textContent) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  quoteText.textContent = quote.text;
  hideLoadingSpinner();
};

// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
    // This where you will handle error
  }
}

// Creating a function to tweet when the user click on the twitter button
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// onLoad
getQuotes();
