//Simple helper function to fetch a random quote
import { Dispatch, SetStateAction } from 'react';
export default async function fetchQuote(
  setQuote: Dispatch<SetStateAction<string>>
) {
  //Use the standard nextjs fetch function inside a try-catch block
  try {
    const newQuote = await fetch(
      'https://api.chucknorris.io/jokes/random?category=dev'
    );

    //Parse the response as JSON
    const QuoteObject = await newQuote.json();
    // console.log(QuoteObject);
    //Store the quote in the state
    setQuote(QuoteObject.value);
  } catch (error) {
    console.log(error);
  }
}
