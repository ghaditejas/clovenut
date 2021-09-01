import React, { Component, Fragment } from "react";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import RangeSlider from 'react-bootstrap-range-slider';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

class FrameBuilder extends Component {
  constructor(props) {
    super(props);
    console.log(props, "asdasdasds");
    this.state = {
      frames: [],
      selectedFrame: [],
      categories: [],
      category: '',
      choosedFrame: {},
      sizeOption: [],
      size: props.location.state.frameSize.split("x"),
      matt: '',
      mattWidth: 0,
      errorMessage: "",
    };
    this.addProduct = this.addProduct.bind(this);
    this.getBase64FromUrl = this.getBase64FromUrl.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.buildFrame = this.buildFrame.bind(this);
    this.handleMattColourChange = this.handleMattColourChange.bind(this);
    this.handleRange = this.handleRange.bind(this);
  }

  handleCategoryChange = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  handleMattColourChange = (e) => {
    this.setState({
      matt: e.target.value,
      mattWidth: 1,
    }, () => {
      this.buildFrame(this.state.choosedFrame, this.state.choosedFrame.Frame_Code);
    });
  }

  handleRange = (e) => {
    console.log(e, 'event')
    this.setState({
      mattWidth: e.target.value
    })
  }

  getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result.substr(reader.result.indexOf(",") + 1));
      };
    });
  };

  buildFrame = (frame, frameCode) => {
    axios
      .post("http://localhost:3001/api/buildImage", {
        m1: frameCode,
        aw: 600,
        ah: 600,
        iw: this.state.size[1],
        ih: this.state.size[0],
        p1: this.state.matt || '',
        pphf: this.state.matt ? (this.state.mattWidth || 1) : '',
        imgUrl: this.props.location.state.file,
      })
      .then((response) => {
        console.log(response, "frame");
        this.setState({
          selectedFrame: response.data,
          choosedFrame: frame
        });
      });
  };

  componentDidMount() {
    if (
      this.props.location.state &&
      this.props.location.state.file &&
      this.props.location.state.frameSize
    ) {
      axios
        .get("http://localhost:3001/api/getFrames")
        .then((response) => {
          const { data } = response
          this.setState(
            {
              frames: data,
              category: data[0]['Frame_Category'],
              choosedFrame: data[0],
            },
          );
          this.buildFrame(data[0], data[0]['Frame_Code'])
        })
        .catch((error) => {
          console.log(error, "frameError");
        });
      axios
        .get("http://localhost:3001/api/getFrameCategory")
        .then((response) => {
          this.setState(
            {
              categories: response.data,
            });
        })
        .catch((error) => {
          console.log(error, "CategoryError");
        });
    } else {
      this.props.history.push("/");
    }
  }

  addProduct = async () => {
    if (this.state.selectedFrame.frameImg) {
      const baseImage = await this.getBase64FromUrl(
        this.state.selectedFrame.frameImg
      );
      axios
        .post("http://localhost:3001/api/product", {
          product: {
            title: `${this.state.choosedFrame.Frame_Name}`,
            body_html: `<strong>${this.state.choosedFrame.Frame_Description}<strong>`,
            vendor: "Clovenut",
            product_type: "Frame",
            productImage: baseImage,
            price: this.state.selectedFrame.total,
          },
        })
        .then((response) => {
          console.log(response, "response product");
          window.location.href = `https://clovenut.myshopify.com/products/${response.data.product_listing.handle}`;
        });
    }
  };

  render() {
    return (
      <Fragment>
        <Row xs={12} className="product-container">
          <Col className="frame-img-container" md={{ span: 3, offset: 1 }} xs={{ span: 11 }}>
            <Row >
              <img
                className="frame-image"
                src={
                  this.state.selectedFrame.frameImg ||
                  this.props.location.state.file
                }
                alt="productImage"
              />
            </Row>
            <Row className="frame-views">
              <span className="frame-thumbnails">
                <img
                  className="frame-view-thumbnail"
                  src={this.state.choosedFrame.Frame_External_Link}
                />
              </span>
              <span className="frame-thumbnails">
                <img
                  className="frame-view-thumbnail"
                  src={this.state.choosedFrame.Frame_External_Link}
                />
              </span>
              <span className="frame-thumbnails">
                <img
                  className="frame-view-thumbnail"
                  src={this.state.choosedFrame.Frame_External_Link}
                />
              </span>
            </Row>
          </Col>
          <Col className="frame-product-details" md={{ span: 7, offset: 1 }} xs={{ span: 11 }}>
            <Row>
              <h2 className="product-name"> {this.state.choosedFrame.Frame_Name} </h2>
            </Row>
            <Row>
              <h5 className="product-desc">
                {this.state.choosedFrame.Frame_Description}
              </h5>
            </Row>
            <Row>
              <Form.Group>
                <Form.Control
                  as="select"
                  size="lg"
                  value={this.state.category}
                  onChange={this.handleCategoryChange}
                  custom
                >
                  <option value="">Select Frame Size</option>
                  {this.state.categories.map((category) => (
                    <option value={category.id}>{category.Category}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              {this.state.frames.map((frame) => (
                frame['Frame_Category'] == this.state.category &&
                <span className="frame-type-thumbnail">
                  <img
                    className="frame-thumbnail"
                    src={frame["Frame_External_Link"]}
                    onClick={() => this.buildFrame(frame, frame["Frame_Code"])}
                  />
                </span>
              )
              )}
            </Row>
            <Row>
              <Form.Group>
                <Form.Control
                  as="select"
                  size="lg"
                  value={this.state.matt}
                  onChange={this.handleMattColourChange}
                  custom
                >
                  <option value="">Select Matt Colour</option>
                  <option value="MAT001">White</option>
                  <option value="MAT002">Black</option>
                </Form.Control>
              </Form.Group>
            </Row>
            {this.state.matt && <Row>
              <RangeSlider
                value={this.state.mattWidth}
                size="sm"
                min="1"
                max="25"
                onChange={(e) => this.handleRange(e)}
                onAfterChange={() => this.buildFrame(this.state.choosedFrame, this.state.choosedFrame.Frame_Code)}
              />
            </Row>
            }
            <Row>
              <Button
                disabled={!this.state.selectedFrame}
                variant="default finalize-image-button"
                size="lg"
                onClick={this.addProduct}
                className="finalize-product-btn"
              >
                {this.state.selectedFrame.total &&
                  `$${this.state.selectedFrame.total} `}
                Finalize
              </Button>
            </Row>
          </Col>
        </Row>
      </Fragment >
    );
  }
}

export default FrameBuilder;
