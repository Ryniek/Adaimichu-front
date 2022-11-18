import './App.css';

function App() {
  return (
    <div className="container">
  <h1>Hello</h1>
  <p>Test</p>
  <li>
          <button
            onClick={event => alert(event.target.id)}
          >
            <span role="img" aria-label="grinning face" id="grinning face">😀</span>
          </button>
        </li>
  </div>
  );
}

export default App;
