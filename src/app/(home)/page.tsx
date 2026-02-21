import Navbar from './navbar';
import TemplatesGallery from './templates-gallery';

export default function Home() {
  return (
    <div className='w-full min-h-screen max-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
      </div>
    </div>
  );
}
