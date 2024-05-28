import { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate, Navigate } from 'react-router-dom';
import { MainContext } from './context';

export default function SearchWord() {
  const { history, setHistory } = useContext(MainContext);
  const [searchWord, setSearchWord] = useState();
  const [searchedWord, setSearchedWord] = useState();
  const [metaData, setMetaData] = useState();
  const [phonetic, setPhonetic] = useState();
  const [notFounded, setNotFounded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchWord);
  };

  const handleSearch = async (word) => {
    if (history.filter((f) => f === word).length == 0) {
      setHistory([...history, word]);
    }

    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(function (response) {
        setNotFounded(false);
        if (response.status === 200) {
          return response.json();
        } else if (response.status !== 200) {
          setNotFounded(true);
        }
      })
      .then(function (data) {
        if (data) {
          setMetaData(data);
          setSearchedWord(data[0].word);
          setPhonetic(data[0].phonetic);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleRoute = (item) => {
    handleSearch(item);
  };

  return (
    <>
      <div className="searchword">
        <h1>Search Word</h1>
        <div className="searchdiv">
          {history[0] && (
            <div className="history">
              {history.map((elem, i) => (
                <a key={i} onClick={() => handleRoute(elem)}>
                  {elem}
                </a>
              ))}
            </div>
          )}
          <form action="" className="searchForm">
            <input
              type="text"
              className="searchwordinput"
              placeholder="Enter a word!"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <button className="searchBtn" type="submit" onClick={handleSubmit}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        {notFounded ? (
          <div className="searchresultsdiv">
            <div className="searchedword">Word Not Found!</div>
          </div>
        ) : (
          metaData && (
            <div className="searchresultsdiv">
              <div className="searchedword">{searchedWord}</div>
              <div className="phonetic">{phonetic}</div>
              {metaData.map((metaDatumn, i) => (
                <div className="results" key={i}>
                  {metaDatumn.meanings.map((meaning, i) => (
                    <div
                      key={i}
                      className={`partOfSpeech ${meaning.partOfSpeech}`}
                    >
                      {meaning.partOfSpeech}
                      {meaning.definitions.map((definition, i) => (
                        <div className="definition" key={i}>
                          {definition.definition}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </>
  );
}
