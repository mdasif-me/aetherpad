'use client';

import { type Level } from '@tiptap/extension-heading';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from 'lucide-react';
import { useState } from 'react';
import { SketchPicker, type ColorResult } from 'react-color';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Input } from '../../../components/ui/input';
import { Separator } from '../../../components/ui/separator';
import { cn } from '../../../lib/utils';
import { useEditorStore } from '../../../store/use-editor-store';

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: 'Align Left',
      value: 'left',
      icon: AlignLeftIcon,
    },
    {
      label: 'Align Center',
      value: 'center',
      icon: AlignCenterIcon,
    },
    {
      label: 'Align Right',
      value: 'right',
      icon: AlignRightIcon,
    },
    {
      label: 'Justify',
      value: 'justify',
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <AlignLeftIcon className='size-4 mb-0.5' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80'
            )}
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [imageURL, setImageURL] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onChange = (href: string) => {
    editor?.chain().focus().setImage({ src: href }).run();
  };

  const onUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);
        onChange(imageURL);
      }
    };
    input.click();
  };

  const handleImageURLSubmit = () => {
    if (imageURL) {
      onChange(imageURL);
      setImageURL('');
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder='Insert image url'
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleImageURLSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageURLSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
            <ImageIcon className='size-4 mb-0.5' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className='size-4 mr-2' />
            Upload
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className='size-4 mr-2' />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState('');
  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
    setValue('');
  };
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes('link').href || '');
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <Link2Icon className='size-4 mb-0.5' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
        <Input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='border border-gray-300 rounded px-2 py-1 text-sm'
          placeholder='https://example.com'
        />
        <Button onClick={() => onChange(value)} disabled={!value.trim()}>
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value =
    (editor?.getAttributes('highlight').color as string) || '#FFFFFF';
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <HighlighterIcon className='size-4 mb-0.5' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value =
    (editor?.getAttributes('textStyle').color as string) || '#000000';
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='text-xs'>A</span>
          <div
            className='h-0.5 w-full'
            style={{ backgroundColor: value }}
          ></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    { label: 'Normal text', value: 0, fontSize: '1rem' },
    { label: 'Heading 1', value: 1, fontSize: '2rem' },
    { label: 'Heading 2', value: 2, fontSize: '1.6rem' },
    { label: 'Heading 3', value: 3, fontSize: '1.3rem' },
    { label: 'Heading 4', value: 4, fontSize: '1.15rem' },
    { label: 'Heading 5', value: 5, fontSize: '1.05rem' },
    { label: 'Heading 6', value: 6, fontSize: '1rem' },
  ];
  const getCurrentHeading = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive('heading', { level })) {
        return `Heading ${level}`;
      }
    }
    return 'Normal text';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>{getCurrentHeading()}</span>
          <ChevronDownIcon className='size-4 ml-2 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1 max-h-96'>
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              (value === 0 && !editor?.getAttributes('heading').level) ||
                (editor?.isActive('heading', { level: value }) &&
                  'bg-neutral-200/80')
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Trebuchet MS', value: 'Trebuchet MS' },
    { label: 'Impact', value: 'Impact' },
    { label: 'Comic Sans MS', value: 'Comic Sans MS' },
    { label: 'Lucida Console', value: 'Lucida Console' },
    { label: 'Lucida Sans Unicode', value: 'Lucida Sans Unicode' },
    { label: 'Lucida Sans', value: 'Lucida Sans' },
    { label: 'Arial Black', value: 'Arial Black' },
    { label: 'Arial Narrow', value: 'Arial Narrow' },
    { label: 'Arial Rounded MT Bold', value: 'Arial Rounded MT Bold' },
    { label: 'Arial Unicode MS', value: 'Arial Unicode MS' },
    { label: 'Brush Script MT', value: 'Brush Script MT' },
    { label: 'Century Gothic', value: 'Century Gothic' },
    { label: 'Century Schoolbook', value: 'Century Schoolbook' },
    { label: 'Comic Sans MS', value: 'Comic Sans MS' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Garamond', value: 'Garamond' },
    { label: 'Palatino Linotype', value: 'Palatino Linotype' },
    { label: 'Tahoma', value: 'Tahoma' },
    { label: 'Trebuchet MS', value: 'Trebuchet MS' },
    { label: 'Calibri', value: 'Calibri' },
    { label: 'Cambria', value: 'Cambria' },
    { label: 'Candara', value: 'Candara' },
    { label: 'Consolas', value: 'Consolas' },
    { label: 'Constantia', value: 'Constantia' },
    { label: 'Corbel', value: 'Corbel' },
    { label: 'Ebrima', value: 'Ebrima' },
    { label: 'Franklin Gothic Medium', value: 'Franklin Gothic Medium' },
    { label: 'Garamond', value: 'Garamond' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Gill Sans', value: 'Gill Sans' },
    { label: 'Impact', value: 'Impact' },
    { label: 'Lucida Console', value: 'Lucida Console' },
    { label: 'Lucida Sans', value: 'Lucida Sans' },
    { label: 'Lucida Sans Unicode', value: 'Lucida Sans Unicode' },
    { label: 'Microsoft Sans Serif', value: 'Microsoft Sans Serif' },
    { label: 'Palatino Linotype', value: 'Palatino Linotype' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className='h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>
            {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
          </span>
          <ChevronDownIcon className='size-4 ml-2 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1 max-h-96'>
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.getAttributes('textStyle').fontFamily === value &&
                'bg-neutral-200/80'
            )}
            style={{ fontFamily: value }}
          >
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
  const { editor } = useEditorStore();

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
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck');
          editor?.view.dom.setAttribute(
            'spellcheck',
            current === 'true' ? 'false' : 'true'
          );
        },
      },
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline'),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: 'Comment',
        icon: MessageSquarePlusIcon,
        isActive: false, // TODO: Enable this functionality
        onClick: () => console.log('TODO: Add comment functionality'),
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        isActive: editor?.isActive('taskList'),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        onClick: () =>
          editor?.chain().focus().unsetAllMarks().clearNodes().run(),
      },
    ],
  ];

  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {sections[0].map((item) => (
        <TooolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <FontFamilyButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* //TODO: heading */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <HeadingLevelButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[1].map((item) => (
        <TooolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <TextColorButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <HighlightColorButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      {/* //TODO: line height */}
      {/* //TODO: List */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[2].map((item) => (
        <TooolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
