import React from "react";
import EditFormPage from "./EditFormPage";

export default function EditPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Edit Student</h1>
      </div>
      <EditFormPage />
    </main>
  );
}
