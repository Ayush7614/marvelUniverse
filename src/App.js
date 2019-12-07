
import React, {useEffect, useState} from 'react';
import {Card, Container, FormControl, InputGroup, Row} from 'react-bootstrap';
import './App.css';
import Pagination from "./components/Pagination";
import { CharacterModal } from './components/CharacterModal'
import {withCharacters} from "./context/CharacterContext";
import { getDetails } from './utils/getCharacterDetails'
import loader from './image/sample.gif';
import './animate.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'


const App = ({isLoading, characters, characterPages, fetchCharactersByNamePaginated, fetchCharactersPaginated}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [show, setShow] = useState(false);
  const [characterDetails, setCharacterDetails]=useState();

  useEffect(() => {
    fetchCharactersPaginated(1);
  }, []);

  let typingTimer;
  const TYPING_TIMEOUT = 1000;

  const searchNameHandler = (e) => {
    const targetValue = e.target.value;

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      setSearchQuery(targetValue);
      if (!isLoading) {
        if (targetValue) {
          fetchCharactersByNamePaginated(targetValue, 1);
        } else {
          fetchCharactersPaginated(1);
        }
      }
    }, TYPING_TIMEOUT);
  };

  const onPageChanged = page => {
    if (searchQuery) {
      fetchCharactersByNamePaginated(searchQuery, page);
    } else {
      fetchCharactersPaginated(page);
    }
  };

  const doAlert=(id)=>
  {
    getDetails(id)
    .then((res)=>
    {
      setShow(true);
      console.log(res);
      setCharacterDetails(res);
    })
  }

  const handleClose=()=>
  {
    setShow(false);
  }

  return (
    <>
    <div className="main">
      <Container>
        <Row className="row justify-content-center">
          <div className="searchBar">
            <InputGroup size="lg" className="mb-3">
              <FormControl className = "form-design"
                           aria-label="Large"
                           onChange={searchNameHandler}
                           placeholder="Search For Character You Love"
                           aria-describedby="inputGroup-sizing-sm"/>
            </InputGroup>
          </div>
        </Row>
        <Pagination pages={characterPages} onPageChanged={onPageChanged} className="pagination"/>
        <Row className="Scrollable">
          {isLoading ? (
            <div className="Loader1 animated flip">
              <div className="loader1">
                  <div className="star1">
                  <Loader
                    type="Triangle"
                    color="#00BFFF"
                    height={400}
                    width={400}
                    timeout={3000} //3 secs

                  />
                  </div>
              </div>
            </div>
          ) : characters.map(character => (
            <Card key={character.id} className="displayCard">
              <Card.Img variant="top"
                        src={character.thumbnail.path + "/standard_fantastic." + character.thumbnail.extension}
                        alt="Character"
                        onClick={()=>{ doAlert(character.id) }}
              />
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>

                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
        <div className="footer">
          <p>Made with &hearts;</p>
        </div>
      </Container>
    </div>
    { characterDetails ? <CharacterModal 
        handleClose={handleClose} 
        show={show}
        characterDetails={characterDetails}
        /> : null }
    </>
  )
};

export default withCharacters(App);
