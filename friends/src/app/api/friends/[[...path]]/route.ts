
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    path?: string[];
  }>;
};

async function handleRequest(
  request: Request,
  context: RouteContext
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = process.env.DJANGO_API_TOKEN;

  if (!apiUrl || !token) {
    return NextResponse.json(
      { error: "Missing API configuration" },
      { status: 500 }
    );
  }

  const { path = [] } = await context.params;
  const endpoint = path.join("/");
  const method = request.method;

  const allowedGet = [
    "",
    "users",
    "requests",
    "sent-requests",
  ];

  const allowedPost = [
    "send-request",
    "remove",
  ];

  const validGet =
    method === "GET" && allowedGet.includes(endpoint);

  const validPost =
    method === "POST" &&
    (
      allowedPost.includes(endpoint) ||
      /^(accept|reject)-request\/\d+$/.test(endpoint)
    );

  if (!validGet && !validPost) {
    return NextResponse.json(
      { error: "Invalid API endpoint" },
      { status: 404 }
    );
  }

  const djangoUrl = endpoint
    ? `${apiUrl.replace(/\/$/, "")}/${endpoint}/`
    : `${apiUrl.replace(/\/$/, "")}/`;

  try {
    const headers = new Headers({
      Authorization: `Token ${token}`,
    });

    const contentType = request.headers.get("content-type");

    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    const response = await fetch(djangoUrl, {
      method,
      headers,
      body: method === "POST" ? await request.text() : undefined,
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { error: "Cannot connect to Django" },
      { status: 502 }
    );
  }
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  return handleRequest(request, context);
}

export async function POST(
  request: Request,
  context: RouteContext
) {
  return handleRequest(request, context);
}
