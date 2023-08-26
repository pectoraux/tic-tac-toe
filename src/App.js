import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';

class App extends Component {
	render() {
		// addEventListener("input", function(e) { window.localStorage.setItem('tokenId', e.target.value) }, false);
		// const subtn = document.querySelector('#subtn')
		// if (subtn) {
		// 	subtn.addEventListener('click', saveScore, false)
		// }
		return (
			<div className="App">
				<Game />
			</div>
		);
	}
}

export default App;
