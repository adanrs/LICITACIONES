import axios from 'axios';

interface IAuthResponse {
    accessToken: string;
}

export const authProvider = {
    login: async ({ username, password }: { username: string; password: string }): Promise<void> => {
        try {
            const response = await axios.post<IAuthResponse>('http://localhost:3000/api/login', {
                username,
                password,
            });
            localStorage.setItem('authToken', response.data.accessToken);
        } catch (error) {
            throw new Error("Login failed");
        }
    },
    logout: () => {
        localStorage.removeItem('authToken');
        return Promise.resolve();
    },
    checkAuth: () => localStorage.getItem('authToken') ? Promise.resolve() : Promise.reject(),
    checkError: (error: any) => {
        if (error && error.status === 401) {
            localStorage.removeItem('authToken');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};
