const API_URL =
  import.meta.env.VITE_API_URL || "https://policy-assistant-backed-1.onrender.com/response";

export async function askPolicyAssistant(query) {
  const url = new URL(API_URL);
  url.searchParams.set("query", query);

  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    throw new Error(`Policy assistant returned ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json() : await res.text();
  const answer = typeof data === "string" ? data : data?.answer;
  if (typeof answer !== "string" || !answer.trim()) {
    throw new Error("Policy assistant response did not include an answer");
  }

  return answer;
}
