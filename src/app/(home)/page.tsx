import Link from 'next/link';
import Navbar from './navbar';

export default function Home() {
  return (
    <div className='w-full min-h-screen max-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white'>
        <Navbar />
      </div>
      <div className='mt-16'>
        Click{' '}
        <Link href={'/documents/1'} className=' text-blue-400 underline'>
          here
        </Link>{' '}
        to go to document page
      </div>
    </div>
  );
}
