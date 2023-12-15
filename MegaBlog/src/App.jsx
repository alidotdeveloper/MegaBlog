import './App.css';

function App() {
  const test = import.meta.env.VITE_TEST;
  console.log(test)
  return (
    <>
      <h1>Hello from Mega Blog</h1>
    </>
  )
}

export default App
