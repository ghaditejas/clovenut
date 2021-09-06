import React, { Component } from "react";
import axios from "axios";

class Product extends Component {
  constructor(props) {
    super(props);

    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.state = { selectedOptions: defaultOptionValues };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange(event) {
    const target = event.target;
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.client.product.helpers.variantForOptions(
      this.props.product,
      selectedOptions
    );
    console.log(selectedVariant, "check");
    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image,
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value,
    });
  }

  addToCart = (productId, Qunatity) => {
    axios
      .post("http://localhost:3001/api/addToCart", {
        productId,
        Qunatity,
      })
      .then((response) => {
        console.log(response, "response product");
        this.props.history.push(
          `https://cloveenut.myshopify.com/products/${response.data.product_listing.title}`
        );
      });
  };
  render() {
    let variantImage =
      this.state.selectedVariantImage || this.props.product.images[0];
    let variant = this.state.selectedVariant || this.props.product.variants[0];
    let variantQuantity = this.state.selectedVariantQuantity || 1;
    return (
      <div className="Product">
        {this.props.product.images.length ? (
          <img
            src={variantImage.src}
            alt={`${this.props.product.title} product shot`}
          />
        ) : null}
        <h5 className="Product__title">{this.props.product.title}</h5>
        <span className="Product__price">${variant.price}</span>
        <label className="Product__option">
          Quantity
          <input
            min="1"
            type="number"
            defaultValue={variantQuantity}
            onChange={this.handleQuantityChange}
          ></input>
        </label>
        <button
          className="Product__buy button"
          onClick={() =>
            this.addToCart(btoa(variant.admin_graphql_api_id), variantQuantity)
          }
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

export default Product;
