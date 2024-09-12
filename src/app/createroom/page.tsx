"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

const Page = () => {
    const router = useRouter();
    const [username, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [gameId, setGameId] = useState("");
    const [playerId, setPlayerId] = useState("");

    useEffect(() => {
        // Set up socket listeners
        socket.on('Game_Created', (data: any) => {
            setMessage(`Game created with ID: ${data.gameId}, Player ID: ${data.playerId}`);
            setGameId(data.gameId);
            setPlayerId(data.playerId);
            router.push(`/main?gameId=${data.gameId}&playerId=${data.playerId}`);
        });

        socket.on('error', (errorMessage: string) => {
            setMessage(`Error: ${errorMessage}`);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('Game_Created');
            socket.off('error');
        };
    }, [router]);

    const handleRoomCreation = () => {
        if (username.trim() === "") {
            setMessage("Please enter a username.");
            return;
        }

        socket.emit('createGame', { username });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Create Room</h2>
                <div className="flex flex-col">
                    <input
                        placeholder="Enter your Name"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                    />
                    <button
                        onClick={handleRoomCreation}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150"
                    >
                        Create Room
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <a className="text-sm text-gray-400 hover:underline" href="/join">Join Room</a>
                </div>
                {message && <p className="text-sm text-gray-400 mt-4">{message}</p>}
            </div>
        </div>
    );
}

export default Page;
