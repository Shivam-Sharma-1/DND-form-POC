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

  // const reorderInputsList = (e: DragEndEvent) => {
  //   if (!e.over) return;

  //   setInputsList((prevInputsList) => {
  //     const oldIndex = prevInputsList.findIndex(
  //       (input) => input.id === e.active.id
  //     );
  //     const newIndex = prevInputsList.findIndex(
  //       (input) => input.id === e.over!.id
  //     );
  //     return arrayMove(prevInputsList, oldIndex, newIndex);
  //   });
  // };

  return (
    <div
      className={cn(
        "w-full h-full flex flex-col gap-4 py-4 px-20 items-center",
        isOver ? "" : ""
      )}
      ref={setNodeRef}
      // style={{ color: isOver ? "border border-2 border-blue-400" : "" }}
    >
      {/* <DndContext onDragEnd={reorderInputsList}> */}
      <SortableContext
        items={inputsList.map((input) => input.id)}
        strategy={verticalListSortingStrategy}
      >
        {inputsList.map((input) => (
          <MainCard
            key={input.id}
            inputData={input}
            setInputsList={setInputsList}
          />
        ))}
      </SortableContext>
      {/* </DndContext> */}
    </div>
  );
}
