import { EditorState } from "prosemirror-state";
import { HighlightedTextsObj } from "../type";

export const getHighlightedText = (
  state: EditorState,
  markName: string
): HighlightedTextsObj[] => {
  const { doc, schema } = state;
  const markType = schema.marks[markName];

  if (!markType) {
    return [];
  }

  const highlightedTexts: HighlightedTextsObj[] = [];

  doc.descendants((node) => {
    if (node.isText && markType.isInSet(node.marks)) {
      const [mark] = node.marks;
      const hasHcp = node.marks.some((n) => n.type.name === markName);
      const [hcpAttrName] = node.marks
        .filter((n) => n.type.name === markName)
        .map((n) => n.attrs.name);

      if (hasHcp && hcpAttrName) {
        highlightedTexts.push({
          text: node.text || "",
          attr: hcpAttrName,
        });
      }
    }
  });

  return highlightedTexts;
};
