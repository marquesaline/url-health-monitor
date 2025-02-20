import { useState, useEffect } from "react";
import MonitorCard from "../components/MonitorCard";
import MonitorForm from "../components/MonitorForm";
import Modal from "../components/Modal";
import Layout from "../components/Layout";
import { getMonitors, getMonitorById } from "../services/api";
import useMonitorUpdates from "../hooks/useMonitorUpdates";

export default function Dashboard() {
  const [monitors, setMonitors] = useState([]);
  const [filteredMonitors, setFilteredMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchMonitors = async () => {
      try {
        const data = await getMonitors();
        setMonitors(data || []);
      } catch (err) {
        setError("Failed to load monitors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonitors();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedMonitors = await getMonitors();
        setMonitors(updatedMonitors);
      } catch (error) {
        console.error("Error to update:", error);
      }
    }, 5000); 
  
    return () => clearInterval(interval); 
  }, []);
  

  useEffect(() => {
    if (!monitors || monitors.length === 0) {
      setFilteredMonitors([]); 
      return;
    }
  
    let updatedMonitors = [...monitors];
  
  
    if (filter !== "all") {
      updatedMonitors = updatedMonitors.filter((monitor) => {
        return monitor.status?.trim().toLowerCase() === filter;
      });
    }
  
    updatedMonitors.sort((a, b) => {
      const timeA = a.average_response_time ?? Number.MAX_VALUE; 
      const timeB = b.average_response_time ?? Number.MAX_VALUE;
      return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
    });
  
    setFilteredMonitors(updatedMonitors);
  }, [monitors, filter, sortOrder]);
  

  useMonitorUpdates(setMonitors);

  const handleMonitorAdded = (newMonitor) => {
    setMonitors((prevMonitors) => [...prevMonitors, newMonitor]);
  
    const interval = setInterval(async () => {
      try {
        const updatedMonitor = await getMonitorById(newMonitor.id);
  
        if (updatedMonitor.status !== "down") {
          setMonitors((prevMonitors) =>
            prevMonitors.map((m) =>
              m.id === updatedMonitor.id ? updatedMonitor : m
            )
          );
          clearInterval(interval); 
        }
      } catch (error) {
        console.error("Error checking:", error);
      }
    }, 2000); 
  };
  

  const handleMonitorUpdated = (updatedMonitor) => {
    setMonitors((prevMonitors) =>
      prevMonitors.map((m) => (m.id === updatedMonitor.id ? updatedMonitor : m))
    );
  };

  const handleMonitorDeleted = (deletedId) => {
    setMonitors((prevMonitors) => prevMonitors.filter((monitor) => monitor.id !== deletedId));
  };

  return (
    <Layout>
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold text-gray-800">Monitors</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          + Add Monitor
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2">
          <span className="font-semibold">Filter by Status:</span>
          <select
            className="border p-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="up">UP</option>
            <option value="down">DOWN</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="font-semibold">Sort by Response Time:</span>
          <select
            className="border p-2 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && filteredMonitors.length === 0 && (
        <p className="text-gray-600">No monitors available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMonitors.map((monitor) => (
          <MonitorCard 
            key={monitor.id} 
            monitor={monitor} 
            onMonitorUpdated={handleMonitorUpdated} 
            onMonitorDeleted={handleMonitorDeleted} 
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MonitorForm onMonitorAdded={handleMonitorAdded} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </Layout>
  );
}
