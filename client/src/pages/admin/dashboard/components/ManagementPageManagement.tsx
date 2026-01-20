import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';
import ImageSelector from '../../../../components/cms/ImageSelector';

interface Leader {
  id: number;
  fullName: string;
  position: string;
  department: string | null;
  bio: string | null;
  imageId: number | null;
  email: string | null;
  linkedinUrl: string | null;
  orderIndex: number;
  isActive: boolean;
  image?: {
    filePath: string;
    altText: string;
  };
}

export default function ManagementPageManagement() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showLeaderModal, setShowLeaderModal] = useState(false);
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null);
  const [viewingLeader, setViewingLeader] = useState<Leader | null>(null);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const response = await api.get<Leader[]>('/leaders');
      if (response.success && response.data) {
        setLeaders((response.data as Leader[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      console.error('Error fetching leaders:', error);
      alert(error.message || 'Failed to load leaders');
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (reorderedLeaders: Leader[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedLeaders.length; i++) {
        await api.put(`/leaders/${reorderedLeaders[i].id}`, {
          ...reorderedLeaders[i],
          orderIndex: i
        });
      }
      setLeaders(reorderedLeaders);
      alert('Leaders order updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLeader = async (leader: Leader) => {
    setSaving(true);
    try {
      if (leader.id && leader.id > 0) {
        await api.put(`/leaders/${leader.id}`, leader);
      } else {
        await api.post('/leaders', { ...leader, orderIndex: leaders.length });
      }
      setShowLeaderModal(false);
      setEditingLeader(null);
      fetchLeaders();
      alert('Leader saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save leader');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLeader = async (id: number) => {
    if (!confirm('Are you sure you want to delete this leader?')) return;
    setSaving(true);
    try {
      await api.delete(`/leaders/${id}`);
      setLeaders(leaders.filter(l => l.id !== id));
      alert('Leader deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete leader');
    } finally {
      setSaving(false);
    }
  };

  const getImageUrl = (leader: Leader): string => {
    if (!leader.image) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${leader.image.filePath}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Management Team</h2>
            <p className="text-sm text-gray-600 mt-1">Manage leadership team members</p>
          </div>
          <button
            onClick={() => {
              setEditingLeader({
                id: 0,
                fullName: '',
                position: '',
                department: null,
                bio: null,
                imageId: null,
                email: null,
                linkedinUrl: null,
                orderIndex: leaders.length,
                isActive: true
              });
              setShowLeaderModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>Add Leader
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
          <div className="flex-1">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Drag and drop leaders to reorder them on the management page.
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
          <p className="text-gray-600 mt-2">Loading leaders...</p>
        </div>
      ) : leaders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <i className="ri-team-line text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-600 mb-4">No leaders yet. Add your first team member!</p>
          <button
            onClick={() => {
              setEditingLeader({
                id: 0,
                fullName: '',
                position: '',
                department: null,
                bio: null,
                imageId: null,
                email: null,
                linkedinUrl: null,
                orderIndex: 0,
                isActive: true
              });
              setShowLeaderModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>Add Leader
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <DragDropList
            items={leaders}
            onReorder={handleReorder}
            keyExtractor={(leader) => leader.id}
            emptyMessage="No leaders yet. Click 'Add Leader' to get started!"
            renderItem={(leader: Leader) => (
              <div className="flex items-center space-x-4 w-full">
                {leader.image && (
                  <img
                    src={getImageUrl(leader)}
                    alt={leader.fullName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{leader.fullName}</h3>
                  <p className="text-sm text-gray-600">{leader.position}</p>
                  {leader.department && (
                    <p className="text-xs text-gray-500">{leader.department}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    leader.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {leader.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => setViewingLeader(leader)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                    title="View"
                  >
                    <i className="ri-eye-line"></i>
                  </button>
                  <button
                    onClick={() => {
                      setEditingLeader(leader);
                      setShowLeaderModal(true);
                    }}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                    title="Edit"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteLeader(leader.id)}
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

      {showLeaderModal && editingLeader && (
        <LeaderModal
          leader={editingLeader}
          onSave={handleSaveLeader}
          onClose={() => {
            setShowLeaderModal(false);
            setEditingLeader(null);
          }}
          saving={saving}
        />
      )}

      {viewingLeader && (
        <LeaderViewModal
          leader={viewingLeader}
          onClose={() => setViewingLeader(null)}
          onEdit={() => {
            setEditingLeader(viewingLeader);
            setViewingLeader(null);
            setShowLeaderModal(true);
          }}
          getImageUrl={getImageUrl}
        />
      )}
    </div>
  );
}

function LeaderModal({ leader, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<Leader>(leader);

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title={leader.id && leader.id > 0 ? 'Edit Leader' : 'Add New Leader'} 
      size="lg"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Full Name" required>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </FormField>

          <FormField label="Position" required>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="CEO"
            />
          </FormField>
        </div>

        <FormField label="Department">
          <input
            type="text"
            value={formData.department || ''}
            onChange={(e) => setFormData({ ...formData, department: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Executive"
          />
        </FormField>

        <FormField label="Bio">
          <textarea
            value={formData.bio || ''}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value || null })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter leader's biography"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Email">
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </FormField>

          <FormField label="LinkedIn URL">
            <input
              type="url"
              value={formData.linkedinUrl || ''}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </FormField>
        </div>

        <ImageSelector
          value={formData.imageId}
          onChange={(id) => setFormData({ ...formData, imageId: id })}
          label="Profile Photo"
          aspectRatio="1/1"
        />

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

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.fullName || !formData.position}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : leader.id && leader.id > 0 ? 'Update Leader' : 'Create Leader'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function LeaderViewModal({ leader, onClose, onEdit, getImageUrl }: any) {
  return (
    <Modal isOpen={true} onClose={onClose} title="Leader Details" size="lg">
      <div className="space-y-6">
        {leader.image && (
          <div className="flex justify-center">
            <img
              src={getImageUrl(leader)}
              alt={leader.fullName}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}

        <div className="text-center">
          <h3 className="text-2xl font-medium text-gray-900 mb-2">{leader.fullName}</h3>
          <p className="text-lg text-gray-700 mb-1">{leader.position}</p>
          {leader.department && (
            <p className="text-blue-600 font-medium">{leader.department}</p>
          )}
        </div>

        {leader.bio && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Biography</h4>
            <p className="text-gray-600">{leader.bio}</p>
          </div>
        )}

        <div className="space-y-2">
          {leader.email && (
            <div>
              <i className="ri-mail-line mr-2 text-gray-500"></i>
              <a href={`mailto:${leader.email}`} className="text-blue-600 hover:underline">
                {leader.email}
              </a>
            </div>
          )}
          {leader.linkedinUrl && (
            <div>
              <i className="ri-linkedin-line mr-2 text-gray-500"></i>
              <a
                href={leader.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
        </div>

        <div>
          <span className={`inline-block px-3 py-1 text-sm rounded-full ${
            leader.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {leader.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <i className="ri-edit-line mr-2"></i>Edit Leader
          </button>
        </div>
      </div>
    </Modal>
  );
}
