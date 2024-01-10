import { useContext, useState } from 'react';
import netflix_logo from '../../assets/images/netflix_logo.png'
import { JobsContext } from '../../state/context/JobsContext';
import { jobsReducerActionTypes } from '../../state/reducers/jobsReducer';
import CreateJobForm from './CreateJobForm';
import Modal from '../Modal/Modal';
import { applyTypes } from '../../utils/Constants';
import { deleteJob } from '../../services/jobsService';
import Loader from '../Loader/Loader';

const JobCard = (props) => {
    const {jobId} = props;
    const {jobsState, jobsDispatch} = useContext(JobsContext);
    const [isEdit, setEdit] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const {
        jobTitle,
        companyName, 
        industry,
        location,
        remoteType,
        minExperience,
        maxExperience,
        minSalary,
        maxSalary,
        totalEmployeeCount,
        applyType,
    } = jobsState.find(job => job.id === jobId);

    const getExperience = (minExp, maxExp) => {
        if(!!minExp && !!maxExp) {
            return `${minExp} - ${maxExp} years`;
        }else if(!!minExp) {
            return `${minExp}+ years`;
        }else if(!!maxExp){
            return `0 - ${maxExp} years`
        }

        return 'Any';
    }

    const getSalary = (minSalary, maxSalary) => {
        if(!!minSalary && !!maxSalary) {
            return `INR ${minSalary} - ${maxSalary} / month`
        }else if(!!minSalary) {
            return `INR ${minSalary}+ / month`;
        }else if(!!maxSalary){
            return `INR up to ${maxSalary} / month`
        }

        return 'Salary - undisclosed';
    }

    const getLocation = (location, remoteType) => {
        if(!!location && !!remoteType) {
            return `${location} (${remoteType})`;
        }
        if(!!location) {
            return `${location}`;
        }
        if(!!remoteType) {
            return `${remoteType}`;
        }
        return "Anywhere";
    }

    const removeJob = () => {
        if(isDeleting) {
            return;
        }
        setDeleting(true);
        deleteJob(jobId)
        .then(data => {
            jobsDispatch({type: jobsReducerActionTypes.DELETE_JOB, payload: jobId})
        }).catch(err => {
            console.log('Something went wrong');
        }).finally(() => {
            setDeleting(false);
        })
        return;
    }

    const closeModal = () => {
        setEdit(false);
    }
    
    const editCard = () => {
        setEdit(true);
    }

    return (
        <>
        <div className='flex px-[24px] py-[16px] bg-white rounded-lg w-[100%] lg:max-w-[780px]' style={{gap: '8px', border: '1px solid #E6E6E6'}}>
            <div>
                <div style={{maxWidth: '50px'}}>
                    <img className='relative w-[100%] h-[50px] rounded' src={netflix_logo}  alt='Company Logo' />
                </div>
            </div>
            <div className='w-full'>
                <div className='space-y-1'>
                    <h3 className='text-xl'>{jobTitle}</h3>
                    <p className='text-lg font-large'>{`${companyName} - ${industry}`}</p>
                    <p className='text-lg font-light text-gray-500'>{getLocation(location, remoteType)}</p>
                </div>
                <div className='text-lg font-large space-y-[8px] mt-[24px]'>
                    <p>Part-Time (9.00 am - 5.00 pm IST)</p>
                    <p>Experience ({getExperience(minExperience, maxExperience)})</p>
                    <p>{getSalary(minSalary, maxSalary)}</p>
                    <p>{totalEmployeeCount || '0 - 2'} employees</p>
                </div>
                <div className='mt-[24px] flex'>
                    { 
                        applyType === applyTypes.EXTERNAL_APPLY
                        ? <button className='text-[#1597E4] px-4 py-2 rounded' style={{border: '1px solid #1597E4'}}>Apply External</button>
                        : <button className='text-white px-4 py-2 rounded' style={{backgroundColor: '#1597E4'}}>Apply Now</button>
                    }
                    <div className='ml-auto flex gap-x-2'>
                        <div className='cursor-pointer' onClick={editCard}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                        <div className='cursor-pointer' onClick={removeJob}>
                            {
                                isDeleting
                                ?
                                <Loader styles='w-8 h-8 border-t-4 border-blue-500' />
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal isOpen={isEdit} onClose={closeModal}>
            <CreateJobForm closeModal={closeModal} jobId={jobId} />
        </Modal>
        </>
    )
}

export default JobCard;