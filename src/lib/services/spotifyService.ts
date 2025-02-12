import { TopTracks } from '@/interfaces/top-tracks';
import { get } from '../utils/axiosClient'
import { Profile } from '@/interfaces/profile';
import { AxiosError } from 'axios';

const base_url = 'https://api.spotify.com/v1';

export async function getUserProfile(token: string) {
    try {
        const result = await get<Profile>(`${base_url}/me`, token);
        return result;
    } catch (error: any) {
        if (error.type === 'TOKEN_EXPIRED') {
            throw new AxiosError('invalid token', '401');
        }
        return error;
    }   
}

export async function getUserTopItems(token: string, limit: number = 9) {
    return await get<TopTracks>(`${base_url}/me/top/tracks?limit=${limit}`, token);
}