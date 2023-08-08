import React from 'react';
import './App.css';
import { Table } from './components/Table';
import { Form } from './components/Form';
import { useAppSelector } from './redux/hooks';

export const App: React.FC = () => {
  const selectedNoteId = useAppSelector((state: { selectedNote: any; }) => state.selectedNote)?.id;
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="md:flex space-x-4">
        <div className="md:w-5/12 mb-8 md:mb-0 p-4">
          <Form key={selectedNoteId} />
        </div>

        <div className="md:w-7/12 space-y-4">
          <div className="mt-8">
            <Table
              tableName={"List of notes"}
            />
          </div>

          <div className="mt-8">
            <Table
              tableName={"Summary"}
            />
          </div>
        </div>              
      </div>
    </div>
  );
}
