import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ReportPhishing() {
  const [form, setForm] = useState({
    url: "",
    email: "",
    reason: "fake-login",
  });
  const [status, setStatus] = useState("");
  const [reportId, setReportId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trackingId = `RPT-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      setStatus("You must be logged in to report phishing.");
      return;
    }

    const { error } = await supabase.from("phishing_reports").insert({
      url: form.url,
      email: form.email,
      reason: form.reason,
      user_id: session.user.id,
      report_id: trackingId,
      status: "Under Review",
    });

    if (error) {
      setStatus("Error submitting report: " + error.message);
    } else {
      setReportId(trackingId);
      setStatus("Phishing attempt reported successfully.");
      setForm({ url: "", email: "", reason: "fake-login" });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-600">Report a Phishing Attempt</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="url"
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="Suspicious URL"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your email (optional)"
          className="w-full p-2 border rounded"
        />
        <select
          name="reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white dark:bg-slate-800 text-black dark:text-white"
        >
          <option value="fake-login">Fake Login Page</option>
          <option value="malware">Malware Link</option>
          <option value="scam-email">Scam Email</option>
          <option value="other">Other</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Report
        </button>
      </form>
      {status && (
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          <p>{status}</p>
          {reportId && (
            <p className="mt-1">
              Tracking ID: <span className="font-mono">{reportId}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
