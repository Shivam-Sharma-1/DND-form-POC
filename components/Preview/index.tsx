import { TemplateProps } from "@/types";
import PreviewCard from "./PreviewCard";
import { Button } from "../UI/shadcn/button";

const Preview = ({ inputsList }: { inputsList: TemplateProps[] }) => {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="bg-white max-w-[800px] w-full py-6 px-6 flex flex-col gap-4 rounded-md">
        {inputsList.map((input) => (
          <PreviewCard key={input.id} inputData={input} />
        ))}
        <div className="flex justify-end items-center">
          <Button className="">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
