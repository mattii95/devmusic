import axios, { AxiosError, isAxiosError } from "axios";

type Headers = {
    'Content-Type'?: string
    'Authorization'?: string
}

export async function get<T>(url: string, token: string): Promise<T> {
    try {
        const { data } = await axios.get<T>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            return Promise.reject({ type: "TOKEN_EXPIRED", message: "Token expirado" });
        }
        return Promise.reject(error);
    }
}

export async function post<T>(url: string, body: string, token?: string): Promise<T> {
    let headers: Headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (token) {
        headers = {
            ...headers,
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const { data } = await axios.post<T>(url, { headers });
        return data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            return Promise.reject({ type: "TOKEN_EXPIRED", message: "Token expirado" });
        }
        return Promise.reject(error);
    }
}

