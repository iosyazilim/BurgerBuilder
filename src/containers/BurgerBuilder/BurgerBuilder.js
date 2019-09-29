import React, { Component } from 'react';
import Aux from '../../components/hoc/HighOrderAux';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIANT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.6
}

class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {

  //   }
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

  }

  removeIngredientsHandler = (type) => {

  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuilderControls ingredientAdded = {this.addIngredientHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
