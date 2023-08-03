import React from "react";
import { Note } from "../../types/Note";

type Props = {
  note: Note;
  onDelete?: (id: string) => void;
  onSelect?: (note: Note) => void;
  onArchive?: (note: Note) => void;
};

export const NoteInfo: React.FC<Props> = React.memo(({
  note,
  onDelete = () => {},
  onSelect = () => {},
  onArchive = () => {},
}) => {
  const {
    id,
    name,
    created,
    category,
    content,
  } = note;

  const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;

  let dates = content.match(dateRegex)?.join(', ');
  return (
    <>
      <td>{name}</td>
      <td>{created}</td>
      <td>{category}</td>
      <td>{content}</td>
      <td>{dates}</td>
      <td>
        <button
          className="button update"
          onClick={() => onSelect(note)}
        >
          Update
        </button>
      </td>
      <td>
        <button
          className="button archive"
          onClick={() => onArchive(note)}
        >
          Archive
        </button>
      </td>
      <td>
        <button
          className="button remove"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </td>
    </>
  );
});
