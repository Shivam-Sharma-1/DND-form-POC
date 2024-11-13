import React from "react";

const Card = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center items-center bg-green-400 border border-green-800 rounded-md py-2">
      {title}
    </div>
  );
};

export default Card;
