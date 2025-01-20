import StarterKit from "@tiptap/starter-kit";
import HcpHighlight from "./Extension";
import { EditorContent, useEditor } from "@tiptap/react";
import { Box, Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import Placeholder from "@tiptap/extension-placeholder";
import { FieldError } from "react-hook-form";
import { FormHelperText } from "../../../FormHelperText/FormHelperText";
import React, { useEffect } from "react";
import { IconButton } from "../../../Button/IconButton";

type PropsType = {
  contentEditable?: boolean | undefined;
  onChange?: (...event: any[]) => void;
  value?: string;
  placeholder?: string | undefined;
  error?: FieldError | undefined;
};

export const HighlighterEditor: React.FC<PropsType> = ({
  contentEditable = true,
  onChange,
  placeholder,
  error,
  value: content,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      HcpHighlight,
      Placeholder.configure({
        placeholder: placeholder ?? "",
      }),
    ],
    editable: contentEditable,
    parseOptions: { preserveWhitespace: true },
    immediatelyRender: true,
    onUpdate: ({ editor }) => {
      onChange && onChange(editor);
    },
  });

  useEffect(() => {
    if (!editor) return;
    let { from, to } = editor.state.selection;
    editor.commands.setContent(content ?? "", false, {
      preserveWhitespace: "full",
    });
    editor.commands.setTextSelection({ from, to });
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  const isHighlighted = editor.isActive("hcpHighlighter");

  const toggleHighlight = () => {
    if (isHighlighted) {
      editor.commands.unsetMark("hcpHighlighter");
    } else {
      editor.commands.correctHighlighter();
    }
  };

  return (
    <React.Fragment>
      {contentEditable && (
        <>
          <Box p={2} gap={2} flexWrap="wrap" display="flex">
            <Button
              variant={!isHighlighted ? "outlined" : "contained"}
              sx={{
                fontSize: "14px",
                borderRadius: "5px",
              }}
              onClick={toggleHighlight}
            >
              Highlight Phrase
            </Button>

            <IconButton onClick={() => editor.commands.undo()}>
              <UndoIcon />
            </IconButton>
            <IconButton onClick={() => editor.commands.redo()}>
              <RedoIcon />
            </IconButton>
          </Box>
          <hr />
        </>
      )}
      <Box p={2}>
        <EditorContent editor={editor} />
      </Box>
      {error?.message && (
        <FormHelperText error={!!error.message}>{error.message}</FormHelperText>
      )}
    </React.Fragment>
  );
};
