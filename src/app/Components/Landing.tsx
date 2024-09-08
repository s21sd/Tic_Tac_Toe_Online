"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import io from "socket.io-client";

const socket = io('http://localhost:8000');

export default function Landing() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessage(msg);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <div className="max-w-md w-full space-y-4">
                <h1 className="text-4xl font-bold text-blue-500">Tic Tac Toe</h1>
                <div className="flex justify-center gap-4">
                    <Link
                        href="/join"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        prefetch={false}
                    >
                        Join Room
                    </Link>
                    <Link
                        href="/createroom"
                        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        prefetch={false}
                    >
                        Create Room
                    </Link>
                </div>
                {message && (
                    <div className="mt-4 p-4 bg-gray-100 text-gray-800 rounded-md shadow-sm">
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
