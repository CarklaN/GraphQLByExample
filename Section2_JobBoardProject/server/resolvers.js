import { getCompany } from './db/companies.js';
import { getJob, getJobs, getJobsByCompany } from './db/jobs.js';

export const resolvers = {
    Query: {
        company: (_root, { id }) => getCompany(id),
        job: (_root, { id }) => getJob(id),
        jobs: () => getJobs(),
    },
    Job: {
        date: (job) => toIsoDate(job.createdAt),
        company: (job) => getCompany(job.companyId)
    },
    Company: {
        jobs: (company) => getJobsByCompany(company.id),
    },
};

function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length) // only to displaye year, month and day
}
