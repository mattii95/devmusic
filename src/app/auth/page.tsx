'use client'
import { redirect } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react'
import { FaSpotify } from "react-icons/fa";


export default function AuthHome() {
    const { data: session, status } = useSession();

    if (status === 'authenticated') {
        localStorage.setItem('access_token', session.user?.accessToken!)
        localStorage.setItem('refresh_token', session.user?.refreshToken!)
        localStorage.setItem('expire_token', session.user?.expireToken.toString()!)
        redirect('/')
    }

    return (
        <div className='flex items-center justify-center'>
            <div
                className='w-1/2 h-full min-h-screen bg-cover bg-center'
                style={{ backgroundImage: 'url("/images/bg-login-dev-music.jpg")' }}
            >
            </div>
            <div className='w-1/2 min-h-screen flex flex-col items-center justify-center'>
                <h1 className='text-6xl'>Gestiona tus <span className='text-orange-500 font-bold'>Playlists</span></h1>
                <p className='mt-5'>Ingresa para crear, modificar y compartir tus playlists.</p>
                <button
                    className='mt-5 px-4 py-2 bg-green-500 text-white rounded-full flex items-center gap-1 hover:bg-green-600'
                    onClick={() => signIn('spotify')}
                >
                    <FaSpotify /> Spotify
                </button>
            </div>
        </div>
    );
}
