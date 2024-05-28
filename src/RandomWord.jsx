import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
export default function RandomWord() {
  //https://random-word-api.herokuapp.com/word?number=10
  //https://random-word-api.vercel.app/api?words=12

  const [randomWords, setRandomWords] = useState([]);
  const [open, setOpen] = useState(false);

  const ref = useRef();
  let pos = { x: 0, y: 0 };

  const getRandomWords = () => {
    fetch('https://random-word-api.vercel.app/api?words=12')
      .then((res) => res.json())
      .then((data) => setRandomWords(data));
  };

  const addRandomWords = () => {
    fetch('https://random-word-api.vercel.app/api?words=12')
      .then((res) => res.json())
      .then((data) => setRandomWords([...randomWords, ...data]));
  };

  useEffect(() => {
    getRandomWords();
  }, []);

  function handlePos(e) {
    pos.x = e.clientX;
    pos.y = e.clientY;
    // console.log(e.target);
    // console.log('pos', pos);
  }

  const setPositions = () => {
    let randomTop = Math.floor(
      Math.random() * (ref.current.offsetHeight - ref.current.offsetTop)
    );
    let randomLeft = Math.floor(
      Math.random() * (ref.current.offsetWidth - ref.current.offsetLeft)
    );
    let coordinates = [randomTop, randomLeft];
    return coordinates;
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    // setOpen(!open);
    // console.log(open);
    alert('oldu');
  };

  return (
    <div className="randomword">
      <div className="btnGroup">
        <button className="refreshBtn" onClick={() => getRandomWords()}>
          <i className="fa-solid fa-arrows-rotate fa-2xl"></i>
        </button>
        <button className="addBtn" onClick={() => addRandomWords()}>
          <i className="fa-solid fa-plus fa-2xl"></i>
        </button>
      </div>

      <div className="randomwords" ref={ref}>
        {randomWords.map((w, i) => (
          <Draggable key={i} bounds="parent">
            <div
              className="randomw"
              key={i}
              style={{ left: setPositions()[1], top: setPositions()[0] }}
              onClick={(e) => handlePos(e)}
              onContextMenu={handleRightClick}
            >
              {w}
              <div className="wordDesccontainer">
                <div className="wordDesc">Description</div>
              </div>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}
