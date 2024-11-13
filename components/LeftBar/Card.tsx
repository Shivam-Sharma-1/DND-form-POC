const Card = ({
  title,
  id,
  handleDragging,
}: {
  title: string;
  id: string;
  handleDragging: (dragging: boolean) => void;
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("id", `${id}`);
    e.dataTransfer.setData("title", `${title}`);
    handleDragging(true);
  };
  const handleDragEnd = () => handleDragging(false);

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="flex justify-center items-center bg-green-400 border border-green-800 rounded-md py-2"
    >
      {title}
    </div>
  );
};

export default Card;
