import Image from 'next/image';
import Link from 'next/link';

//Header with clickable logo
export default function Header() {
  return (
    <div className='mt-8 ml-10'>
      <Link href='/'>
        <Image
          //Image scale effect on hover
          className='transition-transform transform hover:scale-105'
          src='/logos/layout-logo-w-s-weis.svg'
          alt='W&S-Logo'
          width={101}
          height={66}
        />
      </Link>
    </div>
  );
}
