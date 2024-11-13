import React from "react";
import Card from "./Card";

const cards = [{ title: "Card 1" }, { title: "Card 2" }, { title: "Card 3" }];
const LeftBar = () => {
  return (
    <div className="max-w-[20%] bg-slate-400 w-full flex flex-col gap-1 py-4 px-2">
      {cards.map((card) => (
        <Card key={card.title} title={card.title} />
      ))}
    </div>
  );
};

export default LeftBar;
