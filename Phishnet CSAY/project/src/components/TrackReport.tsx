import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function TrackReport() {
  const [trackId, setTrackId] = useState("");
  const [result, setResult] = useState<any | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      setResult("unauthenticated");
      return;
    }

    const { data, error } = await supabase
      .from("phishing_reports")
      .select("*")
      .eq("report_id", trackId.trim())
      .eq("user_id", session.user.id)
      .single();

    if (error || !data) {
      setResult("not-found");
    } else {
      setResult(data);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-600">Track Your Report</h2>
      <form onSubmit={handleSearch} className="space-y-4 mt-4">
        <input
          type="text"
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
          placeholder="Enter Tracking ID"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Check Status
        </button>
      </form>

      {result === "unauthenticated" && (
        <p className="mt-4 text-red-500">You must be logged in to track a report.</p>
      )}
      {result === "not-found" && (
        <p className="mt-4 text-red-500">No report found with that ID.</p>
      )}
      {result && result !== "unauthenticated" && result !== "not-found" && (
        <div className="mt-4 p-4 border rounded bg-gray-50 dark:bg-slate-800">
          <p><strong>Tracking ID:</strong> {result.report_id}</p>
          <p><strong>URL:</strong> {result.url}</p>
          <p><strong>Reason:</strong> {result.reason}</p>
          <p><strong>Status:</strong> <span className="text-blue-600">{result.status}</span></p>
        </div>
      )}
    </div>
  );
}
