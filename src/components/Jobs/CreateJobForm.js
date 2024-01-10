import { useContext, useState } from "react";
import { formFields, applyTypes, jobCreationSteps } from "../../utils/Constants";
import { jobFormValidations } from "../../utils/Validations";
import { createJob, updateJob } from "../../services/jobsService";
import { JobsContext } from "../../state/context/JobsContext";
import { jobsReducerActionTypes } from "../../state/reducers/jobsReducer";
import Loader from "../Loader/Loader";

const CreateJobForm = ({jobId, closeModal}) => {
    const [creationStep, setCreationStep] = useState(jobCreationSteps.STEP_1)
    const [errors, setErrors] = useState({});

    const {jobsState, jobsDispatch} = useContext(JobsContext);
    const [jobDetails, setJobDetails] = useState(jobsState.find(job => job.id === jobId) || {});
    const [isSaving, setSaving] = useState(false);

    const changeCreationStep = () => {
        // do validation
        let mandatoryErrors = {};
        for(let fieldValidation of jobFormValidations) {
            if(fieldValidation.mandatory && !jobDetails[fieldValidation.field]) {
                mandatoryErrors[fieldValidation.field] = true;
            }
        }

        if(Object.keys(mandatoryErrors).length > 0) {
            setErrors({...mandatoryErrors});
            return ;
        }

        setCreationStep(jobCreationSteps.STEP_2);
    }
    
    const handleFormChange = (e, field) => {
        setJobDetails((previousJobDetails) => ({...previousJobDetails, [field]: e.target.value}));
    }

    const getJobPayload = () => {
        let jobPayload = JSON.parse(JSON.stringify(jobDetails));
        for(let formField of jobFormValidations) {
            if(formField.mandatory && !jobPayload[formField.field]) {
                throw new Error("Mandatory fields missing");
            }
            if(!formField.mandatory && !jobPayload[formField.field]) {
                jobPayload[formField.field] = formField.defaultValue;
            }
            if(formField.type === 'NUMBER' && !!jobPayload[formField.field]) {
                jobPayload[formField.field] = parseInt(jobPayload[formField.field]);
            }
        }
        return jobPayload;
    }

    const saveJob = () => {
        if(!!jobDetails.id) {
            editJob();
        }else {
            addJob();
        }
    }

    const addJob = () => {
        setSaving(true);
        createJob(getJobPayload(jobDetails))
        .then(data => {
            jobsDispatch({type: jobsReducerActionTypes.ADD_JOB, payload: data});
            closeModal();
        }).catch(err => {
            console.log("Something went wrong");
        }).finally(() => {
            setSaving(false);
        })
    }

    const editJob = () => {
        setSaving(true);
        updateJob(getJobPayload(jobDetails))
        .then(data => {
            jobsDispatch({type: jobsReducerActionTypes.EDIT_JOB, payload: data});
            closeModal();
        }).catch(err => {
            console.log("Something went wrong");
        }).finally(() => {
            setSaving(false);
        })
    }
    
    return (
        <>
        {
            creationStep === jobCreationSteps.STEP_1
            ?(
            <div className="flex flex-col gap-y-[24px] w-full">
                <div className="flex justify-between">
                    <div>
                        <h2 className="mb-6 font-medium text-mauve-12 text-lg">Create a Job</h2>
                    </div>
                    <div>
                    <h2 className="mb-6 font-medium text-mauve-12 text-lg">Step 1</h2>
                    </div>
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-fontDark text-sm">Job title*</label>
                    <div className="relative">
                        <input value={jobDetails[formFields.JOB_TITLE] || ''} onChange={(e) => handleFormChange(e, formFields.JOB_TITLE)} type="text" placeholder="ex. UX UI Designer" name="jobTitle"  className="border border-cardBorder rounded px-[12px] py-[8px] focus:outline-none focus:border-blue-500 relative w-full text-fontDark placeholder:text-fontGrey2 placeholder:font-normal"  />
                    </div>
                    {errors[formFields.JOB_TITLE] && <p className="text-[#D86161] text-500 text-xs italic">Please fill out this field.</p>}
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-fontDark text-sm">Company Name*</label>
                    <div className="relative">
                        <input  type="text" value={jobDetails[formFields.COMPANY_NAME] || ''} onChange={(e) => handleFormChange(e, formFields.COMPANY_NAME)} placeholder="ex. Google" name="companyName"  className="border border-cardBorder rounded px-[12px] py-[8px] focus:outline-none focus:border-blue-500 relative w-full text-fontDark placeholder:text-fontGrey2 placeholder:font-normal"  />
                    </div>
                    {errors[formFields.COMPANY_NAME] && <p className="text-[#D86161] text-500 text-xs italic">Please fill out this field.</p>}
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-fontDark text-sm">Industry*</label>
                    <div className="relative">
                        <input type="text" value={jobDetails[formFields.INDUSTRY] || ''} onChange={(e) => handleFormChange(e, formFields.INDUSTRY)} placeholder="ex. Information Technology" name="industry"  className="border border-cardBorder rounded px-[12px] py-[8px] focus:outline-none focus:border-blue-500 relative w-full text-fontDark placeholder:text-fontGrey2 placeholder:font-normal"  />
                    </div>
                    {errors[formFields.INDUSTRY] && <p className="text-[#D86161] text-500 text-xs italic">Please fill out this field.</p>}
                </div>
    
                <div className="flex flex-wrap gap-x-6">
                    <div className="w-full sm:flex-1 flex flex-col gap-y-1">
                        <label className="text-fontDark text-sm" htmlFor="location">Location</label>
                        <input  id="location" type="text" value={jobDetails[formFields.LOCATION] || ''} onChange={(e) => handleFormChange(e, formFields.LOCATION)} name="location" placeholder="ex. Chennai" className="border border-cardBorder rounded px-[12px] py-[8px] focus:outline-none focus:border-blue-500 relative w-full text-fontDark placeholder:text-fontGrey2 placeholder:font-normal" />
                        {errors[formFields.LOCATION] && <p className="text-[#D86161] text-500 text-xs italic">Please fill out this field.</p>}
                    </div>
                    <div className="w-full sm:flex-1 flex flex-col gap-y-1">
                        <label className="text-fontDark text-sm" htmlFor="remoteType">Remote type</label>
                        <input  id="remoteType" type="text" value={jobDetails[formFields.REMOTE_TYPE] || ''} onChange={(e) => handleFormChange(e, 'remoteType')} name="remoteType" placeholder="ex. In-Office" className="border border-cardBorder rounded px-[12px] py-[8px] focus:outline-none focus:border-blue-500 relative w-full text-fontDark placeholder:text-fontGrey2 placeholder:font-normal" />
                        {errors[formFields.REMOTE_TYPE] && <p className="text-[#D86161] text-500 text-xs italic">Please fill out this field.</p>}
                    </div>
                </div>
                <div className="flex mt-20">
                    <button className="ml-auto bg-[#1597E4] border-[#1597E4] border-500 text-lg border-4 text-white py-1 px-4 rounded-lg" type="button" onClick={() => changeCreationStep(jobCreationSteps.STEP_2)}>
                        Next
                    </button>
                </div>
            </div>
            ):(
            <div className="flex flex-col gap-y-[24px] w-full">
                <div className="flex justify-between">
                    <div>
                        <h2 className="mb-6 font-medium text-mauve-12 text-lg">Create a Job</h2>
                    </div>
                    <div>
                    <h2 className="mb-6 font-medium text-mauve-12 text-lg">Step 2</h2>
                    </div>
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-fontDark text-sm">Experience</label>
                    <div className="relative">
                        <div className="flex gap-x-6 flex-wrap gap-y-1">
                            <input type='number' value={jobDetails[formFields.MIN_EXPERIENCE] || ''} min={0} onChange={(e) => handleFormChange(e, 'minExperience')} placeholder="Minimum" name="minExperience"  className="w-full sm:flex-1 border border-cardBorder rounded px-[12px] py-[8px] focus:outline-none focus:border-blue-500 relative text-fontDark placeholder:text-fontGrey2 placeholder:font-normal"  />
                            <input type='number' value={jobDetails[formFields.MAX_EXPERIENCE] || ''} min={0} onChange={(e) => handleFormChange(e, 'maxExperience')} placeholder="Maximum" name="maxExperience"  className="w-full sm:flex-1 border border-cardBorder rounded px-[12px] py-[8px] focus:outline-none focus:border-blue-500 relative text-fontDark placeholder:text-fontGrey2 placeholder:font-normal"  />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-fontDark text-sm">Salary</label>
                    <div className="relative">
                        <div className="flex gap-x-6 flex-wrap gap-y-1">
                            <input type="number" value={jobDetails[formFields.MIN_SALARY] || ''} min={0} onChange={(e) => handleFormChange(e, 'minSalary')} placeholder="Minimum" name="minSalary"  className="w-full sm:flex-1 border border-cardBorder rounded px-[12px] py-[8px] focus:outline-none focus:border-blue-500 relative text-fontDark placeholder:text-fontGrey2 placeholder:font-normal"  />
                            <input type="number" value={jobDetails[formFields.MAX_SALARY] || ''} min={0} onChange={(e) => handleFormChange(e, 'maxSalary')} placeholder="Maximum" name="maxSalary"  className="w-full sm:flex-1 border border-cardBorder rounded px-[12px] py-[8px] focus:outline-none focus:border-blue-500 relative text-fontDark placeholder:text-fontGrey2 placeholder:font-normal"  />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-fontDark text-sm">Total employee</label>
                    <div className="relative">
                        <input type="text" value={jobDetails[formFields.TOTAL_EMPLOYEE_COUNT] || ''} onChange={(e) => handleFormChange(e, 'totalEmployeeCount')} placeholder="ex. 100" name="totalEmployeeCount"  className="w-full sm:flex-1 border border-cardBorder rounded px-[12px] py-[8px] focus:outline-none focus:border-blue-500 relative text-fontDark placeholder:text-fontGrey2 placeholder:font-normal"  />
                    </div>
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-fontDark text-sm">Apply type</label>
                    <div className="relative flex gap-x-4">
                        <div className="flex items-center mb-4">
                            <input id="quickApply" type="radio" checked={jobDetails[formFields.APPLY_TYPE] === applyTypes.QUICK_APPLY} onChange={(e) => handleFormChange(e, 'applyType')} value={applyTypes.QUICK_APPLY} name="applyType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="quickApply" className="text-fontDark text-sm ms-2">Quick Apply</label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input id="externalApply" type="radio" checked={jobDetails[formFields.APPLY_TYPE] === applyTypes.EXTERNAL_APPLY} onChange={(e) => handleFormChange(e, 'applyType')} value={applyTypes.EXTERNAL_APPLY} name="applyType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="externalApply" className="text-fontDark text-sm ms-2">External Apply</label>
                        </div>
                    </div>
                </div>
                <div className="flex mt-20">
                    <button onClick={saveJob} className="ml-auto bg-[#1597E4] border-[#1597E4] border-500 text-lg border-4 text-white py-1 px-4 rounded-lg " type="button" disabled={isSaving}>
                        {
                        isSaving ? 
                        <Loader styles='w-8 h-8 border-t-4 border-white-500' />
                        : 'Save'
                        }
                    </button>
                </div>
            </div>
            )
        }
        </>
    )
}

export default CreateJobForm;