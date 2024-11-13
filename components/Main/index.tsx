import { Data } from "@/hooks/useDragDrop";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";

interface Props {
  listItems: Data[];
  handleUpdateList: (id: string, title: string, position?: number) => void;
  handleDragging: (dragging: boolean) => void;
}

const Main = ({ listItems, handleDragging, handleUpdateList }: Props) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleUpdateList(
      e.dataTransfer.getData("id"),
      e.dataTransfer.getData("title")
    );
    handleDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="w-full h-full flex flex-col gap-4 py-4 px-20"
    >
      {listItems.map((card, index) => (
        <Card
          key={uuidv4()}
          id={card.id}
          title={card.title}
          position={index}
          handleDragging={handleDragging}
          handleUpdateList={handleUpdateList}
        />
      ))}
    </div>
  );
};

export default Main;
