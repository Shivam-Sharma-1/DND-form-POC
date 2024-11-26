import { TemplateProps } from "@/types";
import { cn } from "@/utils/helpers/styles";
import { DragOverlay } from "@dnd-kit/core";

const CustomDragOverlay = ({
  template,
}: {
  template: TemplateProps | null;
}) => {
  if (!template) return null;

  return (
    <DragOverlay>
      <div
        className={cn(
          "w-full flex flex-col justify-center bg-slate-500 text-white py-2 px-3 z-50 shadow-lg"
        )}
      >
        <p>{template.name}</p>
        <p className="text-xs font-medium text-gray-300">{template.question}</p>
      </div>
    </DragOverlay>
  );
};

export default CustomDragOverlay;
