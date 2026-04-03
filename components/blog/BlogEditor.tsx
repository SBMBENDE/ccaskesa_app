'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Link2, ImageIcon, Undo, Redo, Quote
} from 'lucide-react';

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
}

function ToolBtn({ action, active, title, children }: { action: () => void; active?: boolean; title: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={action}
      title={title}
      className={`p-1.5 rounded-lg transition-colors ${active ? 'bg-sky-100 dark:bg-sky-900/40 text-sky-600' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500'}`}
    >
      {children}
    </button>
  );
}

export default function BlogEditor({ content, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none min-h-[300px] focus:outline-none px-4 py-4',
      },
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-[#0d1f35]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <ToolBtn action={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><Bold size={14} /></ToolBtn>
        <ToolBtn action={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><Italic size={14} /></ToolBtn>
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
        <ToolBtn action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2"><Heading2 size={14} /></ToolBtn>
        <ToolBtn action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3"><Heading3 size={14} /></ToolBtn>
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
        <ToolBtn action={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List"><List size={14} /></ToolBtn>
        <ToolBtn action={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List"><ListOrdered size={14} /></ToolBtn>
        <ToolBtn action={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote"><Quote size={14} /></ToolBtn>
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
        <ToolBtn action={addLink} active={editor.isActive('link')} title="Insert Link"><Link2 size={14} /></ToolBtn>
        <ToolBtn action={addImage} active={false} title="Insert Image"><ImageIcon size={14} /></ToolBtn>
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
        <ToolBtn action={() => editor.chain().focus().undo().run()} title="Undo"><Undo size={14} /></ToolBtn>
        <ToolBtn action={() => editor.chain().focus().redo().run()} title="Redo"><Redo size={14} /></ToolBtn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
