import { InputType, TemplateProps } from "@/types";
import { cn } from "@/utils/helpers/styles";
import { useDraggable } from "@dnd-kit/core";

const LeftBarCard = ({
  template,
  index,
}: {
  template: TemplateProps;
  index: number;
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: template.id,
    data: {
      id: template.id,
      name: template.name,
      type: template.type,
      question: template.question,
      ...(template.type === InputType.TEXT && {
        minLength: template.minLength,
        maxLength: template.maxLength,
      }),
      ...(template.type === InputType.MCQ && {
        options: template.options,
      }),
    },
  });

  return (
    <div
      id={template.id}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "w-full flex flex-col justify-center bg-slate-500 text-white py-2 px-3 z-30",
        index != 0 && "border-t border-gray-400"
      )}
    >
      <p className="pointer-events-none">{template.name}</p>
      <p className="text-xs font-medium text-gray-300 pointer-events-none">
        {template.question}
      </p>
    </div>
  );
};

export default LeftBarCard;
