export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;
export const LOGIN_URL = `${AUTH_URL}/api/auth/login`;
export const REGISTRATION_URL = `${AUTH_URL}/api/auth/register`;
export const FORGOT_URL = `${AUTH_URL}/api/auth/forgotPassword`;
export const RESETPW_URL = `${AUTH_URL}/api/auth/resetpassword`;
export const PROFILE_URL = `${AUTH_URL}/profile`;

