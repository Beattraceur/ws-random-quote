'use client';

import { useEffect, useState } from 'react';
import ViewCount from '../functional/ViewCount';

export default function Footer() {
  return (
    <div className='fixed bottom-0 w-full h-16 bg-gray-700 flex items-center justify-center'>
      <ViewCount path={'/'} />
    </div>
  );
}
