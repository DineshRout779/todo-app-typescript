import { TodoType } from './TodoList';
import { useState } from 'react';

type TodoProps = {
  todo: TodoType;
  onEdit: (id: string, newContent: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
};

const Todo = ({ todo, onEdit, onDelete, onToggleStatus }: TodoProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<string>('');

  const handleEdit = () => {
    setCurrentTodo(todo.content);
    setIsEditing(true);
  };

  const saveEdit = () => {
    onEdit(todo.id, currentTodo);
    setIsEditing(false);
  };

  return (
    <div className='w-full bg-white dark:bg-zinc-800 p-3 rounded-md border shadow-sm flex justify-between gap-4 items-center flex-wrap dark:border-zinc-700 text-white dark:text-gray-200 '>
      {isEditing ? (
        <input
          type='text'
          name='content'
          id='content'
          className='w-full rounded-md border p-2 dark:text-black'
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
        />
      ) : (
        <label htmlFor={todo.content} className='flex gap-2 items-center'>
          <input
            type='checkbox'
            name={todo.content}
            id={todo.content}
            className=''
            checked={todo.isCompleted}
            onChange={() => onToggleStatus(todo.id)}
          />
          <span className={todo.isCompleted ? 'line-through	' : ''}>
            {todo.content}
          </span>
        </label>
      )}
      <div className='flex items-center gap-2'>
        {isEditing ? (
          <button
            onClick={saveEdit}
            className='text-sm font-semibold p-2 px-4 bg-gray-200 dark:bg-green-500 hover:bg-green-600 hover:text-white rounded-md'
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className='text-sm font-semibold p-2 px-4 bg-gray-200 dark:bg-green-500 hover:bg-green-600 hover:text-white rounded-md'
          >
            Edit
          </button>
        )}
        {isEditing ? (
          <button
            onClick={() => setIsEditing(false)}
            className='text-sm font-semibold p-2 px-4 bg-gray-200 dark:bg-red-500  hover:bg-red-600 hover:text-white rounded-md'
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => onDelete(todo.id)}
            className='text-sm font-semibold p-2 px-4 bg-gray-200 dark:bg-red-500 hover:bg-red-600 hover:text-white rounded-md'
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
