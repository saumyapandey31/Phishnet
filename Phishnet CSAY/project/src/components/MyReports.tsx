// src/components/MyReports.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function MyReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session error:", sessionError.message);
        setLoading(false);
        return;
      }

      const user = session?.user;
      if (user) {
        setUserEmail(user.email);

        const { data, error } = await supabase
          .from("phishing_reports")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching reports:", error.message);
        } else {
          setReports(data);
        }
      }

      setLoading(false);
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading your reports...</p>;
  if (reports.length === 0)
    return (
      <div>
        {userEmail && (
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Hello, {userEmail}
          </h2>
        )}
        <p>You haven't submitted any reports yet.</p>
      </div>
    );

  return (
    <div>
      {userEmail && (
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Reports for: {userEmail}
        </h2>
      )}
      <h3 className="text-2xl font-bold text-blue-600 mb-4">My Phishing Reports</h3>
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="border p-4 rounded-lg bg-gray-50 dark:bg-slate-800"
          >
            <p><strong>Tracking ID:</strong> {report.id}</p>
            <p><strong>URL:</strong> {report.url}</p>
            <p><strong>Reason:</strong> {report.reason}</p>
            <p><strong>Status:</strong> <span className="text-blue-600">{report.status}</span></p>
            <p className="text-sm text-slate-500 mt-2">
              <em>Submitted: {new Date(report.created_at).toLocaleString()}</em>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
