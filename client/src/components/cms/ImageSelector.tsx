import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { getImageUrl, getDefaultImageUrl } from '../../utils/imageUrl';

interface ImageSelectorProps {
  value: number | string | null; // Can be mediaId (number) or URL (string)
  onChange: (value: number | string | null) => void;
  label?: string;
  required?: boolean;
  aspectRatio?: string;
  currentImage?: { filePath: string; fileName?: string } | null; // Pre-loaded image data from backend
}

type InputMode = 'upload' | 'gallery' | 'url' | null;

export default function ImageSelector({ 
  value, 
  onChange, 
  label = 'Image',
  required = false,
  aspectRatio = '16/9',
  currentImage = null
}: ImageSelectorProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<InputMode>(null);
  const [urlInput, setUrlInput] = useState('');
  const [gallery, setGallery] = useState<any[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryPage, setGalleryPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);

  // Determine if value is a mediaId (number) or URL (string)
  const isMediaId = typeof value === 'number';
  const isUrl = typeof value === 'string' && (value.startsWith('http') || value.startsWith('/uploads'));

  // Fetch gallery on mount and when page changes
  useEffect(() => {
    if (inputMode === 'gallery') {
      fetchGallery();
    }
  }, [inputMode, galleryPage]);

  // Update preview when value or currentImage changes
  useEffect(() => {
    // If we have pre-loaded image data, use it immediately
    if (currentImage && currentImage.filePath && isMediaId && value) {
      const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
      setPreview(`${baseUrl}${currentImage.filePath}`);
      setSelectedMedia({
        id: value,
        fileName: currentImage.fileName || '',
        filePath: currentImage.filePath
      });
    } else if (isMediaId && value) {
      fetchMediaPreview(value);
    } else if (isUrl && value) {
      setPreview(value.startsWith('http') ? value : getDefaultImageUrl(value.replace('/uploads/', '')));
    } else {
      setPreview(null);
      setSelectedMedia(null);
    }
  }, [value, currentImage]);

  const fetchMediaPreview = async (mediaId: number) => {
    try {
      const response = await api.get(`/media/${mediaId}`);
      if (response.success && response.data) {
        const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
        setPreview(`${baseUrl}${response.data.filePath}`);
        setSelectedMedia(response.data);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const fetchGallery = async () => {
    setLoadingGallery(true);
    try {
      const response = await api.get(`/media?fileType=image&page=${galleryPage}&limit=20`);
      if (response.success && response.data) {
        setGallery(response.data.media || []);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      alert('Failed to load gallery. Please try again.');
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL?.replace('/api/v1', '')}/api/v1/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token || ''}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.success && data.mediaId) {
        onChange(data.mediaId);
        const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
        setPreview(`${baseUrl}${data.imageUrl}`);
        setInputMode(null);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSelectFromGallery = (media: any) => {
    onChange(media.id);
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    setPreview(`${baseUrl}${media.filePath}`);
    setSelectedMedia(media);
    setInputMode(null);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      // If it's a full URL, store as string
      // If it's a relative path like /uploads/2025/05/file.jpg, store as string
      onChange(urlInput.trim());
      setPreview(urlInput.startsWith('http') ? urlInput : getDefaultImageUrl(urlInput.replace('/uploads/', '')));
      setUrlInput('');
      setInputMode(null);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    setSelectedMedia(null);
    setInputMode(null);
  };

  const getPreviewUrl = () => {
    if (preview) return preview;
    if (isMediaId && value) {
      return `${import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002'}/placeholder`;
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Preview */}
      {getPreviewUrl() && (
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="relative group">
            <img 
              src={getPreviewUrl() || ''}
              alt="Preview"
              className={`w-full rounded-lg object-cover ${aspectRatio === '16/9' ? 'aspect-video' : aspectRatio === '1/1' ? 'aspect-square' : ''}`}
              style={{ maxHeight: '300px' }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                <button
                  onClick={() => setInputMode(null)}
                  className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <i className="ri-edit-line mr-2"></i>Change
                </button>
                <button
                  onClick={handleRemove}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                >
                  <i className="ri-delete-bin-line mr-2"></i>Remove
                </button>
              </div>
            </div>
          </div>
          {selectedMedia && (
            <p className="mt-2 text-xs text-gray-500">
              {selectedMedia.fileName}
            </p>
          )}
        </div>
      )}

      {/* Input Mode Selection */}
      {!getPreviewUrl() || inputMode !== null ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          {!inputMode ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-4">Select image source:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setInputMode('upload')}
                  className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer flex items-center justify-center"
                >
                  <i className="ri-upload-2-line mr-2"></i>Upload
                </button>
                <button
                  onClick={() => setInputMode('gallery')}
                  className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer flex items-center justify-center"
                >
                  <i className="ri-image-line mr-2"></i>Gallery
                </button>
                <button
                  onClick={() => setInputMode('url')}
                  className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer flex items-center justify-center"
                >
                  <i className="ri-links-line mr-2"></i>URL
                </button>
              </div>
              <button
                onClick={() => setInputMode(null)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : inputMode === 'upload' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Upload New Image</h4>
                <button
                  onClick={() => setInputMode(null)}
                  className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {uploading && (
                <div className="text-sm text-blue-600">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>Uploading...
                </div>
              )}
            </div>
          ) : inputMode === 'gallery' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Choose from Gallery</h4>
                <button
                  onClick={() => setInputMode(null)}
                  className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
              {loadingGallery ? (
                <div className="text-center py-8">
                  <i className="ri-loader-4-line animate-spin text-2xl text-gray-400"></i>
                  <p className="text-sm text-gray-500 mt-2">Loading gallery...</p>
                </div>
              ) : gallery.length === 0 ? (
                <div className="text-center py-8 text-sm text-gray-500">
                  No images in gallery
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                  {gallery.map((media) => {
                    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
                    const mediaUrl = `${baseUrl}${media.filePath}`;
                    return (
                      <div
                        key={media.id}
                        onClick={() => handleSelectFromGallery(media)}
                        className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 ${
                          selectedMedia?.id === media.id ? 'border-blue-500' : 'border-gray-200'
                        } hover:border-blue-300`}
                      >
                        <img
                          src={mediaUrl}
                          alt={media.fileName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : inputMode === 'url' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Enter Image URL</h4>
                <button
                  onClick={() => setInputMode(null)}
                  className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/image.jpg or /uploads/2025/05/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleUrlSubmit}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer"
                  >
                    Use URL
                  </button>
                  {urlInput && (
                    <div className="flex-1 border border-gray-200 rounded-lg p-2">
                      <img
                        src={urlInput.startsWith('http') ? urlInput : getDefaultImageUrl(urlInput.replace('/uploads/', ''))}
                        alt="Preview"
                        className="w-full h-20 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Supports local paths (/uploads/YYYY/MM/filename.jpg) or external URLs (https://...)
                </p>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={() => setInputMode(null)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
          >
            <i className="ri-edit-line mr-2"></i>Change Image
          </button>
        </div>
      )}
    </div>
  );
}
