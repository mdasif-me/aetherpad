import { type Editor } from '@tiptap/react';
import { create } from 'zustand';

interface IEditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<IEditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));
