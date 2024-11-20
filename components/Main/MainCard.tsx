import { InputType, TemplateProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Label } from "../UI/shadcn/label";
import { Input } from "../UI/shadcn/input";

const MainCard = ({ inputData }: { inputData: TemplateProps }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: inputData.id });

  const inputCard =
    inputData.type === InputType.TEXT ? (
      <div className="flex flex-col justify-center gap-2">
        <Label htmlFor="answer" className="font-medium">
          Answer
        </Label>
        <Input
          id="answer"
          type="text"
          placeholder="Enter the answer"
          className="rounded-md border border-green-800 p-2"
          maxLength={Number(inputData.maxLength)}
        />
      </div>
    ) : (
      ""
    );

  return (
    <div
      id={inputData.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      className="flex justify-center items-center bg-blue-400 border border-blue-800 rounded-md py-2 gap-16"
    >
      <div>
        <p>{inputData.question}</p>
        {inputCard}
      </div>
    </div>
  );
};

export default MainCard;
