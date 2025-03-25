import { GraphQLError } from 'graphql';
import { getCompany } from './db/companies.js';
import { getJob, getJobs, getJobsByCompany } from './db/jobs.js';

export const resolvers = {
  Query: {
    company: async (_root, { id }) => {
        const company = await getCompany(id);
        if(!company) {
            throw notFoundError("No Company found with id"+id)
        }
        return company;
    },
    job: async (_root, { id }) => {
       const job = await getJob(id)
       if(!job) {
        throw notFoundError("No job found for if: "+id)
       }
       return job
    },
    jobs: () => getJobs()
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    date: (job) => toIsoDate(job.createdAt),
  },
};

function notFoundError(message) {
    throw new GraphQLError("No Company found with id " + id, {
        extensions: { code: 'NOT_FOUND'},
    });
}

function toIsoDate(value) {
  return value.slice(0, 'yyyy-mm-dd'.length); // only to displaye year, month and day
}
