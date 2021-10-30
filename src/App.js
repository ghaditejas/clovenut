import React, { Component, Fragment } from "react";
import Products from "./components/Products";
import FrameBuilder from "./components/FrameBuilder";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../public/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
require('dotenv').config();

class App extends Component {
  constructor(props) {
    super(props);
    console.log(this.props, "props");
    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},
      loader:false,
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
    this.redirectToHomepage = this.redirectToHomepage.bind(this);
    this.setLoader = this.setLoader.bind(this);
  }

  setLoader(){
    this.setState({
      loader: !this.state.loader,
    },()=> console.log(this.state.loader,'loader'))
  }
  redirectToHomepage(){
    window.location.href = 'https://www.picframe.in';
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
        {this.state.loader && <div class="loading">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>}
        <Fragment>
          <div className="announcement-bar" role="region" aria-label="Announcement">
            <p className="announcement-bar-message">
              Frame Your Favourite Pictures
            </p>
          </div>
          <Container fluid>
            <Row className="header" xs={12}>
              <Col className="logo-header" xs={{ span: 2 }}>
                <span  onClick={()=>this.redirectToHomepage()} className="heading App__title">
                  <img src={logo} className="logo" alt="logo" />
                </span>
              </Col>
            </Row>
            <Switch>
              <Route exact path="/" render={(props) => <Home setLoader={this.setLoader} {...props} />} />
              <Route
                exact
                path="/framebuilder"
                render={(props) => <FrameBuilder setLoader={this.setLoader} {...props} />}
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
        <Footer/>
      </Router>
    );
  }
}

export default App;
