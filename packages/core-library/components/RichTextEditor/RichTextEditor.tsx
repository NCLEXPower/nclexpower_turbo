import { EditorProvider, generateJSON } from "@tiptap/react";
import { CustomMenuBar } from "./CustomMenus";
import { extensions } from "./config/extentions-config";
import { CustomMenusType } from "../../types/editor-type";
import { Controller, FieldValues } from "react-hook-form";
import { ControlledField } from "../Textfield";
import { useSanitizedInputs } from "../../hooks";
import { FormHelperText } from "../FormHelperText/FormHelperText";
import Placeholder from "@tiptap/extension-placeholder";

type RichTextEditorPropsType = CustomMenusType & {
  onChange?(html: string): void;
  editorClassName?: string;
  placeholder?: string;
  questionType?: string;
  customDependency?: string | number;
  onInsertTable?: () => boolean;
};

export type ControlledRichTextEditorProps<T extends FieldValues> =
  ControlledField<T> & RichTextEditorPropsType;

export function ControlledRichTextEditor<T extends FieldValues>({
  control,
  name,
  onChange: originalOnchange,
  editorFor,
  editorClassName,
  placeholder,
  customDependency,
  questionType,
  onInsertTable,
}: ControlledRichTextEditorProps<T>) {
  const { purifyInputs } = useSanitizedInputs({});

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, onBlur, ref },
        fieldState: { error },
      }) => (
        <EditorProvider
          editorProps={{
            attributes: { class: `tiptap-field p-4  ${editorClassName}` },
          }}
          slotBefore={
            <CustomMenuBar
              customDependency={customDependency}
              editorFor={editorFor}
              content={value}
              questionType={questionType}
              onInsertTable={onInsertTable}
            />
          }
          shouldRerenderOnTransaction={true}
          content={value}
          onUpdate={({ editor }) => {
            onChange(purifyInputs(editor.getHTML()) as string);
          }}
          extensions={[
            ...extensions,
            Placeholder.configure({
              placeholder: placeholder,
            }),
          ]}
          slotAfter={
            error?.message && (
              <FormHelperText error={!!error.message}>
                {error.message}
              </FormHelperText>
            )
          }
          immediatelyRender={true}
        />
      )}
    />
  );
}
