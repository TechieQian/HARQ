import React from 'react';
import { connect } from 'react-redux';
import { fetchLineItems } from '../reducers';

const mapStateToProps = function({ lineItems }) {
  return {
    lineItems
  }
};

const Cart = function({ lineItems }) {
  return (
    <div className="container well">
      lineitems.map(item => {
        return <li key={item.product.id}>{item.product.name}</li>
      })
    </div>
  )

}


export default connect(mapStateToProps)(Cart);
