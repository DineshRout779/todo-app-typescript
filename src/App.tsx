import TodoList from './components/TodoList';

function App() {
  return (
    <div className='min-h-screen bg-white dark:bg-zinc-900 flex justify-center '>
      <div>
        <h1 className='text-xl text-white dark:text-gray-50 font-semibold mt-4 text-center'>
          Todo App
        </h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
