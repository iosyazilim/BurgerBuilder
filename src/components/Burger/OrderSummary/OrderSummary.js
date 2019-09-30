import React from 'react';
import Aux from '../../hoc/HighOrderAux';

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
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
          {ingredientsSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;
