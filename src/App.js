import { useState } from "react"

function Square({value, onSquareClick}) { 
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


function Board({xIsNext, squares, onPlay}) {
  
  function handleClick(i) {   // i permite poder modificar todos los elementos de nextSquares [0-8]
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // Es un 'returning early' cuando el valor de squares[i] no sea 'null' o cuando haya un campeón
    
    const nextSquares = squares.slice(); //Si slice() está vacío comienza en la posición [0] y lo copia entero
    xIsNext? nextSquares[i]='X' : nextSquares[i]='O';  // Operador ternario?               
    onPlay(nextSquares); // Modifica el valor de nextSquares a squares
  }
  
  const winner = calculateWinner(squares);
  let status;
  (winner)? status = 'Winner: ' + winner : status = 'Next player: ' + (xIsNext? 'X' : 'O')

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={ () => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={ () => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={ () => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={ () => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={ () => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={ () => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={ () => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={ () => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={ () => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]); //Array y función que actualizar las jugadas del juego
  const [currentMove, setCurrentMove] = useState(0);  // Para definir cuál es el movimiento actual
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];  // Guardo en currentSquares para renderizar el movimiento escogido
  
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Función para calcular el campeón basado en las posibles posiciones ganadoras posibles
// para cualquier jugador (9 líneas) expresados con el índice de cada Square en el Board
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game, listed in order of increasing difficulty:

// For the current move only, show “You are at move #…” instead of a button.
// Rewrite Board to use two loops to make the squares instead of hardcoding them.
// Add a toggle button that lets you sort the moves in either ascending or descending order.
// When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
// Display the location for each move in the format (row, col) in the move history list.