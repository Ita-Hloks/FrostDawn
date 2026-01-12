import type { Route } from "./+types/root";
import { QueryClient } from "@tanstack/query-core";
import "./app.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// 内联脚本：在页面渲染前立即执行，避免闪烁
const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('theme');
      var theme = saved ? JSON.parse(saved) : null;
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var effectiveTheme = theme ?? (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', effectiveTheme);
    } catch (e) {
      try { document.documentElement.setAttribute('data-theme', 'light'); } catch(e) {}
    }
  })();
`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* 在 head 中立即执行主题脚本，避免闪烁 */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <title>FrostDawm</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 10 * 60_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details
      = error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  }
  else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
