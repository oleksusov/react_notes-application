import classNames from "classnames";
import { notesTableHeaders, summaryTableHeaders } from "../../variables/headers";
import { Info } from "../../types/Info";
import { Note } from "../../types/Note";
import { NoteInfo } from "../NoteInfo";
import { SummaryInfo } from "../SummaryInfo";
import { TableHead } from "../TableHead";

type Props = {
  tableName: string;
  notes: Note[];
  info: Info[];
  selectedNoteId?: string;
  onDelete: (id: string) => void;
  onSelect: (note: Note) => void;
  onArchive: (note: Note) => void;
};

export const Table: React.FC<Props> = ({
  tableName,
  notes,
  info,
  selectedNoteId,
  onDelete,
  onSelect,
  onArchive,
}) => {
  return (
    <>
    {tableName === 'List of notes' ? (
      <table className="table is-striped is-hoverable is-narrow is-fullwidth">
        <caption className="title">{tableName}</caption>
        <TableHead headers={notesTableHeaders}/>

        <tbody>
          {notes.map((note) => {          
            return (
              <tr
                key={note.id}
                className={classNames({ 'has-background-info': selectedNoteId === note.id })}
              >
                <NoteInfo
                  note={note}
                  onDelete={onDelete}
                  onSelect={onSelect}
                  onArchive={onArchive}
                />
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
            return (
            <tr key={infoObject.category}>
              <SummaryInfo info={infoObject} />
            </tr>
            )
          })}
        </tbody>
      </table>
    )}
    </>
  );
};
