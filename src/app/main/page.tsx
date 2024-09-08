"use client"
import { useState } from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
    const [showJoinForm, setShowJoinForm] = useState(false)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [board, setBoard] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState("X")
    const handleClick = (index: any) => {
        if (board[index] === null) {
            const newBoard = [...board]
            newBoard[index] = currentPlayer
            setBoard(newBoard)
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
        }
    }
    const checkWin = () => {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i]
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]
            }
        }
        if (board.every((cell) => cell !== null)) {
            return "tie"
        }
        return null
    }
    const winner = checkWin()
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#f0f0f0]">
            {!showJoinForm && !showCreateForm && (
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
                    {winner && (
                        <div className="text-2xl font-bold text-[#4a4a4a]">
                            {winner === "tie" ? "It's a tie!" : `Player ${winner} wins!`}
                        </div>
                    )}
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
            )}
          
        </div>
    )
}