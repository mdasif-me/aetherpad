import RemoveDialog from '@/components/remove-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExternalLinkIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';

interface IDocumentMenuProps {
  documentId: Id<'documents'>;
  title: string;
  onNewTab: (id: Id<'documents'>) => void;
}

export default function DocumentMenu({
  documentId,
  title,
  onNewTab,
}: IDocumentMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className='rounded-full'>
          <MoreVerticalIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onClick={(e) => e.stopPropagation()}
            onSelect={(e) => e.preventDefault()}
          >
            <Trash2Icon className='size-4 mr-2' /> Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onSelect={() => onNewTab(documentId)}>
          <ExternalLinkIcon className='size-4 mr-2' /> Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
