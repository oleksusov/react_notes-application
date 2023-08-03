import React, { useCallback, useMemo, useState } from 'react';
import './App.css';
import { Table } from './components/Table';
import { Form } from './components/Form/Form';
import { Note } from './types/Note';
import { data } from './variables/data';
import { categories } from './types/Category';

export const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([...data]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  function createInfoArray(active: Note[], archived: Note[]) {
    const infoArray = [];
  
    for (const category of categories) {
      infoArray.push({ category: category, activeCount: 0, archivedCount: 0 });
    }
  
    infoArray.map((infoRow) => {
      infoRow.activeCount = active.filter((note) => note.category === infoRow.category).length;
      infoRow.archivedCount = archived.filter((note) => note.category === infoRow.category).length;
    });
  
    return infoArray;
  }
  
  const info = useMemo(() => createInfoArray(notes, archivedNotes), [notes, archivedNotes]);

  const addNote = useCallback(
    (newNote: Note) => {
      setNotes(currentNotes => [...currentNotes, newNote]);
    }
  , []);

  const deleteNote = useCallback((noteId: string) => {
    setNotes(currentNotes => currentNotes.filter(note => note.id !== noteId));
  }, []);

  const archiveNote = useCallback((archiveNote: Note) => {
    setNotes(currentNotes => {
      const newNotes = [...currentNotes];
      const index = newNotes.findIndex(note => note.id === archiveNote.id);

      newNotes.splice(index, 1);
    return newNotes;
    });
    setArchivedNotes(currentNotes => [...currentNotes, archiveNote]);
  }, []); 

  const updateNote = useCallback((updateNote: Note) => {
    setNotes(currentNotes => {
      const newNotes = [...currentNotes];
      const index = newNotes.findIndex(note => note.id === updateNote.id);

      newNotes.splice(index, 1, updateNote);

      return newNotes;
    });
  }, []);

  return (
    <div className="App">
      <div className="section">
        <div className="container">
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                {selectedNote ? (
                  <Form
                    key={selectedNote.id}
                    onSubmit={updateNote}
                    note={selectedNote}
                    onReset={() => setSelectedNote(null)}
                  />
                ) : (
                  <Form onSubmit={addNote} />
                )}
              </div>

              <div className="column">
                <div className="box table-container">
                  <Table
                    tableName={"List of notes"}
                    info={info}
                    notes={notes}
                    selectedNoteId={selectedNote?.id}
                    onDelete={deleteNote}
                    onSelect={setSelectedNote}
                    onArchive={archiveNote}
                  />
                </div>

                <div className="box table-container">
                  <Table
                    tableName={"Summary"}
                    info={info}
                    notes={notes}
                    selectedNoteId={selectedNote?.id}
                    onDelete={deleteNote}
                    onSelect={setSelectedNote}
                    onArchive={archiveNote}
                  />
                </div>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
