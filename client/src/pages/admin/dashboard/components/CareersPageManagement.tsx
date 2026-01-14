import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import ImageSelector from '../../../../components/cms/ImageSelector';

type TabType = 'content' | 'jobs';

interface CareersPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  introImageId: number | null;
  lifeAtAdonisTitle: string | null;
  lifeAtAdonisBackgroundImageId: number | null;
  lifeAtAdonisImageId: number | null;
  heroImage?: { filePath: string };
  introImage?: { filePath: string };
  lifeAtAdonisBackgroundImage?: { filePath: string };
  lifeAtAdonisImage?: { filePath: string };
}

interface Job {
  id: number;
  title: string;
  department: string | null;
  location: string | null;
  employmentType: string | null;
  description: string | null;
  requirements: string | null;
  responsibilities: string | null;
  salaryRange: string | null;
  isActive: boolean;
  postedDate: string | null;
}

export default function CareersPageManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Page Content
  const [pageContent, setPageContent] = useState<CareersPageContent>({
    heroTitle: null,
    heroSubtitle: null,
    heroImageId: null,
    introText: null,
    introImageId: null,
    lifeAtAdonisTitle: null,
    lifeAtAdonisBackgroundImageId: null,
    lifeAtAdonisImageId: null
  });

  // Jobs
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);

  useEffect(() => {
    if (activeTab === 'content') {
      fetchPageContent();
    } else {
      fetchJobs();
    }
  }, [activeTab]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<CareersPageContent>('/careers');
      if (response.success && response.data) {
        setPageContent(response.data as CareersPageContent);
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await api.get<Job[]>('/careers/jobs');
      if (response.success && response.data) {
        setJobs(response.data as Job[]);
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePageContent = async () => {
    setSaving(true);
    try {
      const response = await api.put('/careers', pageContent);
      if (response.success) {
        alert('Page content saved successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveJob = async (job: Job) => {
    setSaving(true);
    try {
      if (job.id && job.id > 0) {
        await api.put(`/careers/jobs/${job.id}`, job);
      } else {
        await api.post('/careers/jobs', { ...job, postedDate: new Date().toISOString() });
      }
      setShowJobModal(false);
      setEditingJob(null);
      fetchJobs();
      alert('Job saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save job');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    setSaving(true);
    try {
      await api.delete(`/careers/jobs/${id}`);
      setJobs(jobs.filter(j => j.id !== id));
      alert('Job deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900">Careers Page Management</h2>
        <p className="text-sm text-gray-600 mt-1">Manage careers page content and job listings</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${
                activeTab === 'content'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-blue-600'
              }`}
            >
              Page Content
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${
                activeTab === 'jobs'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-blue-600'
              }`}
            >
              Job Listings
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
              <p className="text-gray-600 mt-2">Loading...</p>
            </div>
          ) : activeTab === 'content' ? (
            <PageContentEditor
              content={pageContent}
              onChange={setPageContent}
              onSave={handleSavePageContent}
              saving={saving}
            />
          ) : (
            <JobsListEditor
              jobs={jobs}
              onAdd={() => {
                setEditingJob({
                  id: 0,
                  title: '',
                  department: null,
                  location: null,
                  employmentType: null,
                  description: null,
                  requirements: null,
                  responsibilities: null,
                  salaryRange: null,
                  isActive: true,
                  postedDate: null
                });
                setShowJobModal(true);
              }}
              onEdit={(job) => {
                setEditingJob(job);
                setShowJobModal(true);
              }}
              onView={setViewingJob}
              onDelete={handleDeleteJob}
            />
          )}
        </div>
      </div>

      {showJobModal && editingJob && (
        <JobModal
          job={editingJob}
          onSave={handleSaveJob}
          onClose={() => {
            setShowJobModal(false);
            setEditingJob(null);
          }}
          saving={saving}
        />
      )}

      {viewingJob && (
        <JobViewModal
          job={viewingJob}
          onClose={() => setViewingJob(null)}
          onEdit={() => {
            setEditingJob(viewingJob);
            setViewingJob(null);
            setShowJobModal(true);
          }}
        />
      )}
    </div>
  );
}

function PageContentEditor({ content, onChange, onSave, saving }: any) {
  const getImageUrl = (image: any): string => {
    if (!image) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${image.filePath}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Page Content</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Hero Title">
          <input
            type="text"
            value={content.heroTitle || ''}
            onChange={(e) => onChange({ ...content, heroTitle: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField label="Hero Subtitle">
          <input
            type="text"
            value={content.heroSubtitle || ''}
            onChange={(e) => onChange({ ...content, heroSubtitle: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <div className="md:col-span-2">
          <ImageSelector
            value={content.heroImageId}
            onChange={(id) => onChange({ ...content, heroImageId: id })}
            label="Hero Image"
          />
        </div>

        <div className="md:col-span-2">
          <FormField label="Intro Text">
            <textarea
              value={content.introText || ''}
              onChange={(e) => onChange({ ...content, introText: e.target.value || null })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
        </div>

        <ImageSelector
          value={content.introImageId}
          onChange={(id) => onChange({ ...content, introImageId: id })}
          label="Intro Image"
        />
      </div>

      {/* Life at Adonis Medical Section */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Life at Adonis Medical Section</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormField label="Title">
              <input
                type="text"
                value={content.lifeAtAdonisTitle || ''}
                onChange={(e) => onChange({ ...content, lifeAtAdonisTitle: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Life at Adonis Medical"
              />
            </FormField>
          </div>

          <div className="md:col-span-2">
            <ImageSelector
              value={content.lifeAtAdonisBackgroundImageId}
              onChange={(id) => onChange({ ...content, lifeAtAdonisBackgroundImageId: id })}
              label="Background Image"
            />
          </div>

          <div className="md:col-span-2">
            <ImageSelector
              value={content.lifeAtAdonisImageId}
              onChange={(id) => onChange({ ...content, lifeAtAdonisImageId: id })}
              label="Section Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function JobsListEditor({ jobs, onAdd, onEdit, onView, onDelete }: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Job Listings</h3>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>Add Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <i className="ri-briefcase-line text-4xl text-gray-400 mb-2"></i>
          <p className="text-gray-500">No jobs yet. Add your first job!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job: Job) => (
            <div key={job.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{job.title}</h4>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                    {job.department && <span><i className="ri-building-line mr-1"></i>{job.department}</span>}
                    {job.location && <span><i className="ri-map-pin-line mr-1"></i>{job.location}</span>}
                    {job.employmentType && <span><i className="ri-time-line mr-1"></i>{job.employmentType}</span>}
                  </div>
                  {job.postedDate && (
                    <p className="text-xs text-gray-500 mt-2">
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    job.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {job.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => onView(job)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                  >
                    <i className="ri-eye-line"></i>
                  </button>
                  <button
                    onClick={() => onEdit(job)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => onDelete(job.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function JobModal({ job, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<Job>(job);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={job.id && job.id > 0 ? 'Edit Job' : 'Add New Job'}
      size="xl"
    >
      <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Job Title" required>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <FormField label="Department">
            <input
              type="text"
              value={formData.department || ''}
              onChange={(e) => setFormData({ ...formData, department: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <FormField label="Location">
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <FormField label="Employment Type">
            <select
              value={formData.employmentType || ''}
              onChange={(e) => setFormData({ ...formData, employmentType: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </FormField>

          <FormField label="Salary Range">
            <input
              type="text"
              value={formData.salaryRange || ''}
              onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., $50,000 - $70,000"
            />
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

        <FormField label="Job Description">
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value || null })}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField label="Requirements">
          <textarea
            value={formData.requirements || ''}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value || null })}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField label="Responsibilities">
          <textarea
            value={formData.responsibilities || ''}
            onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value || null })}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
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
            disabled={saving || !formData.title}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : job.id && job.id > 0 ? 'Update Job' : 'Create Job'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function JobViewModal({ job, onClose, onEdit }: any) {
  return (
    <Modal isOpen={true} onClose={onClose} title="Job Details" size="lg">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{job.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            {job.department && <span><i className="ri-building-line mr-1"></i>{job.department}</span>}
            {job.location && <span><i className="ri-map-pin-line mr-1"></i>{job.location}</span>}
            {job.employmentType && <span><i className="ri-time-line mr-1"></i>{job.employmentType}</span>}
            {job.salaryRange && <span><i className="ri-money-dollar-circle-line mr-1"></i>{job.salaryRange}</span>}
          </div>
          {job.postedDate && (
            <p className="text-sm text-gray-500">
              Posted: {new Date(job.postedDate).toLocaleDateString()}
            </p>
          )}
        </div>

        {job.description && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
          </div>
        )}

        {job.requirements && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{job.requirements}</p>
          </div>
        )}

        {job.responsibilities && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Responsibilities</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{job.responsibilities}</p>
          </div>
        )}

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
            <i className="ri-edit-line mr-2"></i>Edit Job
          </button>
        </div>
      </div>
    </Modal>
  );
}
