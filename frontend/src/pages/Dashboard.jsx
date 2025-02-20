import { useState, useEffect } from "react";
import MonitorCard from "../components/MonitorCard";
import { getMonitors } from "../services/api";

export default function Dashboard() {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMonitors = async () => {
      try {
        const data = await getMonitors();
        console.log(data) 
        setMonitors(data || []);
      } catch (err) {
        setError("Failed to load monitors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonitors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Monitors</h1>

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
      </div>
    </div>
  );
}
