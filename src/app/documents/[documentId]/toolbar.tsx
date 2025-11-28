'use client';

import { LucideIcon, Undo2Icon } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface IToolbarProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}
const TooolbarButton = ({ icon: Icon, isActive, onClick }: IToolbarProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className='size-4' />
    </button>
  );
};

const Toolbar = () => {
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => {
          console.log('Undo clicked');
        },
      },
    ],
  ];

  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {sections[0].map((item) => (
        <TooolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
