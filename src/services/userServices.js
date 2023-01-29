import { REFRESH_TOKEN } from '~/utils/constants';
import { makePost } from './HTTPResource';

export const loginApi = async (data) => {
    const { data: res } = await makePost({
        data,
        url: 'api/auth/login/',
        noAuth: true
    });
    return res;
};

export const refreshTokenApi = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
        return;
    }
    const data = {
        refresh: refreshToken
    };
    const { data: res } = await makePost({
        data,
        url: 'api/token/refresh/'
    });
    return res;
};
