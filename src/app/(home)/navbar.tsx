import Image from 'next/image';
import Link from 'next/link';
import SearchInput from './search-input';
export default function Navbar() {
  return (
    <nav className='flex items-center justify-between w-full h-full'>
      <div className='flex gap-3 items-center shrink-0 pr-6'>
        <Link href={'/'}>
          <Image src='/logo.svg' alt='Logo' width={40} height={40} />
        </Link>
        <h3 className='text-xl'>Aetherpad</h3>
      </div>
      <SearchInput />
      <div />
    </nav>
  );
}
