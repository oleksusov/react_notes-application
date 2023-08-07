import { Note } from '../types/Note';
import { data } from '../variables/data';

type SetAction = {
  type: 'notes/SET';
  payload: Note | null;
};

const setSelectedNote = (note: Note | null): SetAction => ({
  type: 'notes/SET',
  payload: note,
});

type AddAction = {
  type: 'notes/ADD';
  payload: Note;
};

const addNote = (newNote: Note): AddAction => ({
  type: 'notes/ADD',
  payload: newNote,
});

type RemoveAction = {
  type: 'notes/REMOVE';
  payload: string;
};

const removeNote = (noteId: string): RemoveAction => ({
  type: 'notes/REMOVE',
  payload: noteId,
});

type UpdateAction = {
  type: 'notes/UPDATE';
  payload: Note;
};

const updateNote = (updateNote: Note): UpdateAction => ({
  type: 'notes/UPDATE',
  payload: updateNote,
});

type ArchiveAction = {
  type: 'notes/ARCHIVE';
  payload: Note;
};

const archiveNote = (archiveNote: Note): ArchiveAction => ({
  type: 'notes/ARCHIVE',
  payload: archiveNote,
});

type Action = SetAction
| AddAction
| RemoveAction
| UpdateAction
| ArchiveAction;

interface AppState {
  notes: Note[];
  archivedNotes: Note[];
  selectedNote: Note | null;
}

const initialState: AppState = {
  notes: [...data],
  archivedNotes: [],
  selectedNote: null,
};

export const actions = { setSelectedNote, addNote, removeNote, updateNote, archiveNote };

const reducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'notes/SET':
      return {
        ...state,
        selectedNote: action.payload,
      };

    case 'notes/ADD':
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case 'notes/REMOVE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      };

    case 'notes/UPDATE':
      const updatedNotes = state.notes.map(note =>
        note.id === action.payload.id ? action.payload : note
      );
      return {
        ...state,
        notes: updatedNotes,
      };

    case 'notes/ARCHIVE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload.id),
        archivedNotes: [...state.archivedNotes, action.payload],
      };
    
    default:
      return state;
  }
};

export default reducer;
