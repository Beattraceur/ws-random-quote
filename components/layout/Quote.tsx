'use client';
import { useEffect, useState } from 'react';
import fetchQuote from '../functional/fetchQuote';

export default function Quote() {
  const [quote, setQuote] = useState('loading...');
  useEffect(() => {
    fetchQuote(setQuote);
  }, []);

  return (
    <div className='w-full h-full flex flex-col justify-between'>
      <div className='h-full flex items-center justify-center'>
        <p className='text-3xl text-center p-5'>{quote}</p>
      </div>

      <button
        className='border-4 rounded-lg p-2'
        onClick={() => fetchQuote(setQuote)}
      >
        New Quote
      </button>
    </div>
  );
}
