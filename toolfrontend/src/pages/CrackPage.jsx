// import React, { useState } from "react";
// import { startCrackerJob, getJobStatus } from "../api";

// export default function CrackPage() {
//   const [targetHash, setTargetHash] = useState("");
//   const [jobId, setJobId] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleStart = async (e) => {
//     e.preventDefault();
//     if (!targetHash) return alert("Paste hash");

//     setLoading(true);
//     setResult(null);

//     const resp = await startCrackerJob({ target_hash: targetHash });
//     if (!resp.ok) {
//       alert("Failed to start job");
//       setLoading(false);
//       return;
//     }

//     setJobId(resp.job_id);
//     poll(resp.job_id);
//   };

//   const poll = (id) => {
//     const t = setInterval(async () => {
//       const j = await getJobStatus(id);
//       setStatus(j.status);

//       if (j.status === "done" || j.status === "failed") {
//         clearInterval(t);
//         setResult(j.result || { error: j.error });
//         setLoading(false);
//       }
//     }, 1000);
//   };

//   return (
//     <div className="w-[960px] mx-auto py-20 text-white">
//       <h1 className="text-[2.5rem] text-center mb-8">Crack Hash</h1>

//       <form
//         onSubmit={handleStart}
//         className="w-[60%] mx-auto flex flex-col gap-4"
//       >
//         <input
//           className="bg-[#243647] text-[#94ADC7] px-4 py-3 rounded-md"
//           placeholder="Paste hash here"
//           value={targetHash}
//           onChange={(e) => setTargetHash(e.target.value)}
//         />

//         <button
//           className="bg-[#1A80E5] py-2 rounded-md"
//           disabled={loading}
//         >
//           {loading ? "Cracking..." : "Start"}
//         </button>
//       </form>

//       {status && (
//         <p className="text-center mt-4 text-gray-400">
//           Status: {status}
//         </p>
//       )}

//       {result && (
//         <div className="mt-10 bg-[#1f2937] p-6 rounded-md w-[40%] mx-auto text-center">
//           <p><b>Algorithm:</b> {result.algorithm}</p>
//           <p><b>Found:</b> {result.found ? "Yes" : "No"}</p>
//           <p><b>Compromised:</b> {result.compromised ? "Yes" : "No"}</p>
//           {result.plaintext && (
//             <p className="mt-2 text-green-400">
//               <b>Password:</b> {result.plaintext}
//             </p>
//           )}
//           {result.error && (
//             <p className="text-red-400">{result.error}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";
import { startCrackerJob, getJobStatus } from "../api/api";

export default function CrackPage() {
  const [targetHash, setTargetHash] = useState("");
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStart = async (e) => {
    e.preventDefault();

    const cleanHash = targetHash.trim();
    if (!cleanHash) return alert("Paste hash");

    setLoading(true);
    setResult(null);
    setStatus("starting");

    try {
      const resp = await startCrackerJob({
        target_hash: cleanHash,
      });

      if (!resp || !resp.job_id) {
        throw new Error("Failed to start job");
      }

      setJobId(resp.job_id);
      poll(resp.job_id);
    } catch (err) {
      alert(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  const poll = (id) => {
    const interval = setInterval(async () => {
      try {
        const j = await getJobStatus(id);
        setStatus(j.status);

        if (j.status === "done" || j.status === "failed") {
          clearInterval(interval);
          setResult(j.result || { error: j.error });
          setLoading(false);
        }
      } catch (err) {
        clearInterval(interval);
        setLoading(false);
        setResult({ error: "Failed to fetch job status" });
      }
    }, 1000);
  };

  return (
    <div className="w-[960px] mx-auto py-20 text-white">
      <h1 className="text-[2.5rem] text-center mb-8">Crack Hash</h1>

      <form
        onSubmit={handleStart}
        className="w-[60%] mx-auto flex flex-col gap-4"
      >
        <input
          className="bg-[#243647] text-[#94ADC7] px-4 py-3 rounded-md"
          placeholder="Paste hash here (no spaces)"
          value={targetHash}
          onChange={(e) => setTargetHash(e.target.value)}
        />

        <button
          className="bg-[#1A80E5] py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Cracking..." : "Start"}
        </button>
      </form>

      {status && (
        <p className="text-center mt-4 text-gray-400">
          Status: {status}
        </p>
      )}

      {result && (
        <div className="mt-10 bg-[#1f2937] p-6 rounded-md w-[40%] mx-auto text-center">
          {result.error ? (
            <p className="text-red-400">{result.error}</p>
          ) : (
            <>
              <p><b>Algorithm:</b> {result.algorithm}</p>
              <p><b>Found:</b> {result.found ? "Yes" : "No"}</p>
              <p><b>Compromised:</b> {result.compromised ? "Yes" : "No"}</p>

              {result.plaintext && (
                <p className="mt-2 text-green-400">
                  <b>Password:</b> {result.plaintext}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
