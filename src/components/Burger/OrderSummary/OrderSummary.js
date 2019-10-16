import React, {Component} from 'react';
import Aux from '../../hoc/HocAux/HighOrderAux';
import Button from '../../UI/Button/Button';

class OrderSummary  extends Component{
  // ComponentWillUpdate Class Components can not be used [UNSAFE], functional component can be used.
  componentWillUpdate() {
    console.log('Order Summary Will Update')
  }
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(item => {
      return (
        <li key={item}>
          <span style={{ textTransform: 'capitalize' }}>{item}:</span>
          {this.props.ingredients[item]}
        </li>
      );
    });
    return (
      <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
          {ingredientsSummary}
      </ul>
      <p><strong>Total Price:</strong> {this.props.price.toFixed(2)}</p>
      <p>Continue to Checkout?</p>
      <Button clicked={this.props.cancelButtonClicked} btnType='Danger'> Cancel </Button>
      <Button clicked={this.props.contButtonClicked} btnType='Success'> Continue </Button>
    </Aux>
    );
  }
};

export default OrderSummary;
