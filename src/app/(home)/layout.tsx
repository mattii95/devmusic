import { auth } from '@/auth'
import { Header } from "@/components";
import { redirect } from 'next/navigation';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session) return redirect('/auth');

    return (
        <>
            <Header />
            {children}
        </>
    );
}