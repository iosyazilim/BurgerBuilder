import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../components/hoc/HocAux/HighOrderAux';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

const INGREDIANT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.6
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    showOrderSummary: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get('https://burgerbuilder-ea082.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data
        });
      }).catch(error => {
        this.setState({
          error: true
        })
      })
  }

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
      showOrderSummary: false
    });
  };

  purchaseContinueHandler = () => {
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Ercan Er',
        adress: {
          street: 'Test Ankara',
          zipCode: '06520',
          country: 'Turkey'
        },
        email: 'iosyazilim@gmail.com'
      }
    };

    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, showOrderSummary: false });
      })
      .catch(error =>
        this.setState({ loading: false, showOrderSummary: false })
      );
  };

  showOrderSummaryHandler = () => {
    this.setState({ showOrderSummary: !this.state.showOrderSummary });
  };

  render() {
    const {
      purchasable,
      showOrderSummary,
      totalPrice,
      ingredients,
      error
    } = this.state;

    const disabledInfo = {
      ...ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger =  error ? <p style={{textAlign: 'center', fontSize: '75px'}}>Ingredients can not be loaded!<Spinner /> </p> : null

    if (this.state.ingredients !== null) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          cancelButtonClicked={this.purchaseCancelHandler}
          contButtonClicked={this.purchaseContinueHandler}
          price={totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={showOrderSummary} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
