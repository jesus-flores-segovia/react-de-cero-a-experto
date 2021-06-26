import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {

      return (
        props.onClick ?
        <button 
          className="square"
          onClick= {props.onClick}
        >
          {props.value}
        </button>
        :
        <button 
          className={props.className}
        >
          {props.value}
        </button>
      );
  }
  class Board extends React.Component {

    renderSquare(i) {
      return (
        this.props.onClick ?
        <Square
          key={i}  
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}
        />
        :
        <Square
          key={"history_" + i}   
          value={this.props.squares[i]}
          className={this.props.className}
        />
      );
    }
  
    render() {
      return (
        <div>
          {
            [1, 2, 3].map((row, rowIdx) => {
              
              return <div key={row} className="board-row">
                {
                  [1, 2, 3].map((col, colIdx) => {
                    
                    return this.renderSquare((3 * rowIdx) + colIdx);
                  })
                }
                </div>
            })
          }
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
      }
    }

    handleClick(i){

      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];

      const squares = current.squares.slice();

      if(calculateWinner(squares) || squares[i]){
        return;
      }

      squares[i] = this.state.xIsNext ? "X": "O";
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        squares: squares,
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length
      });

      const historyButtons = document.querySelectorAll('*[id^="button-"]');
      historyButtons.forEach((value) => { value.style.fontWeight = "normal" });

    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });

      document.getElementById(`button-${step}`).style.fontWeight = "bold";
    }

    render() {

      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);     

      const moves = history.map((step, move) => {
        const desc = move ?
          `Go to move #${move}` :
          `Go to game start`;
        return(
          <li key={`li-${move}`}>
            <button id={`button-${move}`} onClick={() => this.jumpTo(move)}>{desc}</button>
            <Board
              squares={history[move].squares}
              className="history-square"
            />
          </li>
        );
      });

      let status;

      if(winner){
        status = `Winner: ${winner}`;
      }else{
        status = `Next player: ${this.state.xIsNext ? "X": "O"}`;
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
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
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );