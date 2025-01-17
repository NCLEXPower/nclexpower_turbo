import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export default function (props: { node: { attrs: { name: string } } }) {
  const handleSelected = () => {
    console.log("Name attribute:", props.node.attrs.name);
  };

  return (
    <NodeViewWrapper className="hcp-highlight">
      <span onClick={handleSelected} className="highlightable-content">
        <NodeViewContent as="button" className=" content is-editable" />
      </span>
    </NodeViewWrapper>
  );
}
