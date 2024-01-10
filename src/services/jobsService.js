import api from './api';

const JOBS_API_ENDPOINT = "/api/v1/jobs";


export const getAllJobs = async () => {
    let jobs  = [];
    try {
        jobs = (await api.get(JOBS_API_ENDPOINT)).data;
    }catch(error) {
        throw new Error(error);
    }

    return jobs;
}

export const createJob = async (payload) => {
    let jobDetails = {};
    try {
        jobDetails = (await api.post(JOBS_API_ENDPOINT, payload)).data;
    }catch(error) {
        throw new Error(error);
    }

    return jobDetails;
}

export const updateJob = async (payload) => {
    let jobDetails = {};
    try {
        jobDetails = (await api.put(JOBS_API_ENDPOINT + `/${payload.id}`, payload)).data;
    }catch(error) {
        throw new Error(error);
    }

    return jobDetails;
}

export const deleteJob = async (jobId) => {
    let deletedJobDetails = {};
    try {
        deletedJobDetails = (await api.delete(JOBS_API_ENDPOINT + `/${jobId}`)).data
    }catch(error) {
        throw new Error(error);
    }

    return deletedJobDetails;
}