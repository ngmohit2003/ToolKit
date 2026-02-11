
// import React, { useEffect, useState } from "react";
// import {
//   startCapture,
//   listCaptures,
//   analyzeCapture,
//   downloadCapture,
// } from "../api/packetApi";

// export default function PacketAnalyzer() {
//   const [captures, setCaptures] = useState([]);
//   const [analysis, setAnalysis] = useState(null);
//   const [activeCaptureId, setActiveCaptureId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function loadCaptures() {
//     const data = await listCaptures();
//     setCaptures(data.captures || []);
//   }

//   async function handleCapture() {
//     setLoading(true);
//     await startCapture();
//     await loadCaptures();
//     setLoading(false);
//   }

//   async function handleAnalyze(id) {
//     setAnalysis(null);
//     setActiveCaptureId(id);
//     const data = await analyzeCapture(id);
//     setAnalysis(data.analysis);
//   }

//   useEffect(() => {
//     loadCaptures();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       {/* HEADER */}
//       <h1 className="text-4xl font-bold text-center mb-8">
//         Live Packet Analyzer
//       </h1>

//       {/* START CAPTURE */}
//       <div className="flex justify-center mb-10">
//         <button
//           onClick={handleCapture}
//           disabled={loading}
//           className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
//         >
//           {loading ? "Capturing (60s)..." : "Start New Capture"}
//         </button>
//       </div>

//       {/* CAPTURE LIST */}
//       <div className="bg-white shadow rounded-lg p-6 mb-10">
//         <h2 className="text-2xl font-semibold mb-4">My Captures</h2>

//         {captures.length === 0 && (
//           <p className="text-gray-500">No captures yet</p>
//         )}

//         {captures.map((c) => (
//           <div
//             key={c.capture_id}
//             className="flex justify-between items-center border-b py-3"
//           >
//             <div>
//               <p className="font-mono text-sm">{c.capture_id}</p>
//               <p className="text-xs text-gray-500">
//                 Packets: {c.packet_count} | Duration: {c.duration}s
//               </p>
//             </div>

//             <div className="flex gap-3">
//               <button
//   onClick={() => handleAnalyze(c.capture_id)}
//   disabled={activeCaptureId === c.capture_id && !analysis}
//   className={`px-4 py-1 rounded text-white
//     ${
//       activeCaptureId === c.capture_id && !analysis
//         ? "bg-gray-500 cursor-not-allowed"
//         : activeCaptureId === c.capture_id && analysis
//         ? "bg-emerald-600"
//         : "bg-green-600"
//     }
//   `}
// >
//   {activeCaptureId === c.capture_id && !analysis
//     ? "Analyzing..."
//     : activeCaptureId === c.capture_id && analysis
//     ? "Analyzed"
//     : "Analyze"}
// </button>


//               <button
//                 onClick={() => downloadCapture(c.capture_id)}
//                 className="bg-yellow-500 text-white px-4 py-1 rounded"
//               >
//                 Download PCAP
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ANALYSIS RESULT */}
//       {analysis && (
//         <>
//           <h2 className="text-xl font-semibold text-center mb-6">
//             Capture ID: <span className="font-mono">{activeCaptureId}</span>
//           </h2>

//           {/* PACKET COUNT */}
//           <div className="bg-white shadow rounded-lg p-6 mb-6">
//             <h3 className="text-xl font-semibold mb-2">Packet Count</h3>
//             <p>TCP Packets: {analysis.tcp_packets}</p>
//             <p>UDP Packets: {analysis.udp_packets}</p>
//           </div>

//           {/* DNS QUERIES */}
//           <div className="bg-white shadow rounded-lg p-6 mb-6">
//             <h3 className="text-xl font-semibold mb-2">DNS Queries</h3>
//             {Object.keys(analysis.dns_queries).length === 0 && (
//               <p className="text-gray-500">No DNS queries</p>
//             )}
//             {Object.entries(analysis.dns_queries).map(([domain, count]) => (
//               <p key={domain}>
//                 {domain} → {count}
//               </p>
//             ))}
//           </div>

//           {/* SYN FLOOD */}
//           <div className="bg-white shadow rounded-lg p-6 mb-6">
//             <h3 className="text-xl font-semibold mb-2">
//               SYN Flood Suspects
//             </h3>
//             {Object.keys(analysis.syn_flood_suspects).length === 0 && (
//               <p className="text-gray-500">No suspicious activity</p>
//             )}
//             {Object.entries(analysis.syn_flood_suspects).map(
//               ([ip, count]) => (
//                 <p key={ip}>
//                   {ip} → {count} SYN packets
//                 </p>
//               )
//             )}
//           </div>

//           {/* TOP SOURCE IPS */}
//           <div className="bg-white shadow rounded-lg p-6 mb-10">
//             <h3 className="text-xl font-semibold mb-2">Top Source IPs</h3>
//             {analysis.top_source_ips.map(([ip, count]) => (
//               <p key={ip}>
//                 {ip} → {count} packets
//               </p>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { showError,showSuccess } from "../utils/toast";
import {
  startCapture,
  listCaptures,
  analyzeCapture,
  downloadCapture,
  deleteCapture,  // new thing 
} from "../api/packetApi";

