import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import React from "react";
import { Editor } from "@tiptap/react";
import { CustomMenusType, MenuButtonType } from "../../types/editor-type";

type MenuButtonPropsType = CustomMenusType & {
  editor: Editor;
};

export const MenuButtons = ({ editor, editorFor }: MenuButtonPropsType) => {
  const createButton = (
    label: string,
    onClick: () => void,
    icon?: React.ReactNode,
    disabled: boolean = false,
    isActive: boolean = false
  ): MenuButtonType => ({
    label,
    icon,
    onClick,
    isActive,
    disabled,
  });

  const typographyStyles = [
    createButton(
      "bold",
      () => editor.chain().focus().toggleBold().run(),
      <FormatBoldIcon />,
      !editor.can().chain().focus().toggleBold().run(),
      editor.isActive("bold")
    ),
    createButton(
      "Italic",
      () => editor.chain().focus().toggleItalic().run(),
      <FormatItalicIcon />,
      !editor.can().chain().focus().toggleItalic().run(),
      editor.isActive("italic")
    ),
    createButton(
      "Underline",
      () => editor.chain().focus().toggleUnderline().run(),
      <FormatUnderlinedIcon />,
      !editor.can().chain().focus().toggleUnderline().run(),
      editor.isActive("underline")
    ),
  ];

  const headings = [
    createButton(
      "Paragraph",
      () => editor.chain().focus().setParagraph().run(),
      undefined,
      false,
      editor.isActive("paragraph")
    ),
    createButton(
      "Heading",
      () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      undefined,
      false,
      editor.isActive("heading", { level: 2 })
    ),
  ];

  const listStyles = [
    createButton(
      "Unordered list",
      () => editor.chain().focus().toggleBulletList().run(),
      <FormatListBulletedIcon />,
      false,
      editor.isActive("bulletList")
    ),
    createButton(
      "Ordered list",
      () => editor.chain().focus().toggleOrderedList().run(),
      <FormatListNumberedIcon />,
      false,
      editor.isActive("orderedList")
    ),
    createButton(
      "Sink list",
      () => editor.chain().focus().sinkListItem("listItem").run(),
      undefined,
      !editor.can().sinkListItem("listItem"),
      false
    ),
    createButton(
      "Lift list",
      () => editor.chain().focus().liftListItem("listItem").run(),
      undefined,
      !editor.can().liftListItem("listItem"),
      false
    ),
  ];

  const tableButtons: MenuButtonType[] = [
    createButton("Insert Table", () =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run()
    ),
    createButton(
      "Add column before",
      () => editor.chain().focus().addColumnBefore().run(),
      undefined,
      !editor.can().addColumnBefore()
    ),
    createButton(
      "Add column after",
      () => editor.chain().focus().addColumnAfter().run(),
      undefined,
      !editor.can().addColumnAfter()
    ),
    createButton(
      "Delete column",
      () => editor.chain().focus().deleteColumn().run(),
      undefined,
      !editor.can().deleteColumn()
    ),
    createButton(
      "Add row before",
      () => editor.chain().focus().addRowBefore().run(),
      undefined,
      !editor.can().addRowBefore()
    ),
    createButton(
      "Add row after",
      () => editor.chain().focus().addRowAfter().run(),
      undefined,
      !editor.can().addRowAfter()
    ),
    createButton(
      "Delete row",
      () => editor.chain().focus().deleteRow().run(),
      undefined,
      !editor.can().deleteRow()
    ),
    createButton(
      "Delete table",
      () => editor.chain().focus().deleteTable().run(),
      undefined,
      !editor.can().deleteTable()
    ),
    createButton(
      "Merge or Split",
      () => editor.chain().focus().mergeOrSplit().run(),
      undefined,
      !editor.can().mergeOrSplit()
    ),
  ];

  const revertButtons: MenuButtonType[] = [
    createButton(
      "Undo",
      () => editor.chain().focus().undo().run(),
      <UndoIcon />,
      !editor.can().chain().focus().undo().run()
    ),
    createButton(
      "Redo",
      () => editor.chain().focus().redo().run(),
      <RedoIcon />,
      !editor.can().chain().focus().redo().run()
    ),
  ];

  const superScript: MenuButtonType[] = [
    createButton(
      "Toggle Superscript",
      () => editor.chain().focus().toggleSuperscript().run(),
      undefined,
      editor.isActive('superscript')
    ),
    createButton(
      "Set Superscript",
      () => editor.chain().focus().setSuperscript().run(),
      undefined,
      editor.isActive('superscript')
    ),
    createButton(
      "Unset Superscript",
      () => editor.chain().focus().unsetSuperscript().run(),
      undefined,
      !editor.isActive('superscript')
    ),
  ];

  const getButtons = () => {
    switch (editorFor) {
      case "default":
        return [...typographyStyles];
      case "questions":
        return [...typographyStyles, ...listStyles];
      case "casestudy":
        return [
          ...typographyStyles,
          ...headings,
          ...listStyles,
          ...tableButtons,
          ...revertButtons,
          ...superScript
        ];
      default:
        return [];
    }
  };

  return getButtons();
};

export const insertTable = (editor: any) => {
  editor
    .chain()
    .focus()
    .insertContent(" ")
    .insertTable({ rows: 4, cols: 2, withHeaderRow: true })
    .run();
  editor.commands.setTextSelection(1);
};
