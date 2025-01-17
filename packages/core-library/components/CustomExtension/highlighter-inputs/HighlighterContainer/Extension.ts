import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import HcpHighlighterNodeView from "./HighlighterContainer"; // Node view component (React component)

export default Node.create({
  name: "hcpHighlighter",

  group: "inline",
  inline: true,
  content: "inline*",
  atom: true,

  parseHTML() {
    return [
      {
        tag: "hcp-highlighter",
      },
    ];
  },

  addAttributes() {
    return {
      name: {
        default: null,
      },
      value: {
        default: null,
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["hcp-highlighter", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(HcpHighlighterNodeView);
  },
});
