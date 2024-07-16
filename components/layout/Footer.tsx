'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    async function fetchUserCount() {
      const response = await fetch('/');
      const count = await response.headers.get('X-User-Count');
      setUserCount(count);
    }
    fetchUserCount();
  }, []);

  return (
    <div className='fixed bottom-0 w-full h-16 bg-gray-700 flex items-center justify-center'>
      User count: {userCount}
    </div>
  );
}
