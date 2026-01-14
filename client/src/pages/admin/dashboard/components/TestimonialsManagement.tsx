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
      const response = await api.get<Testimonial[]>('/testimonials');
      if (response.success && response.data) {
        setTestimonials((response.data as Testimonial[]).sort((a, b) => a.orderIndex - b.orderIndex));
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
            <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
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
          <DragDropList
            items={testimonials}
            onReorder={handleReorder}
            keyExtractor={(t) => t.id}
            renderItem={(testimonial: Testimonial) => (
              <div className="flex items-center space-x-4 w-full">
                {testimonial.clientImage && <img src={getImageUrl(testimonial)} alt={testimonial.clientName} className="w-16 h-16 rounded-full object-cover" />}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{testimonial.clientName}</h4>
                  {testimonial.clientCompany && <p className="text-sm text-gray-600">{testimonial.clientCompany}</p>}
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">"{testimonial.testimonialText}"</p>
                </div>
                <div className="flex items-center space-x-2">
                  {testimonial.isFeatured && <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Featured</span>}
                  <span className={`px-2 py-1 text-xs rounded-full ${testimonial.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {testimonial.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button onClick={() => setViewingTestimonial(testimonial)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer">
                    <i className="ri-eye-line"></i>
                  </button>
                  <button onClick={() => { setEditingTestimonial(testimonial); setShowModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer">
                    <i className="ri-edit-line"></i>
                  </button>
                  <button onClick={() => handleDelete(testimonial.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
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
  return (
    <Modal isOpen={true} onClose={onClose} title={testimonial.id > 0 ? 'Edit Testimonial' : 'Add Testimonial'} size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Client Name" required><input type="text" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
          <FormField label="Client Position"><input type="text" value={formData.clientPosition || ''} onChange={(e) => setFormData({ ...formData, clientPosition: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
        </div>
        <FormField label="Client Company"><input type="text" value={formData.clientCompany || ''} onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
        <FormField label="Testimonial Text" required><textarea value={formData.testimonialText} onChange={(e) => setFormData({ ...formData, testimonialText: e.target.value })} rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Rating (1-5)">
            <input type="number" min="1" max="5" value={formData.rating || ''} onChange={(e) => setFormData({ ...formData, rating: e.target.value ? parseInt(e.target.value) : null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </FormField>
          <div className="space-y-4">
            <FormField label="Featured">
              <select value={formData.isFeatured ? 'yes' : 'no'} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.value === 'yes' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </FormField>
            <FormField label="Status">
              <select value={formData.isActive ? 'active' : 'inactive'} onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </FormField>
          </div>
        </div>
        <ImageSelector value={formData.clientImageId} onChange={(id) => setFormData({ ...formData, clientImageId: id })} label="Client Photo" aspectRatio="1/1" />
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.clientName || !formData.testimonialText} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
        </div>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{testimonial.clientName}</h3>
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

