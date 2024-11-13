interface Props {
  title: string;
  id: string;
  handleUpdateList: (id: string, title: string, position?: number) => void;
  handleDragging: (dragging: boolean) => void;
  position: number;
}

const Card = ({
  title,
  id,
  handleDragging,
  handleUpdateList,
  position,
}: Props) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    handleUpdateList(
      e.dataTransfer.getData("id"),
      e.dataTransfer.getData("title"),
      position
    );
    handleDragging(false);
  };

  return (
    <div
      id={id}
      onDrop={handleDrop}
      className="flex justify-center items-center bg-blue-400 border border-blue-800 rounded-md py-2"
    >
      {title}
    </div>
  );
};

export default Card;
