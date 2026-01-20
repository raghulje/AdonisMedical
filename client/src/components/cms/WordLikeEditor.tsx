import { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import FormField from './FormField';

interface WordLikeEditorProps {
  value: string | null | undefined;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  height?: string;
}

export default function WordLikeEditor({
  value,
  onChange,
  label,
  placeholder = 'Enter content...',
  height = '600px'
}: WordLikeEditorProps) {
  const editorRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const editorValue = value ?? '';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  if (!isMounted) {
    return (
      <FormField label={label}>
        <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-gray-500">Loading Word-like editor...</div>
        </div>
      </FormField>
    );
  }

  return (
    <FormField label={label}>
      <div style={{ height }} className="word-like-editor-wrapper">
        <Editor
          apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc" // Free TinyMCE API key for development
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          value={editorValue}
          onEditorChange={handleEditorChange}
          init={{
            height: parseInt(height) || 600,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic underline strikethrough | forecolor backcolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | ' +
              'removeformat | help',
            toolbar_mode: 'sliding',
            content_style: 'body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.5; margin: 8px; }',
            skin: 'oxide',
            content_css: 'default',
            branding: false,
            promotion: false,
            placeholder: placeholder,
            // Word-like behavior - preserve formatting when pasting
            paste_as_text: false,
            paste_data_images: true,
            paste_auto_cleanup_on_paste: false,
            paste_remove_styles_if_webkit: false,
            paste_strip_class_attributes: 'none',
            paste_retain_style_properties: 'all',
            // Better formatting options
            font_formats: 'Arial=arial,helvetica,sans-serif; Calibri=calibri,sans-serif; Times New Roman=times new roman,times; Courier New=courier new,courier; Verdana=verdana,geneva;',
            font_size_formats: '8pt 10pt 11pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
            // Word-like shortcuts (these work by default in TinyMCE)
            // Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline
          }}
        />
        <style>{`
          .word-like-editor-wrapper {
            border: 1px solid #d1d5db;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .word-like-editor-wrapper .tox-tinymce {
            border: none !important;
          }
          .word-like-editor-wrapper .tox-toolbar {
            background: #f9fafb !important;
            border-bottom: 1px solid #e5e7eb !important;
          }
          .word-like-editor-wrapper .tox-edit-area {
            background: white !important;
          }
          .word-like-editor-wrapper .tox-edit-area__iframe {
            background: white !important;
          }
          .word-like-editor-wrapper .tox-menubar {
            background: #f9fafb !important;
            border-bottom: 1px solid #e5e7eb !important;
          }
        `}</style>
      </div>
      <div className="mt-2 text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded p-2">
        <i className="ri-microsoft-line mr-1"></i>
        <strong>Word-like Editor:</strong> Works just like Microsoft Word! 
        Use toolbar buttons or keyboard shortcuts (<kbd className="px-1 py-0.5 bg-white rounded text-xs border">Ctrl+B</kbd> for Bold, 
        <kbd className="px-1 py-0.5 bg-white rounded text-xs border">Ctrl+I</kbd> for Italic, 
        <kbd className="px-1 py-0.5 bg-white rounded text-xs border">Ctrl+U</kbd> for Underline). 
        Paste content from Word and all formatting will be preserved automatically.
      </div>
    </FormField>
  );
}
