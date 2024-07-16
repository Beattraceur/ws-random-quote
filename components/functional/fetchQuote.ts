import { Dispatch, SetStateAction } from 'react';
export default async function fetchQuote(
  setQuote: Dispatch<SetStateAction<string>>
) {
  try {
    const newQuote = await fetch(
      'https://api.chucknorris.io/jokes/random?category=dev'
    );
    const QuoteObject = await newQuote.json();
    console.log(QuoteObject);
    setQuote(QuoteObject.value);
  } catch (error) {
    console.log(error);
  }
}
