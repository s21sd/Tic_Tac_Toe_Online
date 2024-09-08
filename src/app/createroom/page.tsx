"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router = useRouter();
    return (
        <div>

            <div className="flex flex-col items-center justify-center h-screen dark">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">Create Room</h2>

                    <div className="flex flex-col">
                        <input placeholder="Enter your Name" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
                        <input placeholder="Create a Room Id" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />

                        <button onClick={() => router.push('/main')} className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150">Create Room</button>
                    </div>

                    <div className="flex justify-center mt-4">
                        <a className="text-sm text-gray-400 hover:underline" href="/join">Join Room</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page
