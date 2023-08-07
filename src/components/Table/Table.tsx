import classNames from "classnames";
import { notesTableHeaders, summaryTableHeaders } from "../../variables/headers";
import { Note } from "../../types/Note";
import { TableHead } from "../TableHead";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCallback, useMemo } from "react";
import { actions } from "../../redux/reducer";
import { createInfoArray } from "../../helpers/createInfoArray";

type Props = {
  tableName: string;
};

export const Table: React.FC<Props> = ({
  tableName,
}) => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(state => state.notes);
  const archivedNotes = useAppSelector(state => state.archivedNotes);
  const selectedNoteId = useAppSelector(state => state.selectedNote)?.id;
  const onDelete = useCallback((noteId: string) => dispatch(actions.removeNote(noteId)), [dispatch]);
  const onArchive = useCallback((note: Note) => dispatch(actions.archiveNote(note)), [dispatch]);
  const onSelect = useCallback((note: Note) => dispatch(actions.setSelectedNote(note)), [dispatch]);
  const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  const info = useMemo(() => createInfoArray(notes, archivedNotes), [notes, archivedNotes]);

  return (
    <>
    {tableName === 'List of notes' ? (
      <table className="table is-striped is-hoverable is-narrow is-fullwidth">
        <caption className="title">{tableName}</caption>
        <TableHead headers={notesTableHeaders}/>

        <tbody>
          {notes.map((note) => {
            const {
              id,
              name,
              created,
              category,
              content,
            } = note;
            const dates = content.match(dateRegex)?.join(', ');

            return (
              <tr
                key={id}
                className={classNames({ 'has-background-info': selectedNoteId === id })}
              >
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
              </tr>
            )
          })}
        </tbody>
      </table>
    ) : (
      <table className="table is-striped is-hoverable is-narrow is-fullwidth">
        <caption className="title">{tableName}</caption>
        <TableHead headers={summaryTableHeaders}/>

        <tbody>
          {info.map((infoObject) => {
            const {
              category,
              activeCount,
              archivedCount,
            } = infoObject;

            return (
            <tr key={category}>
              <td>{category}</td>
              <td>{activeCount}</td>
              <td>{archivedCount}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    )}
    </>
  );
};
