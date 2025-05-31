export async function checkURL(url: string) {
  const res = await fetch("http://localhost:5000/api/check-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();
  return data.result;
}
