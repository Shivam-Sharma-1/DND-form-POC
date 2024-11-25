import { InputType, TemplateProps } from "@/types";
import { useDraggable } from "@dnd-kit/core";

const LeftBarCard = ({ template }: { template: TemplateProps }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
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
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      id={template.id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex justify-center items-center bg-green-400 border border-green-800 rounded-md py-2 z-30"
    >
      {template.name}
    </div>
  );
};

export default LeftBarCard;
