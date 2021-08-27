import React, { Component } from 'react';
import Product from './Product';
import axios from 'axios';

class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidlMount() {
    axios.get(`http://localhost:3001/api/getProduct/${this.props.match.params.id}`, {
      'Content-Type': 'application/json',
    })
      .then(response => {
        console.log(response, 'response')
        this.setState({
          products: [response.data.product],
        });
      });
  }

  render() {
    let products = this.state.products.map((product) => {
      return (
        <Product
          addVariantToCart={this.props.addVariantToCart}
          client={this.props.client}
          key={product.id.toString()}
          product={product}
        />
      );
    });

    return (
      <div className="Product-wrapper">
        {products}
      </div>
    );
  }
}

export default Products;
