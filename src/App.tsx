import React from 'react';
import './App.css';
import { Table } from './components/Table';
import { Form } from './components/Form';
import { useAppSelector } from './redux/hooks';

export const App: React.FC = () => {
  const selectedNoteId = useAppSelector((state: { selectedNote: any; }) => state.selectedNote)?.id;
  return (
    <div className="App">
      <div className="section">
        <div className="container">
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <Form key={selectedNoteId} />
              </div>

              <div className="column">
                <div className="box table-container">
                  <Table
                    tableName={"List of notes"}
                  />
                </div>

                <div className="box table-container">
                  <Table
                    tableName={"Summary"}
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
