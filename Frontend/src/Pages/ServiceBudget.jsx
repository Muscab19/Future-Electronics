import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceBudget = () => {
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [technicianData, setTechnicianData] = useState({});
  const [showSummary, setShowSummary] = useState(false); // State to toggle views

  // Fetch paid repairs data from the backend
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/serviceBudget');
        if (response.data) {
          setServiceData(response.data);
          aggregateTechnicianData(response.data);
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  // Aggregate technician data
  const aggregateTechnicianData = (data) => {
    const aggrData = data.reduce((acc, entry) => {
      const techName = entry.technician;
      if (!acc[techName]) {
        acc[techName] = { totalRepairs: 0, totalBudget: 0 };
      }
      acc[techName].totalRepairs += 1;
      acc[techName].totalBudget += entry.serviceFee;
      return acc;
    }, {});

    setTechnicianData(aggrData);
  };

  const handleViewToggle = () => {
    setShowSummary((prev) => !prev);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#9D1A20]">
          {showSummary ? 'Technician Summary' : 'Service Budget'}
        </h2>
        <button
          className="px-4 py-2 text-white bg-[#F68E30] rounded"
          onClick={handleViewToggle}
        >
          {showSummary ? 'View Service Budget' : 'View Technician Summary'}
        </button>
      </div>

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow mb-6">
        <thead>
          <tr className="bg-[#9D1A20] text-white">
            {showSummary ? (
              <>
                <th className="py-3 px-5 border-b text-left">Technician</th>
                <th className="py-3 px-5 border-b text-left">Total Repairs</th>
                <th className="py-3 px-5 border-b text-left">Total Budget</th>
              </>
            ) : (
              <>
                <th className="py-3 px-5 border-b text-left">Customer Name</th>
                <th className="py-3 px-5 border-b text-left">Service Fee</th>
                <th className="py-3 px-5 border-b text-left">Problem</th>
                <th className="py-3 px-5 border-b text-left">Technician</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {showSummary
            ? Object.keys(technicianData).map((tech) => (
                <tr key={tech} className="hover:bg-[#F68E30] transition duration-150">
                  <td className="py-3 px-5 border-b">{tech}</td>
                  <td className="py-3 px-5 border-b">{technicianData[tech].totalRepairs}</td>
                  <td className="py-3 px-5 border-b">${technicianData[tech].totalBudget.toFixed(2)}</td>
                </tr>
              ))
            : serviceData.map((entry) => (
                <tr key={entry._id} className="hover:bg-[#F68E30] transition duration-150">
                  <td className="py-3 px-5 border-b">{entry.name}</td>
                  <td className="py-3 px-5 border-b">${entry.serviceFee.toFixed(2)}</td>
                  <td className="py-3 px-5 border-b">{entry.problem}</td>
                  <td className="py-3 px-5 border-b">{entry.technician}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceBudget;