import React, { Component } from "react";
import { Panel, Col, Thumbnail } from "react-bootstrap";
import {Link} from "react-router-dom";

class Favorites extends Component {

  state = {
    recipes: []
  };

  componentWillReceiveProps(nextProps){

    if(nextProps.fb.auth().currentUser){

      let userId = nextProps.fb.auth().currentUser.uid;
      let dbRef = nextProps.fb.database().ref('/users/'+userId+'/favorites')

      dbRef.on('value', (snapshot) => {

        let favorites = snapshot.val();
        let recipes = [];
        for(const recipeId in favorites) {

          if(favorites.hasOwnProperty(recipeId)) {
            recipes.push(favorites[recipeId]);
          }
        }

        this.setState({recipes: recipes});
      });
    } else{
      this.setState({recipes: []});
    }
  }

  render() {

    const customStyle = {
      overflow: "hidden",
      cursor: "pointer"
    };

    return(
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            <strong><i className="fa fa-star"></i>  Favorite Recipes</strong>
            <span id="cart-total"></span>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {this.state.recipes.map( (element, index) => {
              return (<Col xs={3} md={3} key={index}>
              <Link to={"/recipe?id="+element.recipeId}>
                <Thumbnail style={customStyle} src={element.image}>
                  <p>{element.title}</p>
                </Thumbnail>
              </Link>
              </Col>);
            })
          }
        </Panel.Body>
      </Panel>);
  }
}

export default Favorites;
