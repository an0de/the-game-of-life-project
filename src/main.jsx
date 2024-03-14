import React from 'react';
import ReactDOM from 'react-dom/client';
import GameOfLife from './game.js';
import './app.css';

function Cell(props) {
  const cellState = props.isAlive ? 'alive' : 'dead';
  return (
    <button className={`cell cell-${cellState}`} />
  );
}

class Field extends React.Component {
  renderCell(i, j) {
    return <Cell isAlive={!!this.props.field.get(i, j)} />;
  }
  
  render() {
    return (
      <div className="field">
        {this.props.field.getAllPos().map(([ i, j ]) => this.renderCell(i, j))}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.game = new GameOfLife(props.rowNum, props.columnNum);
    this.state = {
      field: this.game.field
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.game.advance();
    this.setState({
      field: this.game.field
    });
  }

  render() {
    return (
      <div className="game">
        <Field field={this.state.field} />
      </div>
    );
  }

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game rowNum={32} columnNum={32} />);
