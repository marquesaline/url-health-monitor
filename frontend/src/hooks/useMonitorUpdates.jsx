import { useEffect } from "react";


export default function useMonitorUpdates(setMonitors) {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/cable"); 

    socket.onopen = () => {
      console.log("WebSocket conectado");
      socket.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({ channel: "SiteMonitorChannel" }),
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "ping") return;
      if (data.message) {
        setMonitors((prevMonitors) =>
          prevMonitors.map((monitor) =>
            monitor.id === data.message.id ? data.message : monitor
          )
        );
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      socket.close();
    };
  }, [setMonitors]);
}
