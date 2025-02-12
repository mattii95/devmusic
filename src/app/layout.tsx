import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth/components/AuthProvider";
import { QueryProvider } from "@/components/provider/QueryProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DevMusic",
    description: "Crea o modifica playlist de una manera sencilla",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900 text-white`}
                >
                    <QueryProvider>
                        {children}
                    </QueryProvider>
                </body>
            </html>
        </AuthProvider>
    );
}
