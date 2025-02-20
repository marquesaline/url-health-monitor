import { useState, useEffect } from "react";
import { createMonitor, updateMonitor } from "../services/api";

export default function MonitorForm({ monitor, onMonitorUpdated, onMonitorAdded, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    check_interval: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (monitor) {
      setFormData({
        name: monitor.name,
        url: monitor.url,
        check_interval: monitor.check_interval,
      });
    }
  }, [monitor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let savedMonitor;

      if (monitor) {
        savedMonitor = await updateMonitor(monitor.id, formData);
        onMonitorUpdated(savedMonitor);
      } else {
        savedMonitor = await createMonitor(formData);
        onMonitorAdded(savedMonitor);
      }
      onClose();
    } catch (err) {
      console.error("Save Error:", err);
      setError("Failed to save monitor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {monitor ? "Edit Monitor" : "Add New Monitor"}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </label>

      <label className="block mb-2">
        URL:
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </label>

      <label className="block mb-4">
        Check Interval (min):
        <input
          type="number"
          name="check_interval"
          value={formData.check_interval}
          onChange={handleChange}
          min="5"
          required
          className="border p-2 w-full"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : monitor ? "Save Changes" : "Add Monitor"}
      </button>
    </form>
  );
}
