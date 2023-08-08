import classNames  from 'classnames';
import { categories } from "../../types/Category";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Note } from '../../types/Note';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { months } from '../../variables/months';
import { actions } from '../../redux/reducer';
import { getNewNoteId } from '../../helpers/getNewNoteId';

export const Form: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedNote = useAppSelector(state => state.selectedNote);
  const addNote = useCallback((note: Note) => dispatch(actions.addNote(note)), [dispatch]);
  const updateNote = useCallback((note: Note) => dispatch(actions.updateNote(note)), [dispatch]);
  const onReset = () => dispatch(actions.setSelectedNote(null));
  
  const [noteName, setNoteName] = useState(selectedNote?.name || '');
  const [hasNameError, setHasNameError] = useState(false);
  const [noteCategory, setNoteCategory] = useState(selectedNote?.category || '');
  const [hasCategoryError, setHasCategoryError] = useState(false);
  const [noteContent, setNoteContent] = useState(selectedNote?.content || '');
  const [hasContentError, setHasContentError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasNameError(!noteName);
    setHasCategoryError(!noteCategory);
    setHasContentError(!noteContent);

    if (!noteName || !noteCategory || !noteContent) {
      return;
    }

    const dateObject = new Date();
    const year = dateObject.getFullYear();
    const month = months[dateObject.getMonth()];
    const day = dateObject.getDate();

    if (selectedNote) {
      updateNote({
        id: selectedNote?.id,
        name: noteName,
        created: `${month} ${day}, ${year}`,
        category: noteCategory,
        content: noteContent,
      });
    } else {
      addNote({
        id: getNewNoteId(),
        name: noteName,
        created: `${month} ${day}, ${year}`,
        category: noteCategory,
        content: noteContent,
      });
    }

    reset();
  };

  const reset = () => {
    setNoteName('');
    setNoteCategory('');
    setNoteContent('');
    setHasNameError(false);
    setHasCategoryError(false);
    setHasContentError(false);

    onReset();
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteName(event.target.value);
    setHasNameError(false);
  };
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNoteCategory(event.target.value);
    setHasCategoryError(false);
  };

  const handleTexrareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(event.target.value);
    setHasContentError(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedNote?.id]);

  return (
    <form
      onSubmit={handleSubmit}
      onReset={reset}
      className="w-full max-w-md mx-auto"
    >
      <div className="mb-6">
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="field-name"
        >
          Name
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            className={classNames(
              'shadow border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-600',
              {
                'border-red-500': hasNameError,
              },
            )}
            value={noteName}
            onChange={handleInputChange}
            type="text"
            id="field-name"
            placeholder="Note name"
          />

          {hasNameError && (
            <p className="absolute text-red-500 text-xs mt-1">Please enter some name</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="field-category"
        >
          Category
        </label>
        <div className="relative">
          <select
            id="field-category"
            className={classNames(
              'shadow border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-600',
              {
                'border-red-500': hasCategoryError,
              },
            )}
            value={noteCategory}
            onChange={handleSelectChange}
          >
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {hasCategoryError && (
            <p className="absolute text-red-500 text-xs mt-1">Please choose some category</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="field-content"
        >
          Note content
        </label>
        <textarea
          className={classNames(
            'shadow border h-32 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-600',
            {
              'border-red-500': hasContentError,
            },
          )}
          style={{ resize: 'none' }}
          id="field-content"
          value={noteContent}
          onChange={handleTexrareaChange}
          placeholder="Content"
        ></textarea>
        {hasContentError && (
          <p className="absolute text-red-500 text-xs mt-1">Please enter some content</p>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-center space-x-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
          <button type="reset" className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">Cancel</button>
        </div>
      </div>
    </form>
  );
};
