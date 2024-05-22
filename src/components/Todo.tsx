import { TodoType } from './TodoList';
import { useState } from 'react';

type TodoProps = {
  todo: TodoType;
  onEdit: (id: string, newTask: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
};

const Todo = ({ todo, onEdit, onDelete, onToggleStatus }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  return (
    <div className='w-full bg-white dark:bg-zinc-800 p-3 rounded-md border shadow-sm flex justify-between gap-4 items-center flex-wrap dark:border-zinc-700 text-white dark:text-gray-200 '>
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
    </div>
  );
};

export default Todo;
