import React, { Component } from 'react';
import Aux from '../../components/hoc/HocAux/HighOrderAux';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIANT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.6
};

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
    totalPrice: 4,
    purchasable: false,
    showOrderSummary: false
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientsHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseCancelHandler = () => {
    this.setState({
      showOrderSummary: false,
    });
    }

  purchaseContinueHandler = () => {
    alert('You Continue')
  }

  showOrderSummaryHandler = () => {
    this.setState({ showOrderSummary: !this.state.showOrderSummary });
  };

  render() {
    const { purchasable, showOrderSummary, totalPrice, ingredients} = this.state;

    const disabledInfo = {
      ...ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={showOrderSummary} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={ingredients} 
            cancelButtonClicked= {this.purchaseCancelHandler} 
            contButtonClicked= {this.purchaseContinueHandler}
            price={totalPrice}
          />
        </Modal>

        <Burger ingredients={ingredients} />
        <BuilderControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientsHandler}
          showModal={this.showOrderSummaryHandler}
          purchasable={purchasable}
          disabled={disabledInfo}
          price={totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
