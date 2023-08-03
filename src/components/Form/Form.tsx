import classNames  from 'classnames';
import { categories } from "../../types/Category";
import { useEffect, useRef, useState } from 'react';
import { Note } from '../../types/Note';
import { months } from '../../variables/months';

type Props = {
  onSubmit: (note: Note) => void;
  onReset?: () => void;
  note?: Note;
};

export const Form: React.FC<Props> = ({
  onSubmit,
  onReset = () => {},
  note,
}) => {
  const [noteName, setNoteName] = useState(note?.name || '');
  const [hasNameError, setHasNameError] = useState(false);
  const [noteCategory, setNoteCategory] = useState(note?.category || '');
  const [hasCategoryError, setHasCategoryError] = useState(false);
  const [noteContent, setNoteContent] = useState(note?.content || '');
  const [hasContentError, setHasContentError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  function getNewNoteId() {
    return Math.random().toFixed(12).slice(2);
  }

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

    onSubmit({
      id: note?.id || getNewNoteId(),
      name: noteName,
      created: `${month} ${day}, ${year}`,
      category: noteCategory,
      content: noteContent,
    });

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
  }, [note?.id]);

  return (
    <form
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <div className="field">
        <label className="label" htmlFor="field-name">Name</label>
        <div className="control">
          <input
            ref={inputRef}
            className={classNames(
              'input',
              {
                'is-danger': hasNameError,
              },
            )}
            value={noteName}
            onChange={handleInputChange}
            type="text"
            id="field-name"
            placeholder="Note name"
          />
        </div>

        {hasNameError && (
          <p className="help is-danger">Please enter some name</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="field-category">Category</label>
        <div className="control">
          <div className={classNames(
              'select',
              {
                'is-danger': hasCategoryError,
              },
            )}>
            <select
              id="field-category"
              value={noteCategory}
              onChange={handleSelectChange}
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {hasCategoryError && (
          <p className="help is-danger">Please choose some category</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="field-content">Note content</label>
        <textarea
          className={classNames(
            'textarea',
            {
              'is-danger': hasContentError,
            },
          )}
          id="field-content"
          value={noteContent}
          onChange={handleTexrareaChange}
          placeholder="Content"
        ></textarea>

        {hasContentError && (
          <p className="help is-danger">Please enter some content</p>
        )}
      </div>

      <div className="field">
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button type="submit" className="button is-primary">Submit</button>
          </div>

          <div className="control">
            <button type="reset" className="button is-light">Cancel</button>
          </div>
        </div>
      </div>
    </form>
  );
};
