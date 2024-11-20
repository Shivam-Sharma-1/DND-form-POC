export enum InputType {
  TEXT = "text",
  MCQ = "mcq",
}

export interface TemplatePropsBase {
  id: string;
  name: string;
  type: InputType;
  question: string;
}

export interface TextTemplateProps extends TemplatePropsBase {
  type: InputType.TEXT;
  minLength: number;
  maxLength: number;
}

export interface McqTemplateProps extends TemplatePropsBase {
  type: InputType.MCQ;
}

export type TemplateProps = TextTemplateProps | McqTemplateProps;
