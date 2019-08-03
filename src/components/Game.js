import React from 'react'
import Board from './Board'
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      histroy: [{ squares: Array(9).fill(null) }],
      next: true
    }
  }
  //判断输赢
  isWin(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }
  handleClick(i) {
    const histroy = this.state.histroy
    const current = this.state.histroy[histroy.length - 1].squares.slice()
    let win = this.isWin(current)
    if (win || current[i]) {
      return
    } else {
      current[i] = this.state.next ? 'X' : 'O'
      this.setState({
        histroy: histroy.concat({ squares: current }),
        next: !this.state.next
      })
    }
  }
  render() {
    const histroy = this.state.histroy
    const current = this.state.histroy[histroy.length - 1].squares
    const winer = this.isWin(current)
    let status = ''
    if (winer) {
      status = '胜利的是:' + winer
    } else {
      status = '下一步棋是:' + (this.state.next ? 'X' : 'O')
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current} handleClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          {/* <ol>{moves}</ol> */}
        </div>
      </div>
    )
  }
}
export default Game
