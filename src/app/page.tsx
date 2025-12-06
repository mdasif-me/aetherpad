import Link from 'next/link';

export default function Home() {
  return (
    <div className='w-full min-h-screen gap-1 max-h-screen flex items-center justify-center'>
      Click{' '}
      <Link href={'/documents/1'} className=' text-blue-400 underline'>
        here
      </Link>{' '}
      to go to document page
    </div>
  );
}
