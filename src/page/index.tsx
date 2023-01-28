import { useState } from 'react'
import MainModal from './modal'

const Page = () => {
  const [isOpen, setisOpen] = useState(false)
  const [gameType, setgameType] = useState<string>('person-bot')
  const [length, setlength] = useState<number>(3)
  const [gameLevel, setgameLevel] = useState<number>(1)

  return (
    <div>
      <form
        style={{
          backgroundColor: 'rgba(10,10,10,0.1)',
          padding: '10px 10px',
          width: 150,
          display: 'flex',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '10px 0'
          }}>
          <div>
            <p
              style={{
                width: '100%',
                color: '#000',
                fontSize: 18
              }}>
              Game Type
            </p>
          </div>
          <div>
            <input
              type="radio"
              name="game-type"
              id="person-bot"
              checked={gameType === 'person-bot'}
              onChange={() => setgameType('person-bot')}
            />
            &nbsp;
            <label htmlFor="bot">Person Bot</label>
          </div>
          <div>
            <input
              type="radio"
              name="game-type"
              id="bot-bot"
              checked={gameType === 'bot-bot'}
              onChange={() => setgameType('bot-bot')}
            />
            &nbsp;
            <label htmlFor="bot">Bot Bot</label>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '10px 0'
          }}>
          <div>
            <p
              style={{
                width: '100%',
                color: '#000',
                fontSize: 18
              }}>
              Game Level
            </p>
          </div>
          <div>
            <input
              type="radio"
              name="game-level"
              id="easy"
              checked={gameLevel === 1}
              onChange={() => setgameLevel(1)}
            />
            &nbsp;
            <label htmlFor="easy">Easy</label>
          </div>
          <div>
            <input
              type="radio"
              name="game-level"
              id="regular"
              checked={gameLevel === 3}
              onChange={() => setgameLevel(3)}
            />
            &nbsp;
            <label htmlFor="regular">Regular</label>
          </div>
          <div>
            <input
              type="radio"
              name="game-level"
              id="hard"
              checked={gameLevel === 5}
              onChange={() => setgameLevel(5)}
            />
            &nbsp;
            <label htmlFor="hard">Hard</label>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <div>
            <p
              style={{
                width: '100%',
                color: '#000',
                fontSize: 18
              }}>
              <label>Length</label>
            </p>
          </div>
          <div>
            <input
              type="number"
              min={3}
              max={5}
              value={length}
              onChange={(event) =>
                setlength(
                  Number(event.target.value) > 6
                    ? 6
                    : Number(event.target.value) > 2
                    ? Number(event.target.value)
                    : 3
                )
              }
            />
          </div>
        </div>
      </form>
      <button onClick={() => setisOpen(!isOpen)} style={{ marginTop: 20 }}>
        Open
      </button>
      {isOpen && (
        <MainModal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          length={length}
          isBotBattle={gameType === 'bot-bot'}
          gameLevel={gameLevel}
        />
      )}
    </div>
  )
}
export default Page
