import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore/lite';

const Status = ({ isXNext, mode, onModeChange, started, ended }) => {
	const indicatorClassX = classNames('indicator', { active: isXNext });
	const indicatorClassO = classNames('indicator', { active: !isXNext });
	const [tokenId, setTokenId] = useState('')
	const getCurrentStatus = () => {
		if (!started) return 'Start Game!';
		if (ended) return 'Game Over!';
		return `Next turn is:  ${isXNext ? 'X' : 'O'}`;
	};
	async function saveScore() {
		console.log('========>submitted', tokenId)
		const firebaseConfig = {
			apiKey: process.env.API_KEY,
			authDomain: process.env.AUTH_DOMAIN,
			projectId: process.env.PROJECT_ID,
			storageBucket: process.env.STORAGE_BUCKET,
			messagingSenderId: process.env.MESSAGING_SENDER_ID,
			appId: process.env.APP_ID,
			measurementId: process.env.MEASUREMENT_ID,
		};
		const app = initializeApp(firebaseConfig);
		const db = getFirestore(app);
		await setDoc(doc(db, "tic-tac-toe", tokenId), {
			winner: window.localStorage.getItem('winner'),
			mode,
			tokenId
		});
	}
	return (
		<div className="status">
			<span className="select">
				<select onChange={onModeChange} value={mode} name="mode" id="mode">
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Impossible</option>
					<option value="faf">Play against a Friend</option>
				</select>
			</span>
			<div className="indicators">
				<div className={indicatorClassX}>
					<span>X</span>
					<span>0</span>
				</div>
				<div className={indicatorClassO}>
					<span>O</span>
					<span>0</span>
				</div>
			</div>
			<div className={indicatorClassO}>
				<input id="tokenId" name="tokenId" placeholder="input token id" onChange={(e) => setTokenId(e.target.value)}></input>
				<input type="button" value="Submit" onClick={saveScore}></input>
			</div>
			<p className="current-status">{getCurrentStatus()}</p>
		</div>
	);
};

Status.propTypes = {};

export default Status;
