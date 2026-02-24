import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaginationStatus } from 'convex/react';
import { LoaderIcon } from 'lucide-react';
import { Doc } from '../../../convex/_generated/dataModel';
import DocumentRow from './document-row';

export interface IDocumentTableProps {
  documents: Doc<'documents'>[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export default function DocumentsTable({
  documents,
  loadMore,
  status,
}: IDocumentTableProps) {
  return (
    <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5'>
      {documents === undefined ? (
        <div className='flex items-center justify-center h-24'>
          <LoaderIcon className='animate-spin text-muted-foreground size-5' />
        </div>
      ) : documents.length === 0 ? (
        <div className='flex items-center justify-center text-muted-foreground text-xl'>
          No documents found. Create a new one!
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent border-none'>
                <TableHead>Name</TableHead>
                <TableHead>&nbsp;</TableHead>
                <TableHead className='hidden md:table-cell'>Shared</TableHead>
                <TableHead className='hidden md:table-cell'>
                  Created at
                </TableHead>
              </TableRow>
            </TableHeader>
            {documents.length === 0 ? (
              <TableBody>
                <TableRow className='hover:bg-transparent border-none'>
                  <TableHead
                    colSpan={4}
                    className='text-center h-24 text-muted-foreground'
                  >
                    No documents found. Create a new one!
                  </TableHead>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {documents.map((document) => (
                  <DocumentRow key={document._id} document={document} />
                ))}
              </TableBody>
            )}
          </Table>
        </>
      )}
    </div>
  );
}
