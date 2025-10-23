"use client";


export default function FindNextHouse() {

    return (
        <>
        <div className="bg-yellow-500 w-[100%] h-[50vh] flex flex-col justify-center items-center mt-8 mb-8 rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Find Your Next House</h1>
             <h1 className="text-2xl">Rent a place, stay for months.</h1>
            <div className="flex justify-center bg-white">
             <input type="text" placeholder="Search for houses..." className="border border-gray-300 rounded-lg p-2 ml-4" />
             <input type="date" placeholder="Min Price" className="border border-gray-300 rounded-lg p-2 ml-4" />
             <input type="date" placeholder="Max Price" className="border border-gray-300 rounded-lg p-2 ml-4" />
            </div>
        </div>
        </>
    );
}

