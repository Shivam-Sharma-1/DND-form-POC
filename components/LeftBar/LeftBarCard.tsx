import { useDraggable } from "@dnd-kit/core";

const LeftBarCard = ({ title, id }: { title: string; id: string }) => {
  // const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.dataTransfer.setData("id", `${id}`);
  //   e.dataTransfer.setData("title", `${title}`);
  //   handleDragging(true);
  // };
  // const handleDragEnd = () => handleDragging(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { title: title },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      id={id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex justify-center items-center bg-green-400 border border-green-800 rounded-md py-2"
    >
      {title}
    </div>
  );
};

export default LeftBarCard;
