import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';
import ImageSelector from '../../../../components/cms/ImageSelector';

interface Testimonial {
  id: number;
  clientName: string;
  clientPosition: string | null;
  clientCompany: string | null;
  clientImageId: number | null;
  testimonialText: string;
  rating: number | null;
  orderIndex: number;
  isFeatured: boolean;
  isActive: boolean;
  clientImage?: {
    filePath: string;
    altText: string;
  };
}

export default function TestimonialsManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [viewingTestimonial, setViewingTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      // Fetch all testimonials (including inactive) for CMS management
      const response = await api.get<Testimonial[]>('/testimonials', {
        params: { includeAll: 'true' }
      });
      if (response.success && response.data) {
        // Sort by orderIndex
        const allTestimonials = (response.data as Testimonial[]).sort((a, b) => a.orderIndex - b.orderIndex);
        setTestimonials(allTestimonials);
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (reordered: Testimonial[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reordered.length; i++) {
        await api.put(`/testimonials/${reordered[i].id}`, {
          ...reordered[i],
          orderIndex: i
        });
      }
      setTestimonials(reordered);
      alert('Order updated!');
    } catch (error: any) {
      alert(error.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (testimonial: Testimonial) => {
    setSaving(true);
    try {
      if (testimonial.id && testimonial.id > 0) {
        await api.put(`/testimonials/${testimonial.id}`, testimonial);
      } else {
        await api.post('/testimonials', { ...testimonial, orderIndex: testimonials.length });
      }
      setShowModal(false);
      setEditingTestimonial(null);
      fetchTestimonials();
      alert('Testimonial saved!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    setSaving(true);
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials(testimonials.filter(t => t.id !== id));
      alert('Testimonial deleted!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const getImageUrl = (testimonial: Testimonial): string => {
    if (!testimonial.clientImage) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${testimonial.clientImage.filePath}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Testimonials</h2>
            <p className="text-sm text-gray-600 mt-1">Manage customer testimonials</p>
          </div>
          <button onClick={() => { setEditingTestimonial({ id: 0, clientName: '', clientPosition: null, clientCompany: null, clientImageId: null, testimonialText: '', rating: null, orderIndex: testimonials.length, isFeatured: false, isActive: true }); setShowModal(true); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
            <i className="ri-add-line mr-2"></i>Add Testimonial
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <i className="ri-chat-quote-line text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-600 mb-4">No testimonials yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <i className="ri-information-line mr-1"></i>
              Drag and drop cards to reorder. Cards display 2 per view with auto-scrolling.
            </p>
            <span className="text-sm font-medium text-gray-700">
              Total: {testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''}
            </span>
          </div>
          <DragDropList
            items={testimonials}
            onReorder={handleReorder}
            keyExtractor={(t) => t.id}
            renderItem={(testimonial: Testimonial) => (
              <div className="flex items-start gap-4 w-full p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                {/* Order Badge */}
                <div className="flex-shrink-0 w-10 h-10 bg-[#FF6B35] text-white rounded-lg flex items-center justify-center font-bold">
                  {testimonial.orderIndex + 1}
                </div>
                
                {/* Card Preview */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-3">
                    {testimonial.clientImage ? (
                      <img 
                        src={getImageUrl(testimonial)} 
                        alt={testimonial.clientName} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0" 
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-bold text-sm">
                          {(testimonial.clientName || 'C').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{testimonial.clientName}</h4>
                      {testimonial.clientPosition && testimonial.clientCompany ? (
                        <p className="text-sm text-gray-600 truncate">{testimonial.clientPosition}, {testimonial.clientCompany}</p>
                      ) : testimonial.clientCompany ? (
                        <p className="text-sm text-gray-600 truncate">{testimonial.clientCompany}</p>
                      ) : testimonial.clientPosition ? (
                        <p className="text-sm text-gray-600 truncate">{testimonial.clientPosition}</p>
                      ) : null}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 italic">"{testimonial.testimonialText}"</p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {testimonial.isFeatured && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full" title="Featured">
                      <i className="ri-star-fill"></i>
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs rounded-full ${testimonial.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {testimonial.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button 
                    onClick={() => setViewingTestimonial(testimonial)} 
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                    title="View"
                  >
                    <i className="ri-eye-line"></i>
                  </button>
                  <button 
                    onClick={() => { setEditingTestimonial(testimonial); setShowModal(true); }} 
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                    title="Edit"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button 
                    onClick={() => handleDelete(testimonial.id)} 
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    title="Delete"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      )}

      {showModal && editingTestimonial && (
        <TestimonialModal testimonial={editingTestimonial} onSave={handleSave} onClose={() => { setShowModal(false); setEditingTestimonial(null); }} saving={saving} />
      )}

      {viewingTestimonial && (
        <TestimonialViewModal testimonial={viewingTestimonial} onClose={() => setViewingTestimonial(null)} onEdit={() => { setEditingTestimonial(viewingTestimonial); setViewingTestimonial(null); setShowModal(true); }} getImageUrl={getImageUrl} />
      )}
    </div>
  );
}

function TestimonialModal({ testimonial, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<Testimonial>(testimonial);
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
  
  return (
    <Modal isOpen={true} onClose={onClose} title={testimonial.id > 0 ? 'Edit Testimonial Card' : 'Add Testimonial Card'} size="xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Card Structure</h3>
            <p className="text-sm text-blue-700">
              Each testimonial card displays: Quote icon, testimonial text, client avatar, name, and affiliation.
            </p>
          </div>

          <FormField label="Testimonial Text" required>
            <textarea 
              value={formData.testimonialText} 
              onChange={(e) => setFormData({ ...formData, testimonialText: e.target.value })} 
              rows={6} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the testimonial quote text..."
            />
            <p className="text-xs text-gray-500 mt-1">This text will appear in white italic font on the orange card</p>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Client Name" required>
              <input 
                type="text" 
                value={formData.clientName} 
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Dr. John Doe"
              />
            </FormField>
            <FormField label="Client Position">
              <input 
                type="text" 
                value={formData.clientPosition || ''} 
                onChange={(e) => setFormData({ ...formData, clientPosition: e.target.value || null })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Surgeon"
              />
            </FormField>
          </div>

          <FormField label="Client Company / Affiliation">
            <input 
              type="text" 
              value={formData.clientCompany || ''} 
              onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value || null })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Hospital Name"
            />
            <p className="text-xs text-gray-500 mt-1">If position is provided, it will show as: "Position, Company"</p>
          </FormField>

          <FormField label="Client Avatar / Icon">
            <ImageSelector 
              value={formData.clientImageId} 
              onChange={(id) => setFormData({ ...formData, clientImageId: id as number | null })} 
              label="Upload Avatar Image" 
              aspectRatio="1/1"
              currentImage={formData.clientImage ? {
                filePath: formData.clientImage.filePath,
                fileName: formData.clientImage.altText
              } : null}
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a circular avatar/icon image. This will be displayed in a circular frame on the card.
            </p>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Order Position">
              <input 
                type="number" 
                min="0" 
                value={formData.orderIndex} 
                onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
            </FormField>
            <FormField label="Status">
              <select 
                value={formData.isActive ? 'active' : 'inactive'} 
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </FormField>
          </div>

          <div className="flex items-center gap-4">
            <FormField label="Featured">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.isFeatured} 
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} 
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Mark as featured</span>
              </label>
            </FormField>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sticky top-4">
            <h3 className="font-semibold text-gray-900 mb-4">Card Preview</h3>
            <div className="bg-[#FF6B35] p-6 rounded-lg text-white">
              <div className="mb-4">
                <i className="ri-double-quotes-l text-5xl text-white/50"></i>
              </div>
              <p className="text-white leading-relaxed mb-6 text-base italic min-h-[80px]">
                {formData.testimonialText || '"Your testimonial text will appear here..."'}
              </p>
              <div className="border-t border-white/30 pt-4 mt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {formData.clientImage?.filePath ? (
                      <img
                        src={`${baseUrl}${formData.clientImage.filePath}`}
                        alt={formData.clientName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/30 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {(formData.clientName || 'C').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {formData.clientName || 'Client Name'}
                    </h3>
                    {formData.clientPosition && formData.clientCompany ? (
                      <p className="text-sm text-white/90">
                        {formData.clientPosition}, {formData.clientCompany}
                      </p>
                    ) : formData.clientCompany ? (
                      <p className="text-sm text-white/90">{formData.clientCompany}</p>
                    ) : formData.clientPosition ? (
                      <p className="text-sm text-white/90">{formData.clientPosition}</p>
                    ) : (
                      <p className="text-sm text-white/60 italic">Position, Company</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p><strong>Card Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Orange background (#FF6B35)</li>
                <li>White quotation marks icon</li>
                <li>White italic testimonial text</li>
                <li>Circular avatar with fallback initial</li>
                <li>Client name in bold white</li>
                <li>Position and company below name</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
        <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">
          Cancel
        </button>
        <button 
          onClick={() => onSave(formData)} 
          disabled={saving || !formData.clientName || !formData.testimonialText} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Testimonial Card'}
        </button>
      </div>
    </Modal>
  );
}

function TestimonialViewModal({ testimonial, onClose, onEdit, getImageUrl }: any) {
  return (
    <Modal isOpen={true} onClose={onClose} title="Testimonial Details" size="lg">
      <div className="space-y-6">
        {testimonial.clientImage && (
          <div className="flex justify-center">
            <img src={getImageUrl(testimonial)} alt={testimonial.clientName} className="w-32 h-32 rounded-full object-cover" />
          </div>
        )}
        <div className="text-center">
          <h3 className="text-2xl font-medium text-gray-900 mb-2">{testimonial.clientName}</h3>
          {testimonial.clientPosition && <p className="text-gray-700">{testimonial.clientPosition}</p>}
          {testimonial.clientCompany && <p className="text-blue-600">{testimonial.clientCompany}</p>}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 italic text-lg">"{testimonial.testimonialText}"</p>
        </div>
        {testimonial.rating && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Rating:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`ri-star-${i < testimonial.rating! ? 'fill' : 'line'} text-yellow-400`}></i>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Close</button>
          <button onClick={onEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
            <i className="ri-edit-line mr-2"></i>Edit
          </button>
        </div>
      </div>
    </Modal>
  );
}

