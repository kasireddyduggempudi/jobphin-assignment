import { formFields } from "./Constants"

export const jobFormValidations = [
    {
        field: formFields.JOB_TITLE,
        mandatory: true,
        type: 'STRING'
    },
    {
        field: formFields.COMPANY_NAME,
        mandatory: true,
        type: 'STRING'
    },
    {
        field: formFields.INDUSTRY,
        mandatory: true,
        type: 'STRING'
    },
    {
        field: formFields.LOCATION,
        mandatory: false,
        type: 'STRING'
    },
    {
        field: formFields.REMOTE_TYPE,
        mandatory: false,
        type: 'STRING'
    },
    {
        field: formFields.MIN_EXPERIENCE,
        mandatory: false,
        type: 'NUMBER'
    },
    {
        field: formFields.MAX_EXPERIENCE,
        mandatory: false,
        type: 'NUMBER'
    },
    {
        field: formFields.MAX_EXPERIENCE,
        mandatory: false,
        type: 'NUMBER'
    },
    {
        field: formFields.MIN_SALARY,
        mandatory: false,
        type: 'NUMBER'
    },
    {
        field: formFields.MAX_SALARY,
        mandatory: false,
        type: 'NUMBER'
    },
    {
        field: formFields.TOTAL_EMPLOYEE_COUNT,
        mandatory: false,
        type: 'STRING'
    },
    {
        field: formFields.APPLY_TYPE,
        mandatory: false,
        type: 'STRING'
    },

]