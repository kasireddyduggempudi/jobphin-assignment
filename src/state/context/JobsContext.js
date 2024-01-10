import { createContext, useReducer } from "react";
import {jobsReducer} from '../reducers/jobsReducer';

const initialJobsState = [];

export const JobsContext = createContext();



const JobsContextProvider = ({children}) => {
    const [jobsState, jobsDispatch] = useReducer(jobsReducer, initialJobsState);

    return (
        <JobsContext.Provider value={{jobsState, jobsDispatch}}>
            {children}
        </JobsContext.Provider>
    )
}

export  default JobsContextProvider;