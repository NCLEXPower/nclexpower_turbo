import StarterKit, { StarterKitOptions } from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Superscript from "@tiptap/extension-superscript";
import TableRow, { TableRowOptions } from "@tiptap/extension-table-row";
import Underline, { UnderlineOptions } from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import Gapcursor from "@tiptap/extension-gapcursor";
import Placeholder, { PlaceholderOptions } from "@tiptap/extension-placeholder";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign, { TextAlignOptions } from "@tiptap/extension-text-align";
import { Extension, Node } from "@tiptap/core";
import { Mark } from "@tiptap/core";
import Subscript from "@tiptap/extension-subscript";
import TextStyle from "@tiptap/extension-text-style";
import { Color, ColorOptions } from "@tiptap/extension-color";

export const extensions: (
  | Extension<StarterKitOptions, any>
  | Extension<PlaceholderOptions, any>
  | Mark<UnderlineOptions, any>
  | Node<TableRowOptions, any>
  | Extension<TextAlignOptions, any>
  | Extension<ColorOptions, any>
)[] = [
  ListItem,
  StarterKit.configure({
    heading: {
      HTMLAttributes: {
        class: "tiptap-heading text-xl font-bold font-primary",
      },
    },
    listItem: false,
    bulletList: false,
    orderedList: false,
  }),
  BulletList.configure({
    keepMarks: true,
    HTMLAttributes: {
      class: "list-disc mx-6 tiptap-list",
    },
  }),
  Superscript,
  Subscript,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Gapcursor,
  Color,
  OrderedList.configure({
    keepMarks: true,
    HTMLAttributes: {
      class: "list-decimal mx-6 tiptap-decimal",
    },
  }),
  Underline,
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: "tiptap-table",
    },
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: "tiptap-row",
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: "tiptap-th",
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: "tiptap-cell",
    },
  }),
];
