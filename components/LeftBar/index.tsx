"use client";

import { useState } from "react";
import LeftBarCard from "./LeftBarCard";
import CreateTempDialog from "./CreateTempDialog";
import { TemplateProps } from "@/types";

export default function LeftBar() {
  const [templates, setTemplates] = useState<TemplateProps[]>([]);

  return (
    <div className="max-w-[20%] bg-slate-400 w-full flex flex-col gap-1 py-4 px-2">
      <CreateTempDialog setTemplates={setTemplates} />
      {templates.map((template) => (
        <LeftBarCard key={template.id} template={template} />
      ))}
    </div>
  );
}
