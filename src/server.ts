// STEP 1 — A web server using only Node's built-in `http` module. No Express yet.
//
// Every backend framework (Express, Fastify, NestJS) is built on top of exactly this.
// Writing it by hand once shows you what those frameworks do for you.

import http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";

const PORT = Number(process.env.PORT) || 3000;

// A small helper: every response we send is JSON, so set the header + status in one place.
function sendJson(
  res: ServerResponse,
  statusCode: number,
  body: unknown,
): void {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

// This ONE function is called for EVERY request that hits the server.
// `req` = what the client sent (method, url, headers, body).
// `res` = what we send back (status code, headers, body).
// There's no built-in routing: deciding what to do with `req.method` + `req.url` is our job.
function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  const start = Date.now();

  // Simple request logger. 'finish' fires once the response has been fully sent.
  res.on("finish", () => {
    console.log(
      `${req.method} ${req.url} -> ${res.statusCode} (${Date.now() - start}ms)`,
    );
  });

  // req.url includes the query string ("/tasks?status=done"), so parse it into a URL object.
  // The base ("http://localhost") is only needed because req.url is a relative path.
  const url = new URL(req.url ?? "/", "http://localhost");

  if (req.method === "GET" && url.pathname === "/") {
    return sendJson(res, 200, { message: "Welcome to the TaskFlow API" });
  }

  if (req.method === "GET" && url.pathname === "/health") {
    // A "health check" endpoint. In production, load balancers and Docker call this
    // to ask "is this server alive?". process.uptime() = seconds since Node started.
    return sendJson(res, 200, { status: "ok", uptime: process.uptime() });
  }

  if (req.method === "GET" && url.pathname === "/time") {
    // Returns the server's current time in ISO 8601 format, e.g. "2026-11-14T09:30:00.000Z".
    return sendJson(res, 200, { now: new Date().toISOString() });
  }

  if (req.method === "GET" && url.pathname === "/greet") {
    // Reads ?name=... from the query string. Returns 400 if the client didn't send it.
    const name = url.searchParams.get("name");

    if (!name) {
      return sendJson(res, 400, {
        error: "Query parameter 'name' is required",
      });
    }

    return sendJson(res, 200, { message: `Hello, ${name}` });
  }

  // Nothing matched -> 404 Not Found.
  sendJson(res, 404, {
    error: `Route ${req.method} ${url.pathname} not found`,
  });
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`TaskFlow API listening on http://localhost:${PORT}`);
});
