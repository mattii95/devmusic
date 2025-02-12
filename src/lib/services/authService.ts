import axios from "axios";

export async function refreshToken(token: string) {
    const url = 'https://accounts.spotify.com/api/token';
    const body ={
        grant_type: 'refresh_token',
        refresh_token: token,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID!
    }

    try {
        const { data } = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return data;
    } catch (error) {
        console.log(error);
    }

}