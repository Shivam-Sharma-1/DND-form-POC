"use client";

import { Dispatch, SetStateAction } from "react";
import LeftBarCard from "./LeftBarCard";
import CreateTempDialog from "./CreateTempDialog";
import { TemplateProps } from "@/types";
import CustomDragOverlay from "./CustomDragOverlay";

export default function LeftBar({
  activeTemplate,
  templates,
  setTemplates,
}: {
  activeTemplate: TemplateProps | null;
  templates: TemplateProps[];
  setTemplates: Dispatch<SetStateAction<TemplateProps[]>>;
}) {
  return (
    <div className="max-w-[20%] bg-slate-600 w-full flex flex-col justify-between py-4 sticky top-0 left-0 h-screen max-h-screen z-30">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-2xl font-semibold text-left text-white mx-4">
          Your Templates
        </h1>
        <div className="flex flex-col items-center">
          {templates.map((template, index) => (
            <LeftBarCard key={template.id} template={template} index={index} />
          ))}
        </div>
        <CustomDragOverlay template={activeTemplate} />
      </div>
      <CreateTempDialog setTemplates={setTemplates} />
    </div>
  );
}
