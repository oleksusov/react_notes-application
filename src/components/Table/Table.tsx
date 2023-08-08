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
      <table className="table w-full bg-white">
        <caption className="text-xl font-semibold mb-2">{tableName}</caption>
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
                className={classNames({ 'bg-blue-100': selectedNoteId === id })}
              >
                <td className="py-2 px-4 border">{name}</td>
                <td className="py-2 px-4 border">{created}</td>
                <td className="py-2 px-4 border">{category}</td>
                <td className="py-2 px-4 border">{content}</td>
                <td className="py-2 px-4 border">{dates}</td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-center items-center">
                    <button
                      className="button update"
                      onClick={() => onSelect(note)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-center items-center">
                  <button
                    className="button archive"
                    onClick={() => onArchive(note)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </button>
                  </div>
                </td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-center items-center">
                    <button
                      className="button remove"
                      onClick={() => onDelete(id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    ) : (
      <table className="table w-full bg-white">
        <caption className="text-xl font-semibold mb-2">{tableName}</caption>
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
              <td className="py-2 px-4 border">{category}</td>
              <td className="py-2 px-4 border">{activeCount}</td>
              <td className="py-2 px-4 border">{archivedCount}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    )}
    </>
  );
};