export default function PacketAnalyzer() {
  const [captures, setCaptures] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [activeCaptureId, setActiveCaptureId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const timerRef = useRef(null);
  const notifyAudio = useRef(new Audio("/notify.mp3"));

  async function loadCaptures() {
    const data = await listCaptures();
    setCaptures(data.captures || []);
  }

  async function handleCapture() {
    setLoading(true);
    setCountdown(60);

  
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          notifyAudio.current.play(); // 🔔 SOUND
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    await startCapture();
    await loadCaptures();

    setLoading(false);
  }

  async function handleAnalyze(id) {
    setAnalysis(null);
    setActiveCaptureId(id);
    const data = await analyzeCapture(id);
    showSuccess("Analysis completed");
    setAnalysis(data.analysis);
  }

  // new function to handle delete
//   async function handleDelete(id) {
//   const ok = window.confirm("Are you sure you want to delete this capture?");
//   if (!ok) return;

//   await deleteCapture(id);
//   if (activeCaptureId === id) {
//     setAnalysis(null);
//     setActiveCaptureId(null);
//   }
  
//   await loadCaptures();
// }

async function handleDelete(id) {
  const ok = window.confirm("Are you sure you want to delete this capture?");
  if (!ok) return;

  try {
    await deleteCapture(id);

    showSuccess("Capture deleted successfully ✅");

    if (activeCaptureId === id) {
      setAnalysis(null);
      setActiveCaptureId(null);
    }

    await loadCaptures();
  } catch (error) {
    showError("Failed to delete capture ❌");
    console.error(error);
  }
}
  useEffect(() => {

    console.log("token:", localStorage.getItem("access_token"));
    loadCaptures();
    // return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Live Packet Analyzer
      </h1>

      {/* START CAPTURE */}
      <div className="flex flex-col items-center mb-12 gap-3">
        <button
          onClick={handleCapture}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          {loading ? "Capturing..." : "Start New Capture"}
        </button>

        {countdown !== null && countdown > 0 && (
          <div className="font-mono text-lg text-gray-700">
            ⏳ Capturing packets:{" "}
            <span className="font-bold">{countdown}s</span>
          </div>
        )}

        {countdown === 0 && (
          <div className="text-green-600 font-semibold">
            ✅ Capture completed
          </div>
        )}
      </div>

      {/* CAPTURE LIST */}
      <div className="bg-white shadow rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4">My Captures</h2>

        {captures.length === 0 && (
          <p className="text-gray-500">No captures yet</p>
        )}

        {captures.map((c) => (
          <div
            key={c.capture_id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-mono text-sm">{c.capture_id}</p>
              <p className="text-xs text-gray-500">
                Packets: {c.packet_count} | Duration: {c.duration}s
              </p>
         
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleAnalyze(c.capture_id)}
                disabled={activeCaptureId === c.capture_id && !analysis}
                className={`px-4 py-1 rounded text-white
                  ${
                    activeCaptureId === c.capture_id && !analysis
                      ? "bg-gray-500 cursor-not-allowed"
                      : activeCaptureId === c.capture_id && analysis
                      ? "bg-emerald-600"
                      : "bg-green-600"
                  }
                `}
              >
                {activeCaptureId === c.capture_id && !analysis
                  ? "Analyzing..."
                  : activeCaptureId === c.capture_id && analysis
                  ? "Analyzed"
                  : "Analyze"}
              </button>

              <button
                onClick={() => downloadCapture(c.capture_id)}
                className="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Download PCAP
              </button>

              <button
    onClick={() => handleDelete(c.capture_id)}
    className="bg-red-600 text-white px-4 py-1 rounded"
  >
    Delete
  </button>
            </div>
          </div>
        ))}
      </div>

      {/* ANALYSIS RESULT */}
      {analysis && (
        <>
          <h2 className="text-xl font-semibold text-center mb-6">
            Capture ID:{" "}
            <span className="font-mono">{activeCaptureId}</span>
          </h2>

          {/* PACKET COUNT */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-2">Packet Count</h3>
            <p>TCP Packets: {analysis.tcp_packets}</p>
            <p>UDP Packets: {analysis.udp_packets}</p>
          </div>

          {/* DNS QUERIES */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-2">DNS Queries</h3>
            {Object.keys(analysis.dns_queries).length === 0 && (
              <p className="text-gray-500">No DNS queries</p>
            )}
            {Object.entries(analysis.dns_queries).map(([d, c]) => (
              <p key={d}>{d} → {c}</p>
            ))}
          </div>

          {/* SYN FLOOD */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-2">
              SYN Flood Suspects
            </h3>
            {Object.keys(analysis.syn_flood_suspects).length === 0 && (
              <p className="text-gray-500">No suspicious activity</p>
            )}
            {Object.entries(analysis.syn_flood_suspects).map(
              ([ip, count]) => (
                <p key={ip}>{ip} → {count} SYN packets</p>
              )
            )}
          </div>

          {/* TOP SOURCE IPS */}
          <div className="bg-white shadow rounded-lg p-8 mb-10">
            <h3 className="text-xl font-semibold mb-2">Top Source IPs</h3>
            {analysis.top_source_ips.map(([ip, count]) => (
              <p key={ip}>{ip} → {count} packets</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
