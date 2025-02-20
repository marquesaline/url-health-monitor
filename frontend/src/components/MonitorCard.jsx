import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import MonitorForm from "./MonitorForm";
import { deleteMonitor } from "../services/api";

export default function MonitorCard({ monitor, onMonitorUpdated, onMonitorDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${monitor.name}?`)) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await deleteMonitor(monitor.id);
      onMonitorDeleted(monitor.id); // Remove da UI
    } catch (err) {
      setError("Failed to delete monitor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">{monitor.name}</h3>
      <p className="text-gray-600">{monitor.url}</p>
      <p>
        Status: {monitor.status === "up" ? "🟢 Online" : "🔴 Offline"}
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-2 mt-4">
        <Link to={`/monitor/${monitor.id}`} className="bg-blue-500 text-white px-4 py-2 rounded shadow">
          View Details
        </Link>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <MonitorForm 
          monitor={monitor} 
          onMonitorUpdated={onMonitorUpdated} 
          onClose={() => setIsEditing(false)}
        />
      </Modal>
    </div>
  );
}
