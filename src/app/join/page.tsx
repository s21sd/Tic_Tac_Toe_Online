"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

const Page = () => {
    const router = useRouter();
    const [username, setUserName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [message, setMessage] = useState("");
    const [gameId, setGameId] = useState("");
    const [playerId, setPlayerId2] = useState("");
    useEffect(() => {

        socket.on('gamejoined', (data) => {
            setMessage(`Game joined with ID: ${data.gameId}, Player ID: ${data.playerId}`);
            setGameId(data.gameId);
            setPlayerId2(data.playerId);

        });

        socket.on('error', (errorMsg) => {
            setMessage(errorMsg);
        });
        return () => {
            socket.off('gamejoined');
            socket.off('error');
        };
    }, []);

    const handleJoinRoom = () => {
        if (username && roomId) {
            socket.emit('joinGame', { username, gameId: roomId });
            setTimeout(() => {
                router.push(`/main?gameId=${gameId}&playerId=${playerId}`);
            }, 3000)


        } else {
            setMessage('Please enter both username and room ID.');
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen dark">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">Join Room</h2>
                    <div className="flex flex-col">
                        <input
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your username"
                            required
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                        />
                        <input
                            onChange={(e) => setRoomId(e.target.value)}
                            placeholder="Enter your Room Id"
                            required
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                        />
                        <button
                            onClick={handleJoinRoom}
                            className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150"
                        >
                            Join Room
                        </button>
                    </div>
                    {message && (
                        <div className="mt-4 text-center text-sm text-white">
                            {message}
                        </div>
                    )}
                    <div className="flex justify-center mt-4">
                        <a className="text-sm text-gray-400 hover:underline" href="/createroom">Create Room</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;
