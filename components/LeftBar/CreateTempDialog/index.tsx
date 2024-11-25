"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/shadcn/dialog";
import { Input } from "@/components/UI/shadcn/input";
import { Label } from "@/components/UI/shadcn/label";
import { cn } from "@/utils/helpers/styles";
import {
  InputType,
  TemplateProps,
  TextTemplateProps,
  McqTemplateProps,
} from "@/types";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/UI/shadcn/button";
import TextInputs from "./TextInputs";
import MCQInputs from "./MCQInputs";

const CreateTempDialog = ({
  setTemplates,
}: {
  setTemplates: Dispatch<SetStateAction<TemplateProps[]>>;
}) => {
  const [inputType, setInputType] = useState<InputType>(InputType.TEXT);
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [minLength, setMinLength] = useState<number | undefined>(undefined);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);
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
            options: options,
          } as McqTemplateProps),
    ]);

    setName("");
    setQuestion("");
    setMinLength(undefined);
    setMaxLength(undefined);
    setOptions([]);
    setOptionCount(2);
    setInputType(InputType.TEXT);
  };

  const inputCards =
    inputType === InputType.TEXT ? (
      <TextInputs
        minLength={minLength}
        setMinLength={setMinLength}
        maxLength={maxLength}
        setMaxLength={setMaxLength}
      />
    ) : inputType === InputType.MCQ ? (
      <MCQInputs
        options={options}
        setOptions={setOptions}
        optionCount={optionCount}
        setOptionCount={setOptionCount}
      />
    ) : null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-medium text-md py-6 mx-4">
          Create Template
        </Button>
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
          {inputCards}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTempDialog;
