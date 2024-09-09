"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { io } from "socket.io-client";

let socket: any;

export default function Component() {
    const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
    const [gameId] = useState<string>("66df51511e24e470d3828f03");
    const [playerId] = useState<string>("66df5151a1e4b07fe501b8e8");
    const [x, setXVal] = useState<number>(0);
    const [y, setYVal] = useState<number>(0);

    useEffect(() => {
        // Initialize socket connection
        socket = io("http://localhost:8000");

        // Socket event listeners
        socket.on('error', (errorMessage: any) => {
            console.log(`Error: ${errorMessage}`);
        });

        socket.on('gameover', (data: any) => {
            console.log('Game Over:', data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        // Emit the move whenever x or y changes
        if (x !== null && y !== null) {
            socket.emit('makemove', { gameId, playerId, x, y });
        }
    }, [x, y, gameId, playerId]);

    const setTheCoordinates = (index: number) => {
        const newX = Math.floor(index / 3);
        const newY = index % 3;
        setXVal(newX);
        setYVal(newY);
    };

    const handleClick = (index: number) => {
        if (board[index]) return; // Prevent clicking on an already filled cell
        setTheCoordinates(index);
        console.log("Clicked index:", index);
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
