export const baseUrl = 'https://api.github.com';
export const matchParameterRegex = /\{[a-zA-Z0-9]+}/ig;
export const errorCodes = {
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    NOT_FOUND: 'NOT_FOUND'
};
export default {
    findByUser: {
        method: 'get',
        url: '/users/{user}/repos'
    }
}