const { CareersPageContent, Job, Media } = require('../models');
const status = require('../helpers/response');

const findSingle = async (include = []) => {
  return await CareersPageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'introImage' },
      { model: Media, as: 'lifeAtAdonisBackgroundImage' },
      { model: Media, as: 'lifeAtAdonisImage' }
    ]);
    if (!content) {
      return status.notFoundResponse(res, "Careers page content not found");
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Careers Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) {
      return status.notFoundResponse(res, "Careers page content not found");
    }
    await content.update(req.body);
    const updated = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'introImage' },
      { model: Media, as: 'lifeAtAdonisBackgroundImage' },
      { model: Media, as: 'lifeAtAdonisImage' }
    ]);
    return status.successResponse(res, "Careers page updated", updated);
  } catch (error) {
    console.error('Update Careers Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { isActive: true },
      order: [['posted_date', 'DESC']]
    });
    return status.successResponse(res, "Retrieved", jobs);
  } catch (error) {
    console.error('Get Jobs Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    return status.createdResponse(res, "Job created", job);
  } catch (error) {
    console.error('Create Job Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return status.notFoundResponse(res, "Job not found");
    }
    await job.update(req.body);
    return status.successResponse(res, "Job updated", job);
  } catch (error) {
    console.error('Update Job Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return status.notFoundResponse(res, "Job not found");
    }
    await job.destroy();
    return status.successResponse(res, "Job deleted");
  } catch (error) {
    console.error('Delete Job Error:', error);
    return status.errorResponse(res, error.message);
  }
};

