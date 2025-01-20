import "@tiptap/core";

interface HcpHighlighterAttributes {
  name?: string | null;
  value?: string | null;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    hcpHighlighter: {
      correctHighlighter: (attributes?: HcpHighlighterAttributes) => ReturnType;
    };
  }
}
