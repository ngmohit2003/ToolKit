// const PACKET_API = "http://127.0.0.1:8003"; // change if needed

// function authHeaders() {
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//   };
// }

// // Start capture (60 seconds)
// export async function startCapture() {
//   const res = await fetch(`${PACKET_API}/capture/start`, {
//     method: "POST",
//     headers: authHeaders(),
//   });

//   if (!res.ok) throw new Error("Capture failed");
//   return res.json();
// }

// // Analyze capture
// export async function analyzeCapture(captureId) {
//   const res = await fetch(
//     `${PACKET_API}/capture/analyze/${captureId}`,
//     {
//       headers: authHeaders(),
//     }
//   );

//   if (!res.ok) throw new Error("Analysis failed");
//   return res.json();
// }

import { showError,showSuccess } from "../utils/toast";
const BASE = "http://127.0.0.1:8003";

function authHeaders() {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}


export async function startCapture() {
  const res = await fetch(`${BASE}/capture/start`, {
    method: "POST",
    headers: authHeaders(),
  });
  return res.json();
}

export async function listCaptures() {
  const res = await fetch(`${BASE}/capture/list`, {
    headers: authHeaders(),
  });
  return res.json();
}

export async function analyzeCapture(captureId) {
  const res = await fetch(`${BASE}/capture/analyze/${captureId}`, {
    headers: authHeaders(),
  });
  return res.json();
}

/* ✅ FIXED DOWNLOAD */
// export async function downloadCapture(captureId) {
//   const res = await fetch(`${BASE}/capture/download/${captureId}`, {
//     headers: authHeaders(),
//   });

//   if (!res.ok) {
//     throw new Error("Download failed");
//   }

//   const blob = await res.blob();
//   const url = window.URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `${captureId}.pcap`;
//   document.body.appendChild(a);
//   a.click();

//   a.remove();
//   window.URL.revokeObjectURL(url);
// }

export async function downloadCapture(captureId) {
  try {
    const res = await fetch(`${BASE}/capture/download/${captureId}`, {
      headers: authHeaders(),
    });

    if (!res.ok) {
      throw new Error("Download failed");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${captureId}.pcap`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

    // ✅ SUCCESS TOAST HERE
    showSuccess("Download successfully 📥");

  } catch (error) {
    showError("Failed to download file ❌");
    console.error(error);
  }
}
// new thing added

export async function deleteCapture(captureId) {
  const res = await fetch(`${BASE}/capture/delete/${captureId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete capture");
  }

  return res.json();
}
