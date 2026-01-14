import { useMemo, useState, useEffect } from 'react';
import FormField from './FormField';

interface RichTextEditorProps {
  value: string | null | undefined;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  height?: string;
}

let ReactQuillComponent: any = null;
let QuillStylesLoaded = false;

// Dynamically import ReactQuill
const loadQuill = async () => {
  if (ReactQuillComponent) return ReactQuillComponent;
  
  try {
    const ReactQuill = (await import('react-quill')).default;
    
    if (!QuillStylesLoaded) {
      await import('react-quill/dist/quill.snow.css');
      QuillStylesLoaded = true;
    }
    
    ReactQuillComponent = ReactQuill;
    return ReactQuillComponent;
  } catch (error) {
    console.error('Failed to load React Quill:', error);
    return null;
  }
};

export default function RichTextEditor({
  value,
  onChange,
  label,
  placeholder = 'Enter content...',
  height = '400px'
}: RichTextEditorProps) {
  const editorValue = value ?? '';
  const [isMounted, setIsMounted] = useState(false);
  const [quillReady, setQuillReady] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    loadQuill()
      .then((Quill) => {
        if (Quill) {
          setQuillReady(true);
        } else {
          setUseFallback(true);
        }
      })
      .catch(() => {
        setUseFallback(true);
      });
  }, []);

  const handleChange = (content: string) => {
    onChange(content || '');
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['link'],
        [{ color: [] }, { background: [] }],
        ['clean']
      ]
    }),
    []
  );

  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'align', 'link', 'color', 'background'
  ];

  if (!isMounted || (!quillReady && !useFallback)) {
    return (
      <FormField label={label}>
        <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-gray-500">Loading editor...</div>
        </div>
      </FormField>
    );
  }

  if (useFallback || !ReactQuillComponent) {
    return (
      <FormField label={label}>
        <textarea
          value={editorValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          style={{ height, minHeight: height }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={20}
        />
        <p className="text-xs text-gray-500 mt-1">
          <i className="ri-information-line mr-1"></i>
          Using plain text editor. You can paste HTML content here.
        </p>
      </FormField>
    );
  }

  const Quill = ReactQuillComponent;
  
  return (
    <FormField label={label}>
      <div style={{ height }}>
        <Quill
          theme="snow"
          value={editorValue}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{ height: `calc(${height} - 42px)` }}
        />
      </div>
    </FormField>
  );
}
