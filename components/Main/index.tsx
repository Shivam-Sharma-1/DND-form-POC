import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Dispatch, SetStateAction } from "react";
import { TemplateProps } from "@/types";
import MainCard from "./MainCard";
import { cn } from "@/utils/helpers/styles";

export default function Main({
  inputsList,
  setInputsList,
}: {
  inputsList: TemplateProps[];
  setInputsList: Dispatch<SetStateAction<TemplateProps[]>>;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  return (
    <SortableContext
      items={inputsList.map((input) => input.id)}
      strategy={verticalListSortingStrategy}
    >
      <div
        className={cn(
          "w-full h-full flex flex-col gap-4 py-4 px-20 items-center",
          isOver ? "" : ""
        )}
        ref={setNodeRef}
      >
        {inputsList.map((input) => (
          <MainCard
            key={input.id}
            inputData={input}
            setInputsList={setInputsList}
          />
        ))}
      </div>
    </SortableContext>
  );
}
