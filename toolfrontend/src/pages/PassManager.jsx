import React, { useEffect, useState } from "react";
import { showError, showSuccess } from "../utils/toast";
import {
  createPassword,
  getPasswords,
  updatePassword,
  deletePassword,
} from "../api/passwordApi";

export default function PassManager() {
  const [passwords, setPasswords] = useState([]);
  const [form, setForm] = useState({
    service_name: "",
    username: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);

  const loadPasswords = async () => {
    const data = await getPasswords();
    
    setPasswords(data);

  };

  useEffect(() => {
    loadPasswords();
  }, []);

  const submit = async () => {
    if (editingId) {
      await updatePassword(editingId, form);
      showSuccess("Password entry updated successfully");
      setEditingId(null);
    } else {
      if (!form.service_name.trim() || !form.username.trim() || !form.password.trim()) {
    alert("All fields are required");
    return;
  }
      await createPassword(form);
      showSuccess("Password entry created successfully");
    }

    setForm({ service_name: "", username: "", password: "" });
    loadPasswords();
  };

  const edit = (p) => {
    setEditingId(p.id);
    setForm({
      service_name: p.service,
      username: p.username,
      password: p.password,
    });
  };

  const remove = async (id) => {
    await deletePassword(id);
    showSuccess("Password entry deleted successfully");
    loadPasswords();
  };

  return (
    <div className="max-w-5xl mx-auto py-16 text-white">
      <h1 className="text-3xl mb-8">🔐 Password Vault</h1>

      {/* FORM */}
      <div className="bg-gray-900 p-6 rounded mb-10">
        <input
          placeholder="Service (e.g. Gmail)"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          value={form.service_name}
          onChange={(e) =>
            setForm({ ...form, service_name: e.target.value })
          }
        />

        <input
          placeholder="Username"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          placeholder="Password"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={submit}
          className="bg-blue-600 px-6 py-2 rounded"
        >
          {editingId ? "Update Password" : "Save Password"}
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {passwords.map((p) => (
          <div
            key={p.id}
            className="bg-gray-800 p-4 rounded border border-gray-700"
          >
            <h3 className="font-bold">{p.service}</h3>
            <p>👤 {p.username}</p>
            <p className="break-all">🔑 {p.password}</p>

            <div className="mt-3 flex gap-4">
              <button
                onClick={() => edit(p)}
                className="text-yellow-400"
              >
                Edit
              </button>
              <button
                onClick={() => remove(p.id)}
                className="text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
