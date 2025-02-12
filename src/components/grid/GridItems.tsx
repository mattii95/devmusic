"use client"
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserTopItems } from "@/lib/services/spotifyService";

export const GridItems = () => {
    const token = localStorage.getItem('access_token');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user-top-tracks'],
        queryFn: () => getUserTopItems(token!),
    })

    if (isLoading) return <p>Cargando datos...</p>;
    if (data) return (
        <div className="flex flex-col gap-2 w-full">
            {data.items.map(item => (
                <Link
                    href={item.external_urls.spotify}
                    target="_blank"
                    key={item.id}
                    className="flex w-full gap-3 bg-zinc-800 p-2 rounded hover:bg-zinc-700"
                >
                    <Image
                        src={`${item.album.images[0].url}`}
                        width={50}
                        height={50}
                        alt="Album image"
                    />
                    <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm">
                            {item.artists.map(artist => (
                                artist.name + ' '
                            ))}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
