'use client';
import { useSearchParam } from '@/hooks/use-search-param';
import { usePaginatedQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import DocumentsTable from './documents-table';
import Navbar from './navbar';
import TemplatesGallery from './templates-gallery';

export default function Home() {
  const [search] = useSearchParam();
  const { results, status, loadMore } =
    usePaginatedQuery(api.documents.get, { search }, { initialNumItems: 5 }) ||
    [];

  return (
    <div className='w-full min-h-screen max-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          status={status}
          loadMore={loadMore}
        />
      </div>
    </div>
  );
}
