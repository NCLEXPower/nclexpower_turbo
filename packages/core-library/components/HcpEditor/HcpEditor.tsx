import { Editor, JSONContent } from "@tiptap/react";
import { FieldValues, useController } from "react-hook-form";
import { HighlighterEditor } from "../CustomExtension/highlighter-inputs/PhraseHighlighter";
import { ControlledField } from "../../types";
import { DependencyList, Key } from "react";
import { getHighlightedText } from "../CustomExtension/highlighter-inputs/utils/getHighlighted";

type PropsType = {
  onChange?(html: string): void;
  contentEditable?: boolean;
  placeholder?: string;
  getJson?: (value: JSONContent) => void;
  key?: Key | null | undefined;
  customDependencies?: DependencyList;
};

export type ControlledHighlightEditorPropsType<T extends FieldValues> =
  ControlledField<T> & PropsType;

export function ControlledHighlighterEditor<T extends FieldValues>({
  name,
  control,
  getJson,
  onChange: origOnchange,
  contentEditable,
  placeholder,
}: ControlledHighlightEditorPropsType<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control: control,
  });

  const handleChange = (editor: Editor) => {
    const objHighlighted = getHighlightedText(editor.state, "hcpHighlighter");
    origOnchange && origOnchange(editor.getHTML());
    getJson && getJson(objHighlighted);
  };

  return (
    <HighlighterEditor
      placeholder={placeholder}
      contentEditable={contentEditable}
      onChange={(editor: Editor) => {
        onChange(editor.getHTML());
        handleChange(editor);
      }}
      value={value}
      error={error}
    />
  );
}
