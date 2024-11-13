const Card = ({ title, id }: { title: string; id: string }) => {
  return (
    <div
      id={id}
      className="flex justify-center items-center bg-blue-400 border border-blue-800 rounded-md py-2"
    >
      {title}
    </div>
  );
};

export default Card;
