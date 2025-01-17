import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import HcpHighlighterNode from "./Extension"; // Import the custom node
import { useEffect } from "react";
import { Box, IconButton } from "@mui/material";

type PropsType = {
  value?: string;
};

export const HighlighterContainer: React.FC<PropsType> = ({
  value: content,
}) => {
  const editor = useEditor({
    extensions: [StarterKit, HcpHighlighterNode], // Register the extensions
    editable: true,
    content:
      content ??
      `
      <p></p><p>Hello <hcp-highlighter name="highlighted-3" class="hcp-highlighter" style="cursor: pointer;">world</hcp-highlighter></p>
      <p><hcp-highlighter name="highlighted-2" class="hcp-highlighter" style="cursor: pointer;">Hello world</hcp-highlighter></p>
    `,
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

  console.log(editor.getHTML());

  return (
    <>
      <Box p={2} gap={2} flexWrap="wrap" display="flex">
        <IconButton onClick={() => editor.commands.correctHighlighter()}>
          Add Highlight
        </IconButton>
      </Box>

      <hr />
      <EditorContent editor={editor} />
    </>
  );
};
