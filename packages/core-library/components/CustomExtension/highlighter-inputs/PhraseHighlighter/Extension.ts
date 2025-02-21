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
              name:
                attributes.name ||
                `highlighted-${Math.random().toString(36).substring(2, 15)}`,
            })
            .run();
        },
    };
  },
});

export default HcpHighlighter;
