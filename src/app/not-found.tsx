import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex h-screen items-center justify-center ">
      <div className="text-center space-y-3">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-600" />
        <h1 className="text-3xl font-bold">404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </main>
  );
}
