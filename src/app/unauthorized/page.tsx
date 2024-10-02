"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const Unauthorized: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <Lock className="mx-auto h-16 w-16 text-red-600" />
        <h1 className="mt-4 text-4xl font-bold text-red-600">
          403 Access Not Granted
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, you do not have permission to view this page.
        </p>
        <Button variant="outline" className="mt-6" onClick={handleRedirect}>
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
