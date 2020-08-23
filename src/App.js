import React, {Component} from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Card from 'react-bootstrap/Card';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      search:null
    };
  }

  componentDidMount() {
    fetch("https://rickandmortyapi.com/api/character")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword});
  }

  

  render(){
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const items = this.state.items.filter((data)=>{
        if(this.state.search == null){
          return data
        }  
        else if(data.name.toLowerCase().includes(this.state.search.toLowerCase())){
            return data
        }
        return null
      }).map(item => {
          return <Col key={item.id}>
          <Card className="cardItem">
            <div className="imageText">
              <Card.Img variant="top" src={item.image}/>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  {item.created}
                </Card.Text>
              </Card.Body>
            </div>
            
            <ListGroup className="list-group-flush">
              <ListGroupItem><span className="left">STATUS</span><span className="right">{item.status}</span></ListGroupItem>
              <ListGroupItem><span className="left">SPECIES</span><span className="right">{item.species}</span></ListGroupItem>
              <ListGroupItem><span className="left">GENDER</span><span className="right">{item.gender}</span></ListGroupItem>
              <ListGroupItem><span className="left">ORIGIN</span><span className="right">{item.origin.name}</span></ListGroupItem>
              <ListGroupItem><span className="left">LAST LOCATION</span><span className="right">{item.location.name}</span></ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      })

      return (
          <Container fluid>
            <Row>
              <Col>
                <input type="text" placeholder="Enter name to be searched" className="SearchInput" onChange={(e)=>this.searchSpace(e)} />
              </Col>
              <Col>
                <div className="filterBox"> Filter</div>
              </Col>
            </Row>
            <Row>
              {items} 
            </Row>
        </Container>
      );
    }
  }
}

export default App;
