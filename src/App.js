import { useState } from "react";

// Esta es la funcion que define a cada cuadrado de la tabla
function Square({ value, onSquareClick }) {
  // Esta funcion retorna cada cuadrado en forma de boton
  /* Cada boton tiene una prop llamada "onClick" que reacciona a los clicks 
     y ejecuta la funcion "handleclick" cada que onClick se dispara por un click. 
  */
  return (
    /* La prop onClick llama a la funcion onSquareClick que funciona como PUENTE 
    para enviar informacion a la funcion PADRE, donde posteriormente se definira
    a que llama la funcion onSquareClick, es importante para que el PUENTE funcione,
    que la funcion onSquareClick sea pasada por el argumento de SQUARE */
    <button className="square" onClick={onSquareClick}>
      {/* Aqui se define el contenido de cada boton, entre llaves se situa
        value, que señala el estado actual definido por useState */}
      {value}
    </button>
  );
}

// Esta es la Funcion que define la tabla
// Cada elemento de la tabla (Square) es la funcion que define a cada cuadrado
export default function Board() {
  /* Como se planea que esta funcion BOARD sea la nueva funcion padre, se crea el 
  siguiente ESTADO en forma de MATRIZ para que la memoria del estado de cada cuadrado
  ahora se situe en un Array que se encuentra en la funcion PADRE */
  const [squares, setSquares] = useState(Array(9).fill(null));

  /* En este estado se define si se quiere RENDERIZAR "x" u "0" */
  const [xIsNext, setXIsNext] = useState(true);

  /* Esta funcion con argumento de la posicion de la matriz:
    - Primero verifica que squares[i] sea igual a null, es decir que no este definido 
      o que aun no se ha definido un ganador 
    - Si esta definido, RETORNA la funcion para impedir que continue y haga cambios. 
    - Genera una constante (nextSquares) que es igual a una copia de la MATRIZ 
    - Segun el estado (true o false) de xIsNext se define nextSquares[i] como "x" u "o"
    - Se cambia el ESTADO al valor de nextSquares que es igual a "x"
  */
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext); // Se cambia el estado de xIsNext para dar paso al siguiente turno
  }

  // Se crea una constante "winner" y se conecta con la funcion que declara al ganador
  // Se crea una variable "status" que define si ya gano alguien o si toca el sig. turno
  const winner = calculateWinner(squares);
  let status;

  /* 
  Si "winner" es igual a TRUE, el estatus es igual a "Ganador: "x" u "o"
  Si "winner es igual a NULL, el estatus es igual a Siguiente Jugador: "x" u "o" 
  */
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      {/* En este div se renderiza el STATUS para saber si ya gano alguien o mencionar
      al siguiente turno */}
      <div className="status">{status}</div>
      {
        // La Clase board-row determina una fila de una tabla
        /* 
        Si se declara: 
        onSquareClick={handleClick(0)}
        se generará un BUCLE INFINITO por que la funcion se llama directamente 

        Para evitar el bucle infinito se tendria que declarar de la siguiente forma: 
        onSquareClick={() => handleClick(0)}
        */
      }
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

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
