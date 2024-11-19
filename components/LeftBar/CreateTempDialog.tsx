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

const CreateTempDialog = ({
  setTemplates,
}: {
  setTemplates: Dispatch<SetStateAction<TemplateProps[]>>;
}) => {
  const [inputType, setInputType] = useState<InputType>(InputType.text);
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [minLength, setMinLength] = useState("");
  const [maxLength, setMaxLength] = useState("");

  const handleSubmit = () => {
    setTemplates((prevTemplates) => [
      ...prevTemplates,
      inputType === InputType.text
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Template</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
                  inputType === InputType.text && "border-primary"
                )}
                onClick={() => setInputType(InputType.text)}
              >
                Text
              </p>
              <p
                className={cn(
                  "border border-border p-2 cursor-pointer rounded-md",
                  inputType === InputType.mcq && "border-primary"
                )}
                onClick={() => setInputType(InputType.mcq)}
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
          {inputType === InputType.text && <TextInputs />}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTempDialog;
