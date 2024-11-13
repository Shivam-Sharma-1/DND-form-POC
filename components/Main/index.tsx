import Card from "./Card";

const cards = [{ title: "Card 1" }, { title: "Card 2" }, { title: "Card 3" }];
const Main = () => {
  return (
    <div className="w-full flex flex-col gap-4 py-4 px-20">
      {cards.map((card) => (
        <Card key={card.title} title={card.title} />
      ))}
    </div>
  );
};

export default Main;
