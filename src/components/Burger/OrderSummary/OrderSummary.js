import React from 'react';
import Aux from '../../hoc/HighOrderAux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(item => {
    return (
      <li key={item}>
        <span style={{ textTransform: 'capitalize' }}>{item}:</span>
        {props.ingredients[item]}
      </li>
    );
  });
  return (
    //toFixed dont forget very important function take 2 digit from value 
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
          {ingredientsSummary}
      </ul>
      <p><strong>Total Price:</strong> {props.price.toFixed(2)}</p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.cancelButtonClicked} btnType='Danger'> Cancel </Button>
      <Button clicked={props.contButtonClicked} btnType='Success'> Continue </Button>
    </Aux>
  );
};

export default orderSummary;
