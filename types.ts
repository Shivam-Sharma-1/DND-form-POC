export enum InputType {
  "text",
  "mcq",
}

export interface TemplatePropsBase {
  id: string;
  name: string;
  type: InputType;
  question: string;
}

export interface TextTemplateProps extends TemplatePropsBase {
  type: InputType.text;
  minLength: number;
  maxLength: number;
}

export interface McqTemplateProps extends TemplatePropsBase {
  type: InputType.mcq;
}

export type TemplateProps = TextTemplateProps | McqTemplateProps;
