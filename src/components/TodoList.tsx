import { useState, useEffect } from 'react';
import Todo from './Todo';

export type TodoType = {
  id: string;
  content: string;
  isCompleted: boolean;
};

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[] | null>(
    JSON.parse(localStorage.getItem('todos') ?? '[]') || [
      {
        id: '1',
        content: 'Buy groceries',
        isCompleted: true,
      },
      {
        id: '2',
        content: 'Buy cloths',
        isCompleted: false,
      },
      {
        id: '3',
        content: 'Prepare food',
        isCompleted: false,
      },
      {
        id: '4',
        content: 'Read a book',
        isCompleted: false,
      },
    ]
  );
  const [content, setContent] = useState('');

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim().length !== 0) {
      setTodos((prevTodos) => {
        if (prevTodos === null) {
          return [];
        } else {
          return [
            {
              id: new Date().getTime().toString(),
              content: content,
              isCompleted: false,
            },
            ...prevTodos,
          ];
        }
      });
      setContent('');
    }
  };

  const editTodo = (id: string, newContent: string) => {
    if (newContent.trim().length !== 0) {
      setTodos((prevTodos) => {
        if (prevTodos === null) return null;

        return prevTodos.map((todo) =>
          todo.id === id ? { ...todo, content: newContent } : todo
        );
      });
    }
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => {
      if (prevTodos === null) return null;
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggleTodoStatus = (id: string) => {
    setTodos((prevTodos) => {
      if (prevTodos === null) return null;

      return prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
    });
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='container mx-auto w-full max-w-[768px] p-4'>
      <form onSubmit={addTodo} className='max-w-md mx-auto flex gap-2 my-4'>
        <input
          type='text'
          placeholder='Add a todo'
          id='newTodo'
          name='newTodo'
          className='w-full block border p-2 rounded-md'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type='submit'
          className='p-2 px-4 rounded-md border dark:border-zinc-700 bg-blue-500 text-white'
        >
          ADD
        </button>
      </form>
      <ul className='max-w-md mx-auto text-left space-y-2 my-4'>
        {todos === null
          ? null
          : todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onEdit={editTodo}
                onDelete={deleteTodo}
                onToggleStatus={toggleTodoStatus}
              />
            ))}
      </ul>
    </div>
  );
};

export default TodoList;
