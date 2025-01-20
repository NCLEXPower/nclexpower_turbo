import React, { memo, useEffect } from "react";
import { BubbleMenu, Editor, useCurrentEditor } from "@tiptap/react";
import { Box } from "@mui/material";
import { EditorButtonGroup } from "./EditorButtonGroup";
import { CustomMenusType } from "../../types/editor-type";
import { MenuButtons, insertTable } from "./Menus";

type CustomMenuBarPropsType = CustomMenusType & {
  content: string;
  customDependency?: string | number;
  questionType?: string;
  onInsertTable?: (() => boolean) | undefined;
};

export const CustomMenuBar: React.FC<CustomMenuBarPropsType> = memo(
  ({ editorFor, content, questionType, onInsertTable }) => {
    const { editor } = useCurrentEditor();

    if (!editor) return null;

    const handleTableInsertion = (
      questionType: string | undefined,
      onInsertTable: (() => boolean) | undefined,
      editor: Editor
    ): void => {
      if (questionType === "DDT" && onInsertTable?.()) {
        insertTable(editor);
      }
    };

    useEffect(() => {
      handleTableInsertion(questionType, onInsertTable, editor);
    }, [questionType, editor]);

    const menus = MenuButtons({ editor, editorFor });

    useEffect(() => {
      if (!editor) return;
      let { from, to } = editor.state.selection;
      editor.commands.setContent(content, false, {
        preserveWhitespace: "full",
      });
      editor.commands.setTextSelection({ from, to });
    }, [editor, content]);

    switch (editorFor) {
      case "default":
      case "questions":
        return (
          <Box gap={1} display="flex" flexWrap={"wrap"}>
            {editor && (
              <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    borderRadius: 6,
                    backgroundColor: "white",
                    padding: 2,
                  }}
                  boxShadow={4}
                >
                  <EditorButtonGroup menus={menus} />
                </Box>
              </BubbleMenu>
            )}
          </Box>
        );
      case "casestudy":
        return (
          <Box
            gap={1}
            display="flex"
            flexWrap={"wrap"}
            borderBottom={1}
            borderColor={"#F0EEED"}
          >
            <EditorButtonGroup menus={menus} />
          </Box>
        );
      default:
        return null;
    }
  }
);
