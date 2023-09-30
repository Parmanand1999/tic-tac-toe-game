import React, { useEffect, useState } from 'react'
import Square from './Square'

const Board = () => {
    const [state, setState] = useState(Array(9).fill(null))
    // console.log(state, "fghjk")
    const [isXTurn, setIsXTurn] = useState(true)
    const [xScore, setXScore] = useState(parseInt(localStorage.getItem('xScore')) || 0);
    const [oScore, setOScore] = useState(parseInt(localStorage.getItem('oScore')) || 0);
    const handleClick = (index) => {
        if (state[index] !== null) {
            return
        }
        const copyState = [...state];
        copyState[index] = isXTurn ? "X" : "O"
        setState(copyState)
        setIsXTurn(!isXTurn)
    }
    const checkWiner = () => {
        const winnerLogic = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]

        ];
        for (let logic of winnerLogic) {
            const [a, b, c] = logic;
            if (state[a] !== null && state[a] === state[b] && state[a] === state[c])
                return state[a];
        }
        return false
    }
    const isWinner = checkWiner();
    const playAgainHandler = () => {
        setState(Array(9).fill(null))
    }


    useEffect(() => {
        const isBoardFull = state.every(square => square !== null);
        const winner = checkWiner();

        if (isBoardFull && !winner) {
            alert('It\'s a draw!');
            setState(Array(9).fill(null));
        } else if (winner === 'X') {
            setXScore(prevXScore => prevXScore + 1);
            localStorage.setItem('xScore', xScore + 1);
        } else if (winner === 'O') {
            setOScore(prevOScore => prevOScore + 1);
            localStorage.setItem('oScore', oScore + 1);
        }
    }, [state, isWinner]);
    const resetScorehandler = () => {
        localStorage.removeItem('xScore');
        localStorage.removeItem('oScore');


        setXScore(0);
        setOScore(0);
    }

    return (
        <>
            <div className='flex  justify-center items-center mt-10'>
                <div>
                    <p className='text-white'>X Score: {xScore}</p>
                    <p className='text-white'>O Score: {oScore}</p>
                </div>
                <div className='ml-4'>
                    <button onClick={resetScorehandler} className='text-white border border-white rounded-sm p-1'>Reset score</button>
                </div>
            </div>

            {isWinner ? (<div className="flex-col flex items-center justify-center ">

                <h4 className="text-white">{isWinner} won the game</h4>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={playAgainHandler}>
                    Play Again
                </button>
            </div>) :

                <div className='flex-col flex items-center justify-center mt-10 '>
                    <h4 className='text-white'>Player {isXTurn ? "X" : "0"} Please Move</h4>
                    <div className='flex'>
                        <Square onClick={() => handleClick(0)} value={state[0]} />
                        <Square onClick={() => handleClick(1)} value={state[1]} />
                        <Square onClick={() => handleClick(2)} value={state[2]} />
                    </div>
                    <div className='flex'>
                        <Square onClick={() => handleClick(3)} value={state[3]} />
                        <Square onClick={() => handleClick(4)} value={state[4]} />
                        <Square onClick={() => handleClick(5)} value={state[5]} />
                    </div>
                    <div className='flex'>
                        <Square onClick={() => handleClick(6)} value={state[6]} />
                        <Square onClick={() => handleClick(7)} value={state[7]} />
                        <Square onClick={() => handleClick(8)} value={state[8]} />
                    </div>
                </div>

            }

        </>
    )
}

export default Board