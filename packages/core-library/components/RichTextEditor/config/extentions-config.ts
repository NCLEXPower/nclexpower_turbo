import StarterKit, { StarterKitOptions } from '@tiptap/starter-kit'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow, { TableRowOptions } from '@tiptap/extension-table-row'
import Underline, { UnderlineOptions } from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import Placeholder, { PlaceholderOptions } from '@tiptap/extension-placeholder'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import { Extension, Node } from '@tiptap/core'
import { Mark } from '@tiptap/core'

export const extensions: (Extension<StarterKitOptions, any> | Extension<PlaceholderOptions, any> | Mark<UnderlineOptions, any> | Node<TableRowOptions, any>)[] = [
    ListItem,
    StarterKit.configure({
        heading: {
            HTMLAttributes: {
                class: 'text-xl font-bold font-primary'
            }
        },
        listItem: false,
        bulletList: false,
        orderedList: false,
    }),
    BulletList.configure({
        keepMarks: true,
        HTMLAttributes: {
            class: 'list-disc mx-6'
        }
    }),
    OrderedList.configure({
        keepMarks: true,
        HTMLAttributes: {
            class: 'list-decimal mx-6 '
        }
    }),
    Table.configure({
        resizable: true,
        HTMLAttributes: {
            class: 'tiptap',
        },
    }),
    Underline,
    TableRow.configure({
        HTMLAttributes: {
            class: 'border  px-3 py-8'
        }
    }),
    TableHeader.configure({
        HTMLAttributes: {
            class: 'border border-black/40 bg-black/10 relative font-bold text-start p-2'
        }
    }),
    TableCell.configure({
        HTMLAttributes: {
            class: ' border border-black/40 relative align-top  p-2'
        }
    }),
]