import { useMemo, useState, useEffect, useRef } from 'react';
import FormField from './FormField';
import { ErrorBoundary } from './ErrorBoundary';

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

// Fallback textarea component
function FallbackEditor({
  value,
  onChange,
  placeholder,
  height
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  height: string;
}) {
  return (
    <>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ height, minHeight: height }}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        rows={20}
      />
      <p className="text-xs text-gray-500 mt-1">
        <i className="ri-information-line mr-1"></i>
        Using plain text editor. You can paste HTML content here.
      </p>
    </>
  );
}

// ReactQuill wrapper component
function QuillEditor({
  value,
  onChange,
  modules,
  formats,
  placeholder,
  height,
  onError
}: {
  value: string;
  onChange: (value: string) => void;
  modules: any;
  formats: string[];
  placeholder: string;
  height: string;
  onError: () => void;
}) {
  const quillRef = useRef<any>(null);

  useEffect(() => {
    // Set up error handler
    const errorHandler = (event: ErrorEvent) => {
      if (event.message?.includes('quill') || event.message?.includes('ReactQuill')) {
        console.error('ReactQuill error detected:', event.error);
        onError();
      }
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, [onError]);

  if (!ReactQuillComponent) {
    return null;
  }

  const Quill = ReactQuillComponent;
  
  try {
    return (
      <Quill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: `calc(${height} - 42px)` }}
        bounds="self"
      />
    );
  } catch (error) {
    console.error('Error rendering ReactQuill:', error);
    onError();
    return null;
  }
}

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

  // Simplified toolbar configuration - this should work
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
      ],
      clipboard: {
        matchVisual: false
      }
    }),
    []
  );

  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'align', 'link', 'color', 'background',
    'script', 'code', 'code-block'
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
        <FallbackEditor
          value={editorValue}
          onChange={handleChange}
          placeholder={placeholder}
          height={height}
        />
      </FormField>
    );
  }

  return (
    <FormField label={label}>
      <div style={{ height }} className="rich-text-editor-wrapper">
        <ErrorBoundary
          fallback={
            <FallbackEditor
              value={editorValue}
              onChange={handleChange}
              placeholder={placeholder}
              height={height}
            />
          }
          onError={() => setUseFallback(true)}
        >
          <QuillEditor
            value={editorValue}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            height={height}
            onError={() => setUseFallback(true)}
          />
        </ErrorBoundary>
        <style>{`
          .rich-text-editor-wrapper .ql-toolbar {
            border: 1px solid #ccc;
            border-bottom: none;
            border-radius: 4px 4px 0 0;
            background: #fafafa;
            padding: 8px;
            display: flex !important;
            flex-wrap: wrap;
          }
          .rich-text-editor-wrapper .ql-toolbar .ql-formats {
            margin-right: 8px;
            display: inline-flex;
            align-items: center;
          }
          .rich-text-editor-wrapper .ql-toolbar button {
            width: 28px;
            height: 28px;
            padding: 3px 5px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .rich-text-editor-wrapper .ql-toolbar button:hover,
          .rich-text-editor-wrapper .ql-toolbar button.ql-active {
            background: #e6e6e6;
            border-radius: 3px;
          }
          .rich-text-editor-wrapper .ql-toolbar .ql-picker {
            display: inline-block;
            vertical-align: middle;
          }
          .rich-text-editor-wrapper .ql-toolbar .ql-picker-label {
            padding: 3px 5px;
            cursor: pointer;
          }
          .rich-text-editor-wrapper .ql-container {
            border: 1px solid #ccc;
            border-top: none;
            border-radius: 0 0 4px 4px;
            font-size: 14px;
          }
          .rich-text-editor-wrapper .ql-editor {
            min-height: 200px;
          }
          .rich-text-editor-wrapper .ql-editor.ql-blank::before {
            color: #999;
            font-style: normal;
          }
          /* Ensure color picker is visible and clickable */
          .rich-text-editor-wrapper .ql-color .ql-picker-label,
          .rich-text-editor-wrapper .ql-background .ql-picker-label {
            width: 28px;
            height: 28px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .rich-text-editor-wrapper .ql-color .ql-picker-label svg,
          .rich-text-editor-wrapper .ql-background .ql-picker-label svg {
            width: 18px;
            height: 18px;
          }
          .rich-text-editor-wrapper .ql-color .ql-picker-options,
          .rich-text-editor-wrapper .ql-background .ql-picker-options {
            display: none;
            position: absolute;
            z-index: 1000;
            background: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 5px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          }
          .rich-text-editor-wrapper .ql-color .ql-picker-label:hover + .ql-picker-options,
          .rich-text-editor-wrapper .ql-color .ql-picker-label:focus + .ql-picker-options,
          .rich-text-editor-wrapper .ql-background .ql-picker-label:hover + .ql-picker-options,
          .rich-text-editor-wrapper .ql-background .ql-picker-label:focus + .ql-picker-options {
            display: block;
          }
          /* Make sure buttons are clickable */
          .rich-text-editor-wrapper .ql-toolbar button,
          .rich-text-editor-wrapper .ql-toolbar .ql-picker-label {
            pointer-events: auto !important;
            cursor: pointer !important;
          }
        `}</style>
      </div>
    </FormField>
  );
}
