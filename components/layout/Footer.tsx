'use client';
import ViewCount from '../functional/ViewCount';

//Simple footer with viewcount-component
export default function Footer() {
  return (
    <div className='fixed bottom-0 w-full h-16 bg-gray-700 flex items-center justify-center'>
      {/*Viewcount for a specific path. Currently set to display the viewcount of the main page*/}
      <ViewCount path={'/'} />
    </div>
  );
}
