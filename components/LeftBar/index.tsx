import Card from "./Card";
import { v4 as uuidv4 } from "uuid";

const cards = [{ title: "Card 1" }, { title: "Card 2" }, { title: "Card 3" }];

const LeftBar = ({
  handleDragging,
}: {
  handleDragging: (dragging: boolean) => void;
}) => {
  return (
    <div className="max-w-[20%] bg-slate-400 w-full flex flex-col gap-1 py-4 px-2">
      {cards.map((card) => (
        <Card
          key={card.title}
          id={uuidv4()}
          title={card.title}
          handleDragging={handleDragging}
        />
      ))}
    </div>
  );
};

export default LeftBar;
