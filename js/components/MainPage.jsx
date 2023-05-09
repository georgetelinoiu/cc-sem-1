import { useEffect, useState } from "react";
import Link from 'next/link';
import PoemDetails from "./PoemDetails";

export default function MainPage() {
    const [records, setRecords] = useState([]);
    const [selectedPoem, setSelectedPoem] = useState(null);

    const handlePoemClick = (poem) => {
        setSelectedPoem(poem);
    };

    useEffect(() => {
        try {
            fetch('/api/records', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => setRecords(json.data));
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    const deleteRecord = (event) => {
        event.preventDefault();
        const id = event.target.id;
        try {
            fetch(`/api/records?id=${id}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(json => {
                    setRecords(records.filter(record => record._id !== id));
                });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-4 md:px-6 py-10 mx-auto">
                <h1 className="w-full text-center text-4xl md:text-6xl">Poem generator</h1>
                <p className="w-full text-center mt-4 text-xl md:text-3xl">Genereaza o poezie pentru cineva drag</p>
                <div className="flex justify-center mt-8">
                    <Link href="/insert">
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        >
                            Genereaza poezie
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-4 md:gap-8 mt-8 md:mt-12 xl:mt-0 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                    {records.map(record => (
                        <div
                            key={record._id}
                            className="block max-w-sm p-4 md:p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                From: {record.sender}
                            </h5>
                            <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                To: {record.receiver}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Type: {record.type}
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Poem: {record.poem}
                            </p>
                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    id={record._id}
                                    onClick={deleteRecord}
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 md:px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePoemClick(record)}
                                    className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 md:px-5 py-2.5 mr-2 mb-2"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="overflow-y-auto h-screen">
                    {selectedPoem && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                            <div className="bg-white rounded-lg w-1/2 md:w-1/3 lg:w-1/4 mx-auto p-4 md:p-6 max-h-screen overflow-y-scroll">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg mt-4"
                                    onClick={() => setSelectedPoem(null)}
                                >
                                    Close
                                </button>
                                <PoemDetails poem={selectedPoem} />
                            </div>
                        </div>

                    )}
                </div>

            </div>
        </section>

    )
}