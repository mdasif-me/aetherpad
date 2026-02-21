'use client';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Navbar from './navbar';
import TemplatesGallery from './templates-gallery';

export default function Home() {
  const documents = useQuery(api.documents.get) || [];

  if (documents === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full min-h-screen max-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
        {documents?.map((doc) => (
          <div key={doc._id} className='p-4 border-b'>
            {doc.title}
          </div>
        ))}
      </div>
    </div>
  );
}
