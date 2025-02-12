"use client"
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/services/spotifyService";
import { GridItems } from "../grid/GridItems";
import { useEffect, useState } from "react";

export default function Profile() {

    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('access_token')!);
    }, [])

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['user-profile'],
        queryFn: () => getUserProfile(token!),
        enabled: !!token
    })

    if (isLoading) return <p>Cargando perfil...</p>;

    if (data) return (
        <div
            className="flex justify-center w-full"
        >
            <div className="flex flex-col items-center p-5 rounded bg-purple-900 w-[600px] shadow">
                <div>
                    <Image
                        src={`${data.images[0].url}`}
                        alt="Imagen profile"
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                </div>
                <div className="mt-2">
                    <h3 className="text-3xl">
                        {data.display_name}
                    </h3>
                    <p className="text-sm font-light">
                        Followers: {data.followers.total}
                    </p>
                </div>
                <GridItems />
            </div>
        </div>
    )
}
