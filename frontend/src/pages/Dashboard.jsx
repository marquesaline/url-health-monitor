import { useState, useEffect } from "react";
import MonitorCard from "../components/MonitorCard";
import MonitorForm from "../components/MonitorForm";
import Modal from "../components/Modal";
import Layout from "../components/Layout";
import { getMonitors } from "../services/api";
import useMonitorUpdates from "../hooks/useMonitorUpdates";

export default function Dashboard() {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useMonitorUpdates(setMonitors);

  const handleMonitorAdded = (newMonitor) => {
    setMonitors([...monitors, newMonitor]);
    setIsModalOpen(false);
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

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && monitors.length === 0 && (
        <p className="text-gray-600">No monitors available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monitors.map((monitor) => (
          <MonitorCard key={monitor.id} monitor={monitor} />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MonitorForm onMonitorAdded={handleMonitorAdded} />
      </Modal>
    </Layout>
  );
}
