import React, { useState } from "react";
import { generateHashes } from "../api/api";
import { showError, showSuccess } from "../utils/toast";
export default function Hash_gen() {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!text) return alert("Enter password");

    setLoading(true);
    try {
      const result = await generateHashes(text);
      setHashes(result);
      showSuccess("Hashes generated successfully");
    } catch (err) {
      alert(err.message);
      showError("Failed to generate hashes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[960px] mx-auto py-20 text-white">
      <h1 className="text-[2.5rem] text-center mb-8">Hash Generator</h1>

      <form onSubmit={handleGenerate} className="w-[60%] mx-auto flex flex-col gap-4">
        <input
          className="bg-[#243647] text-[#94ADC7] px-4 py-3 rounded-md"
          placeholder="Enter password"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="bg-[#1A80E5] py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Hashes"}
        </button>
      </form>

      {hashes && (
        <div className="mt-10 bg-[#1f2937] p-6 rounded-md w-[80%] mx-auto ">
          <p className="mb-2"><b>SHA-256</b></p>
          <pre className="break-all bg-[#243647] p-3 rounded whitespace-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600">{hashes.sha256}</pre>

          <p className="mt-4 mb-2"><b>SHA-512</b></p>
          <pre className="break-all bg-[#243647] p-3 rounded whitespace-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600">{hashes.sha512}</pre>

          <p className="mt-4 mb-2"><b>Bcrypt</b></p>
          <pre className="break-all bg-[#243647] p-3 rounded">{hashes.bcrypt}</pre>

          <p className="mt-4 mb-2"><b>Argon2</b></p>
          <pre className="break-all bg-[#243647] p-3 rounded whitespace-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600">{hashes.argon2}</pre>

         <p className="mt-4 mb-2"><b>Blake2</b></p>
          <pre className="break-all bg-[#243647] p-3 rounded">{hashes.blake2}</pre>
          
        </div>
      )}
    </div>
  );
}
