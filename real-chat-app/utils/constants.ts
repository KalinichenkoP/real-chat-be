export enum HTTP_METHODS {
    GET, POST, PUT, PATCH, DELETE
}

export enum STATUSES {
    OK, ERROR
}

export enum ROLES {
    USER, ADMIN, SUPER_ADMIN, RECRUITER, ACCOUNTANT, LAWYER, HR, EMPLOYEE
}

export enum VALIDATION_SCHEMAS {
    IMAGE, RICH_DOCUMENT, TEXT_DOCUMENT
}

export enum NOTIFICATIONS {
    WELCOME, VACATION_REQUEST_RECEIVED,
    VACATION_RESOLUTION, NEW_REVIEW_RESPONDENT,
    NEW_REVIEW_RESPONSIBLE
}

export enum SOCKET_MESSAGES {
    WHO, NEW_NOTIFICATION
}

export const REVIEWERS_POSITIONS = [
    'hr',
    'pm',
    'accountant',
    'department lead',
    'ceo'
];

export const role = {
    ADMIN: 'Admin',
    SUPER_ADMIN: 'Super Admin',
    RECRUITER: 'Recruiter',
    ACCOUNTANT: 'Accountant',
    LAWYER: 'Lawyer',
    OFFICE_MANAGER: 'Office manager',
    EMPLOYEE: 'Employee'
};

// Attributes available for all users
export const commonAttr = [
    'name',
    'surname',
    'middle_name',
    'photo',
    'skype',
    'email',
    'position_id',
    'department_id'
];
// Attributes available for Admin, Super admin Recruiter, Accountant, Lawyer
export const adminAttr = [
    'pass_number',
    'pass_issued_by',
    'pass_issued_at',
    'city_id',
    'registration_address',
    'cv',
    'TIN',
    'is_sole_proprietor',
    'sp_group',
    'initial_salary',
    'current_salary',
    'role_id',
    'access_token',
    'first_work_day',
    'last_work_day',
    'date_of_birth'];
export const superAdminAttr = [
    'vacation_days_available',
    'sick_leave_available',
    'sick_days_available'];


export const ATTR_NEED_TRANSLATE = ['nameEn', 'nameUk', 'surnameUk', 'surnameEn', 'middleNameUk', 'middleNameEn', 'passIssuedByEn', 'registrationAddressEn', 'passIssuedByUk', 'registrationAddressUk'];
export const USER_ATTR_NEED_TRANSLATE = ['name', 'surname', 'middleName', 'registrationAddress', 'passIssuedBy'];
export const ROLE_ATTR_NEED_TRANSLATE = ['title'];
export const POSITION_ATTR_NEED_TRANSLATE = ['title'];
export const CITY_ATTR_NEED_TRANSLATE = ['title'];
export const VACATION_TYPE_ATTR_NEED_TRANSLATE = ['title'];
export const REVIEW_TYPE_NEED_TRANSLATE = ['title'];

export const DB_INSTANCES = ['user', 'role', 'position', 'department', 'vacationType', 'reviewType', 'city'];
export const AVAIL_LANGUAGES = ['Ru', 'En', 'Uk'];


