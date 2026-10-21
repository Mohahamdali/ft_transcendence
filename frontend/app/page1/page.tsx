
"use client";

import { useState } from "react";

// Read a cookie from the browser.
function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [key, ...value] = cookie.trim().split("=");

    if (key === name) {
      return decodeURIComponent(value.join("="));
    }
  }

  return null;
}

export default function AuthTestPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Obtain the CSRF cookie before a POST request.
  async function getCsrfToken(): Promise<string> {
    const response = await fetch("/api/users/csrf/", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `CSRF initialization failed: HTTP ${response.status}`
      );
    }

    const token = getCookie("csrftoken");

    if (!token) {
      throw new Error(
        "CSRF cookie not found. Check Django CSRF settings."
      );
    }

    return token;
  }

  async function sendRequest(
    endpoint: string,
    method: "GET" | "POST",
    data?: object
  ) {
    setLoading(true);
    setResult("");

    try {
      const headers: Record<string, string> = {};

      // Django requires a CSRF token for unsafe requests.
      if (method === "POST") {
        const csrfToken = await getCsrfToken();

        headers["X-CSRFToken"] = csrfToken;
      }

      if (data !== undefined) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(
        `/api/users/${endpoint}/`,
        {
          method,
          credentials: "include",
          headers,
          ...(data !== undefined
            ? { body: JSON.stringify(data) }
            : {}),
        }
      );

      const text = await response.text();

      setResult(`HTTP ${response.status}\n${text}`);
    } catch (error) {
      setResult(
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        padding: 40,
        maxWidth: 600,
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Authentication Testing</h1>

      <p>Test Django Authentication with CSRF protection.</p>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          display: "block",
          padding: 12,
          marginTop: 20,
          width: "100%",
          color: "black",
          backgroundColor: "white",
          border: "1px solid gray",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          padding: 12,
          marginTop: 10,
          width: "100%",
          color: "black",
          backgroundColor: "white",
          border: "1px solid gray",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 20,
        }}
      >
        <button
          disabled={loading}
          onClick={() =>
            sendRequest("register", "POST", {
              username,
              password,
            })
          }
        >
          Register
        </button>

        <button
          disabled={loading}
          onClick={() =>
            sendRequest("login", "POST", {
              username,
              password,
            })
          }
        >
          Login
        </button>

        <button
          disabled={loading}
          onClick={() => sendRequest("me", "GET")}
        >
          Current User
        </button>

        <button
          disabled={loading}
          onClick={() => sendRequest("logout", "POST")}
        >
          Logout
        </button>
      </div>

      {loading && <p>Sending request...</p>}

      <pre
        style={{
          marginTop: 25,
          padding: 15,
          background: "#eee",
          color: "#111",
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          borderRadius: 8,
        }}
      >
        {result || "Response appears here"}
      </pre>
    </main>
  );
}
