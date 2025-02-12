'use client'
import { useEffect } from "react";
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react'
import { useMutation } from "@tanstack/react-query";
import { refreshToken } from "@/lib/services/authService";
import { IoMdLogOut } from "react-icons/io";
import { addHoursDate } from "@/lib/utils/addHoursDate";


export const Header = () => {
    const { data: session, status } = useSession();
    const { mutate } = useMutation({
        mutationFn: refreshToken,
        onError: (err) => console.log(err),
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.accessToken)
            localStorage.setItem('refresh_token', data.refreshToken)
            localStorage.setItem('expire_token', addHoursDate(Date.now(), 1).toString());
        }
    });

    useEffect(() => {

        const date = Date.now();
        const expireAt = localStorage.getItem('expire_token');

        if (date >= +expireAt!) {
            mutate(session?.user?.refreshToken!)
        }
    }, [session, mutate])


    const user = session?.user;

    if (user) return (
        <header className='w-full py-4'>
            <nav className='container flex m-auto justify-between items-center'>
                <div className='text-5xl'>
                    Dev<span className='font-bold text-orange-500'>Music</span>
                </div>
                <div className='flex items-center gap-4'>
                    <Image
                        src={`${user?.image}`}
                        alt='Image Profile'
                        width={50}
                        height={50}
                        className='rounded-full'
                    />
                    <button
                        className='flex gap-1 justify-center items-center border border-orange-500 px-4 py-2 rounded-full text-orange-500 hover:text-white hover:border-orange-600 hover:bg-orange-600'
                        type="button"
                        onClick={() => signOut({ redirectTo: '/auth' })}
                    >
                        <IoMdLogOut />
                        Cerrar Sesión
                    </button>
                </div>
            </nav>
        </header>
    )
}
