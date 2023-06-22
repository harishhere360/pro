import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

const ItemTypes = {
  CARD: 'card',
};

const App = () => {
  const [columns, setColumns] = useState([
    {
      id: 'column1',
      title: 'To Do',
      cards: [
        { id: 'card1', title: 'Task 1' },
        { id: 'card2', title: 'Task 2' },
      ],
    },
    {
      id: 'column2',
      title: 'On Progress',
      cards: [{ id: 'card3', title: 'Task 3' }],
    },
    {
      id: 'column3',
      title: 'Done',
      cards: [{ id: 'card4', title: 'Task 4' }],
    },
  ]);

  const handleDrop = (targetColumnId, cardId, sourceColumnId) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === sourceColumnId) {
        const newCards = column.cards.filter((card) => card.id !== cardId);
        return { ...column, cards: newCards };
      }
      if (column.id === targetColumnId) {
        const newCards = [...column.cards, { id: cardId, title: `Task ${cardId}` }];
        return { ...column, cards: newCards };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const Column = ({ column }) => {
    const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.CARD,
      drop: (item) => handleDrop(column.id, item.cardId, item.columnId),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    return (
      <div ref={drop} className={`column ${isOver ? 'over' : ''}`}>
        <h2>{column.title}</h2>
        {column.cards.map((card) => (
          <Card key={card.id} card={card} columnId={column.id} />
        ))}
      </div>
    );
  };

  const Card = ({ card, columnId }) => {
    const [{ isDragging }, drag] = useDrag({
      item: { type: ItemTypes.CARD, cardId: card.id, columnId },
      collect: (monitor) =>
      ({
        isDragging: !!monitor.isDragging(),
        }),
        });
        return (
          <div ref={drag} className={`card ${isDragging ? 'dragging' : ''}`}>
            {card.title}
          </div>
        );
        };
        return (
          <DndProvider backend={HTML5Backend}>
          <div className="app">
          <h1>Figma Clone</h1>
          <div className="columns">
          {columns.map((column) => (
          <Column key={column.id} column={column} />
          ))}
          </div>
          </div>
          </DndProvider>
          );
          };
          
          export default App;