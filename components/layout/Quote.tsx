'use client';
//Marked as a client component to use useEffect and useState
import { useEffect, useState } from 'react';
import fetchQuote from '../../lib/fetchQuote';

export default function Quote() {
  //quote State to hold the fetched quote
  const [quote, setQuote] = useState('loading...');
  //Fetching Quote in a useEffect scope to prevent unnecessary re-fetchings
  useEffect(() => {
    //External fetching function because fetching is not allowed in client components
    fetchQuote(setQuote);
  }, []);

  return (
    <div className='w-full h-full flex flex-col justify-between'>
      <div className='h-full flex items-center justify-center'>
        <p className='text-3xl text-center p-5'>{quote}</p>
      </div>

      <button
        className='border-4 rounded-lg p-2'
        // Trigger Quote refresh
        onClick={() => fetchQuote(setQuote)}
      >
        New Quote from Chuck
      </button>
    </div>
  );
}
