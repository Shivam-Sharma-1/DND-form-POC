import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const MainCard = ({ id, title }: { id: string; title: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  return (
    <div
      id={id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      className="flex justify-center items-center bg-blue-400 border border-blue-800 rounded-md py-2 gap-16"
    >
      <p>{title}</p>
    </div>
  );
};

export default MainCard;
