export const jobsReducerActionTypes = {
    SET_JOBS: 'SET_JOBS',
    ADD_JOB: 'ADD_JOB',
    EDIT_JOB: 'EDIT_JOB',
    DELETE_JOB: 'DELETE_JOB'
}

export const jobsReducer = (state, action) => {
    switch(action.type) {
        case jobsReducerActionTypes.SET_JOBS:
            return [
                ...action.payload
            ]
        case jobsReducerActionTypes.ADD_JOB:
            return [
                ...state,
                action.payload
            ]
        case jobsReducerActionTypes.EDIT_JOB:
            return [...state.map(job => {
                if(job.id === action.payload.id) {
                    return {...action.payload};
                }else {
                    return job;
                }
            })]
        case jobsReducerActionTypes.DELETE_JOB:
            console.log(action);
            return [...state.filter(job => job.id !== action.payload)];
        default:
            throw new Error("Something went wrong");
    }
}