import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const UnsolvedRepairs = () => {
  const [unsolvedRepairs, setUnsolvedRepairs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const repairsPerPage = 10;

  useEffect(() => {
    const fetchUnsolvedRepairs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/unsolved');
        const data = await response.json();
        setUnsolvedRepairs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching unsolved repairs:", error);
        setUnsolvedRepairs([]); // Set to an empty array in case of error
      }
    };

    fetchUnsolvedRepairs();
  }, []);

  const handleDeleteRepair = async (repairId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/unsolved/${repairId}`, { method: 'DELETE' });
      if (response.ok) {
        setUnsolvedRepairs(unsolvedRepairs.filter((repair) => repair._id !== repairId));
      }
    } catch (error) {
      console.error(`Error deleting repair with ID: ${repairId}`, error);
    }
  };

  // Filter repairs based on the search term
  const filteredRepairs = unsolvedRepairs.filter(
    (repair) =>
      repair.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRepair = currentPage * repairsPerPage;
  const indexOfFirstRepair = indexOfLastRepair - repairsPerPage;
  const currentRepairs = filteredRepairs.slice(indexOfFirstRepair, indexOfLastRepair);
  const totalPages = Math.ceil(filteredRepairs.length / repairsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-[#A51B2B] mb-4">Unsolved Repairs</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or contact number..."
        className="p-2 border rounded mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-[#A51B2B] mb-2">Repairs Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">No.</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Contact</th>
                <th className="py-2 px-4 text-left">Model</th>
                <th className="py-2 px-4 text-left">Problem</th>
                <th className="py-2 px-4 text-left">Technician</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRepairs.map((repair, index) => (
                <tr key={repair._id} className="border-b">
                  <td className="py-2 px-4">{indexOfFirstRepair + index + 1}</td>
                  <td className="py-2 px-4">{repair.name}</td>
                  <td className="py-2 px-4">{repair.contact}</td>
                  <td className="py-2 px-4">{repair.model}</td>
                  <td className="py-2 px-4">{repair.problem}</td>
                  <td className="py-2 px-4">{repair.technician}</td>
                  <td className="py-2 px-4">{repair.description}</td>
                  <td className="py-2 px-4">
                    <button 
                      className="text-red-500 hover:text-red-700 flex items-center"
                      onClick={() => handleDeleteRepair(repair._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsolvedRepairs;
