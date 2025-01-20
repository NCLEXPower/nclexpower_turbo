import { mergeAttributes, Mark } from "@tiptap/core";

const HcpHighlighter = Mark.create({
  name: "hcpHighlighter",

  addAttributes() {
    return {
      name: {
        default: null,
      },
      value: {
        default: null,
      },
      class: {
        default: "hcp-highlighter",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "hcp-highlighter",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "hcp-highlighter",
      mergeAttributes(HTMLAttributes, {
        style: " cursor: pointer;",
        class: "hcp-highlighter",
      }),
    ];
  },

  addCommands() {
    return {
      correctHighlighter:
        (attributes = {}) =>
        ({ chain }) => {
          return chain()
            .focus()
            .setMark(this.name, {
              ...attributes,
              name: attributes.name || `highlighted-${Date.now()}`,
            })
            .run();
        },
    };
  },
});

export default HcpHighlighter;
