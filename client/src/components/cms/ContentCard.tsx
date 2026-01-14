import { ReactNode } from 'react';

interface ContentCardProps {
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  children?: ReactNode;
  status?: 'active' | 'inactive';
}

export default function ContentCard({
  title,
  subtitle,
  image,
  imageAlt,
  onEdit,
  onView,
  onDelete,
  children,
  status = 'active'
}: ContentCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {image && (
        <div className="relative h-48 bg-gray-100">
          <img 
            src={image} 
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
          {status === 'inactive' && (
            <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">
              Inactive
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mb-3">{subtitle}</p>}
        
        {children && <div className="mb-3">{children}</div>}
        
        <div className="flex items-center space-x-2">
          {onView && (
            <button
              onClick={onView}
              className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium cursor-pointer"
            >
              <i className="ri-eye-line mr-2"></i>View
            </button>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium cursor-pointer"
            >
              <i className="ri-edit-line mr-2"></i>Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium cursor-pointer"
            >
              <i className="ri-delete-bin-line"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

