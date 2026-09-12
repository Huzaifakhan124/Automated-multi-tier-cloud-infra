import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [apiUrl, setApiUrl] = useState("https://official-joke-api.appspot.com/random_joke");
  const [frequency, setFrequency] = useState(10);
  const [duration, setDuration] = useState(1);
  const [status, setStatus] = useState("");

  const handleStart = async () => {
    setStatus("Connecting to Backend...");
    console.log("Sending data to backend...");

    try {
      const response = await axios.post('http://localhost:5000/start-task', {
        api_url: apiUrl,
        frequency: Number(frequency),
        duration: Number(duration)
      });

      console.log("Backend Response:", response.data);

      // 'status' 
      if (response.data.status === "Success") {
        
        const successMsg = response.data.message || "Data Saved to Aiven DB!";
        setStatus(`✅ Success: ${successMsg}`);
      } else {
        setStatus("⚠️ Backend Error: " + (response.data.message || "Unknown Error"));
      }
    } catch (error) {
      setStatus("❌ Backend Not Reachable! Check if Docker is running.");
      console.error("Error details:", error);
    }
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial', textAlign: 'center' }}>
      <h1 style={{ color: '#2c3e50' }}>Huzaifa's DevOps Project Dashboard</h1>
      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left', background: '#f4f4f4', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        
        <label style={{ fontWeight: 'bold' }}>API URL:</label>
        <input 
          style={{ width: '100%', marginBottom: '15px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
          value={apiUrl} 
          onChange={(e) => setApiUrl(e.target.value)} 
        />

        <label style={{ fontWeight: 'bold' }}>Frequency (Seconds):</label>
        <input 
          type="number"
          style={{ width: '100%', marginBottom: '15px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
          value={frequency} 
          onChange={(e) => setFrequency(e.target.value)} 
        />

        <label style={{ fontWeight: 'bold' }}>Duration (Minutes):</label>
        <input 
          type="number"
          style={{ width: '100%', marginBottom: '20px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
          value={duration} 
          onChange={(e) => setDuration(e.target.value)} 
        />

        <button 
          onClick={handleStart}
          style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Start Scheduler
        </button>
      </div>

      <h3 style={{ marginTop: '30px', color: status.includes('✅') ? 'green' : 'red', background: '#fff', display: 'inline-block', padding: '10px 20px', borderRadius: '5px' }}>
        {status}
      </h3>
    </div>
  );
}

export default App;
