import { useMutation } from 'convex/react';
import React, { useState } from 'react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';

interface IRenameDialogProps {
  documentId: Id<'documents'>;
  children: React.ReactNode;
  initialTitle: string;
}

export default function RenameDialog({
  documentId,
  children,
  initialTitle,
}: IRenameDialogProps) {
  const update = useMutation(api.documents.updateById);
  const [title, setTitle] = useState<string>(initialTitle);
  const [isUpdating, setIsUpdating] = useState(false);
  const [onOpen, setOnOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    update({ id: documentId, title: title.trim() || 'Untitled' }).finally(
      () => {
        setIsUpdating(false);
        setOnOpen(false);
      }
    );
  };
  return (
    <Dialog open={onOpen} onOpenChange={setOnOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Rename Document</DialogTitle>
          <DialogDescription>
            Enter a new name for your document.
          </DialogDescription>
          <form action='' onSubmit={onSubmit}>
            <div className='my-4'>
              <Input
                placeholder='Document Name'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </form>
          <DialogFooter>
            <Button
              type='button'
              variant={'ghost'}
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                setOnOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isUpdating}
              onClick={(e) => e.stopPropagation()}
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
