import Quote from '@/components/layout/Quote';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='w-full flex flex-col items-center justify-between p-24'>
      {/*The centered main div with image and quote-component*/}
      <div className='max-w-6xl flex md:flex-row flex-col gap-4'>
        <div className='flex-1 md:order-1'>
          {/*Next Image component with static image source*/}
          <Image
            src='/pictures/webdevNorris.jpg'
            alt='Chuck Norris as WebDev'
            width={700}
            height={700}
          />
        </div>
        <div className='flex-1 flex items-center justify-center md:order-2'>
          {/*Custom react Quote component*/}
          <Quote />
        </div>
      </div>
    </main>
  );
}
