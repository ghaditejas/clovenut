import React, { Component, Fragment } from "react";
import Products from "./components/Products";
import Product from "./components/Product";
import FrameBuilder from "./components/FrameBuilder";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../public/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    console.log(this.props, "props");
    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }

  componentDidlMount() {
    this.props.client.checkout.create().then((res) => {
      this.setState({
        checkout: res,
      });
    });

    this.props.client.shop.fetchInfo().then((res) => {
      this.setState({
        shop: res,
      });
    });
  }

  addVariantToCart(variantId, quantity) {
    this.setState({
      isCartOpen: true,
    });
    console.log(variantId, "checkout");
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
    const checkoutId = this.state.checkout.id;

    return this.props.client.checkout
      .addLineItems(checkoutId, lineItemsToAdd)
      .then((res) => {
        this.setState({
          checkout: res,
        });
      });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id;
    const lineItemsToUpdate = [
      { id: lineItemId, quantity: parseInt(quantity, 10) },
    ];

    return this.props.client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then((res) => {
        this.setState({
          checkout: res,
        });
      });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id;

    return this.props.client.checkout
      .removeLineItems(checkoutId, [lineItemId])
      .then((res) => {
        this.setState({
          checkout: res,
        });
      });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  render() {
    return (
      <Router>
        <Fragment>
          <div className="announcement-bar" role="region" aria-label="Announcement">
            <p className="announcement-bar-message">
              FRAME YOUR FAVORITE PICTURES
            </p>
          </div>
          <Container fluid>
            <Row className="header" xs={12}>
              <Col xs={{ span: 2, offset: 1 }}>
                <span className="heading App__title">
                  <img src={logo} className="logo" />
                </span>
              </Col>
              {/* <Col xs={{ span: 2, offset: 7 }}>
                <button className="cart-icon" onClick={() => this.setState({ isCartOpen: true })}><i class="bi bi-bag"></i></button>
              </Col> */}
            </Row>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/framebuilder"
                render={(props) => <FrameBuilder {...props} />}
              />
              <Route
                exact
                path="/products/:id"
                render={(props) => (
                  <Products
                    client={this.props.client}
                    addVariantToCart={this.addVariantToCart}
                    {...props}
                  />
                )}
              />
            </Switch>
            {/* </div> */}
          </Container>
        </Fragment>
      </Router>
    );
  }
}

export default App;
