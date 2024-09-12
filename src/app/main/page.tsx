"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { io, Socket } from "socket.io-client";
import { useRouter, useSearchParams } from "next/navigation";

// Socket initialization should only occur once
const socket: Socket = io("http://localhost:8000");

export default function Component() {
    const searchParams = useSearchParams()
    const gameId = searchParams.get('gameId');
    const playerId = searchParams.get('playerId')
    const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
    const [cnt, setCnt] = useState(0);

    console.log(gameId);
    console.log(playerId);
    useEffect(() => {
        // Listen for board updates from the server
        socket.on('updateBoard', ({ board, currentTurn }) => {
            setBoard(board);
            setCurrentPlayer(currentTurn === playerId ? "X" : "O");
        });

        // Capture error events
        socket.on('error', (err) => {
            console.error('Socket error:', err);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('updateBoard');
            socket.off('error');
        };
    }, [playerId]);

    console.log(board);

    const handleClick = (index: number) => {
        if (board[index]) return; // Prevent clicking on an already filled cell
        const x = Math.floor(index / 3);
        const y = index % 3;
        setCnt((prev) => prev + 1);
        socket.emit('makemove', { gameId, playerId, x, y });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#f0f0f0]">
            <div className="max-w-md w-full space-y-6">
                <h1 className="text-4xl font-bold text-[#4a4a4a]">Tic Tac Toe</h1>
                <div className="grid grid-cols-3 gap-4">
                    {board.map((cell, index) => (
                        <div
                            key={index}
                            className="w-16 h-16 bg-white border border-[#ced4da] rounded-md flex items-center justify-center text-4xl font-bold text-[#4a4a4a] cursor-pointer hover:bg-[#e6e6e6]"
                            onClick={() => handleClick(index)}
                        >
                            {cell}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4">
                    <Link
                        href="#"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-[#007bff] px-6 text-sm font-medium text-white shadow transition-colors hover:bg-[#0056b3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        prefetch={false}
                    >
                        Reset
                    </Link>
                    <Link
                        href="#"
                        className="inline-flex h-10 items-center justify-center rounded-md border border-[#ced4da] bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-[#e6e6e6] hover:text-[#333] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        prefetch={false}
                    >
                        Exit
                    </Link>
                </div>
            </div>
        </div>
    );
}
