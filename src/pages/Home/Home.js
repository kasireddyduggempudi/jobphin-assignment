import { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import JobCard from "../../components/Jobs/JobCard";
import CreateJobForm from "../../components/Jobs/CreateJobForm";
import { getAllJobs } from "../../services/jobsService";
import { JobsContext } from "../../state/context/JobsContext";
import { jobsReducerActionTypes } from "../../state/reducers/jobsReducer";
import Navbar from "../../components/Header/Navbar";
import Loader from "../../components/Loader/Loader";


const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const {jobsState, jobsDispatch} = useContext(JobsContext);
    const [isJobsLoading, setJobsLoading] = useState(false);

    useEffect(() => {
        setJobsLoading(true);
        getAllJobs()
        .then(jobs => {
            jobsDispatch({type: jobsReducerActionTypes.SET_JOBS, payload: jobs});
        }).catch(err => {
            console.log("something went wrong");
        }).finally(() => {
            setJobsLoading(false);
        })
    }, [])
    
    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }




    return (
        <>
            <Navbar />
            <div className="p-4">
                <div className="create-job-section pb-2 border-b-2">
                    <button className="bg-[#1597E4] px-[20px] py-[5px] text-white font-bold text-[20px] rounded-lg" onClick={openModal}>Create Job</button>
                </div>
                <div className="jobs-section mt-[20px]">
                    <h1 className="text-4xl font-bold text-[#1597E4] mb-2 text-center">Jobs Dashboard</h1>
                    <div className='bg-[#E6E6E6] p-[40px] flex flex-wrap gap-y-[40px] gap-x-[40px] justify-center'>

                        {
                            isJobsLoading &&  <Loader styles='w-8 h-8 border-t-4 border-blue-500' />
                        }

                        {
                            jobsState.map(job => {
                                return <JobCard jobId={job.id} key={job.id} />
                            })
                        }
                    </div>                
                </div>
                <div className="form-section mt-[20px]">
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <CreateJobForm closeModal={closeModal} />
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default Home;;