"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../UI/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../UI/shadcn/dialog";
import { Input } from "../UI/shadcn/input";
import { Label } from "../UI/shadcn/label";
import { cn } from "@/utils/helpers/styles";
import {
  InputType,
  TemplateProps,
  TextTemplateProps,
  McqTemplateProps,
} from "@/types";
import { v4 as uuidv4 } from "uuid";
import { PlusIcon } from "lucide-react";

const CreateTempDialog = ({
  setTemplates,
}: {
  setTemplates: Dispatch<SetStateAction<TemplateProps[]>>;
}) => {
  const [inputType, setInputType] = useState<InputType>(InputType.TEXT);
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [minLength, setMinLength] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [optionCount, setOptionCount] = useState(2);

  const handleSubmit = () => {
    setTemplates((prevTemplates) => [
      ...prevTemplates,
      inputType === InputType.TEXT
        ? ({
            id: uuidv4(),
            name: name,
            type: inputType,
            question: question,
            minLength: Number(minLength),
            maxLength: Number(maxLength),
          } as TextTemplateProps)
        : ({
            id: uuidv4(),
            name: name,
            type: inputType,
            question: question,
          } as McqTemplateProps),
    ]);

    setName("");
    setQuestion("");
    setMinLength("");
    setMaxLength("");
  };

  const TextInputs = () => {
    return (
      <>
        <div className="flex flex-col justify-center gap-2">
          <Label htmlFor="minlength" className="font-medium">
            Min Length
          </Label>
          <Input
            id="minlength"
            type="number"
            placeholder="Enter the Minimum length of the answer"
            value={minLength}
            onChange={(e) => setMinLength(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Label htmlFor="maxlength" className="font-medium">
            Max Length
          </Label>
          <Input
            id="maxlength"
            type="number"
            placeholder="Enter the Maximum length of the answer"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
          />
        </div>
      </>
    );
  };

  const MCQInputs = () => {
    return (
      <>
        {Array.from({ length: optionCount }).map((_, index) => (
          <MCQOption key={index} index={index} />
        ))}
        <Button
          variant="ghost"
          onClick={() => setOptionCount(optionCount + 1)}
          className="w-fit flex justify-center items-center gap-2 hover:bg-transparent h-fit p-0"
        >
          <PlusIcon size={16} />
          Add Option
        </Button>
      </>
    );
  };

  const MCQOption = ({ index }: { index: number }) => {
    return (
      <div className="flex flex-col justify-center gap-2">
        <Label htmlFor={`option-${index}`} className="font-medium">
          Option {index + 1}
        </Label>
        <Input
          id={`option-${index}`}
          placeholder="Enter the option"
          value={options[index]}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }}
        />
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Template</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create Template</DialogTitle>
          <DialogDescription>
            Create a new template to use in your forms.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-col justify-center gap-2">
            <Label htmlFor="name" className="font-medium">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter the name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Label htmlFor="name" className="font-medium">
              Choose the input type
            </Label>
            <div className="flex items-center gap-2">
              <p
                className={cn(
                  "border border-border p-2 cursor-pointer rounded-md",
                  inputType === InputType.TEXT && "border-primary"
                )}
                onClick={() => setInputType(InputType.TEXT)}
              >
                Text
              </p>
              <p
                className={cn(
                  "border border-border p-2 cursor-pointer rounded-md",
                  inputType === InputType.MCQ && "border-primary"
                )}
                onClick={() => setInputType(InputType.MCQ)}
              >
                MCQ
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Label htmlFor="question" className="font-medium">
              Question
            </Label>
            <Input
              id="question"
              placeholder="Enter the question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          {inputType === InputType.TEXT ? (
            <TextInputs />
          ) : (
            InputType.MCQ && <MCQInputs />
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTempDialog;
