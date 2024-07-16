import Quote from '@/components/layout/Quote';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='w-full flex flex-col items-center justify-between p-24'>
      <div className='max-w-6xl flex flex-row gap-4'>
        <div className='flex-1'>
          <Image
            src='/pictures/webdevNorris.jpg'
            alt='Chuck Norris as WebDev'
            width={600}
            height={600}
          />
        </div>
        <div className='flex-1 flex items-center justify-center'>
          <Quote />
        </div>
      </div>
    </main>
  );
}
