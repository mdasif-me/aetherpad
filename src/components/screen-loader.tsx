import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';

interface IScreenLoaderProps {
  label?: string;
  className?: string;
}

export default function ScreenLoader({ label, className }: IScreenLoaderProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center gap-2',
        className
      )}
    >
      <LoaderIcon className='size-8 text-muted-foreground animate-spin' />
      {label && <span className='text-sm text-muted-foreground'>{label}</span>}
    </div>
  );
}
