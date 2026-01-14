import { useState } from 'react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: string;
}

export default function ImageUploader({ value, onChange, label, aspectRatio = '16/9' }: ImageUploaderProps) {
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'gallery' | 'url'>('url');
  const [showGallery, setShowGallery] = useState(false);
  const [urlInput, setUrlInput] = useState(value);

  // Mock gallery images - In production, this would come from your media library
  const galleryImages = [
    'https://readdy.ai/api/search-image?query=modern%20medical%20equipment%20in%20a%20bright%20hospital%20setting%20with%20advanced%20technology%20and%20clean%20white%20environment&width=1200&height=675&seq=gallery1&orientation=landscape',
    'https://readdy.ai/api/search-image?query=professional%20healthcare%20team%20working%20with%20medical%20imaging%20equipment%20in%20a%20state-of-the-art%20facility&width=1200&height=675&seq=gallery2&orientation=landscape',
    'https://readdy.ai/api/search-image?query=high-tech%20x-ray%20machine%20in%20a%20modern%20radiology%20department%20with%20blue%20and%20white%20color%20scheme&width=1200&height=675&seq=gallery3&orientation=landscape',
    'https://readdy.ai/api/search-image?query=medical%20laboratory%20with%20advanced%20diagnostic%20equipment%20and%20professional%20lighting&width=1200&height=675&seq=gallery4&orientation=landscape',
    'https://readdy.ai/api/search-image?query=hospital%20corridor%20with%20modern%20medical%20equipment%20and%20clean%20professional%20environment&width=1200&height=675&seq=gallery5&orientation=landscape',
    'https://readdy.ai/api/search-image?query=medical%20imaging%20technology%20with%20digital%20displays%20and%20advanced%20healthcare%20equipment&width=1200&height=675&seq=gallery6&orientation=landscape'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, upload to your server/cloud storage
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    onChange(urlInput);
  };

  const handleGallerySelect = (imageUrl: string) => {
    onChange(imageUrl);
    setShowGallery(false);
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}

      {/* Upload Method Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setUploadMethod('upload')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            uploadMethod === 'upload'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <i className="ri-upload-2-line mr-2"></i>Upload
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod('gallery')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            uploadMethod === 'gallery'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <i className="ri-gallery-line mr-2"></i>Gallery
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod('url')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            uploadMethod === 'url'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <i className="ri-link mr-2"></i>URL
        </button>
      </div>

      {/* Upload Method Content */}
      <div className="mt-4">
        {uploadMethod === 'upload' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-2"></i>
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
            </label>
          </div>
        )}

        {uploadMethod === 'gallery' && (
          <div>
            <button
              type="button"
              onClick={() => setShowGallery(!showGallery)}
              className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-gallery-line mr-2"></i>
              {showGallery ? 'Hide Gallery' : 'Browse Gallery'}
            </button>
            
            {showGallery && (
              <div className="mt-4 grid grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2">
                {galleryImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => handleGallerySelect(img)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      value === img ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                    }`}
                  >
                    <div className="w-full h-32">
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {value === img && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        <i className="ri-check-line text-sm"></i>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {uploadMethod === 'url' && (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Image Preview */}
      {value && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
          <div className="relative rounded-lg overflow-hidden border border-gray-200" style={{ aspectRatio }}>
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
