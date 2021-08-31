import React, { Component, Fragment } from "react";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class FrameBuilder extends Component {
  constructor(props) {
    super(props);
    console.log(props, "asdasdasds");
    this.state = {
      frames: [],
      selectedFrame: [],
      uploaded: false,
      snackOpen: false,
      sizeOption: [],
      size: props.location.state.frameSize.split("x"),
      errorMessage: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.getBase64FromUrl = this.getBase64FromUrl.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.buildFrame = this.buildFrame.bind(this);
  }

  handleClose = () => {
    this.setState({
      snackOpen: false,
    });
  };

  handleChange(e) {
    const height = e.originalImageInfo.height / 100;
    const width = e.originalImageInfo.width / 100;
    console.log(height, width, "dimension");
    const imageSize = [
      `${height}" x ${width}"`,
      `${height - 1}" x ${width - 1}"`,
      `${height - 2}" x ${width - 2}"`,
      `${height - 3}" x ${width - 3}"`,
    ];
    console.log(e, "e");
    this.setState(
      {
        files: e,
        uploaded: true,
        sizeOption: imageSize,
      },
      () => {
        console.log(this.state.size, "pooooo");
      }
    );
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

  buildFrame = (frameCode) => {
    axios
      .post("http://localhost:3001/api/buildImage", {
        m1: frameCode,
        aw: 600,
        ah: 600,
        iw: this.state.size[1],
        ih: this.state.size[0],
        imgUrl: this.props.location.state.file,
      })
      .then((response) => {
        console.log(response, "frame");
        this.setState({
          selectedFrame: response.data,
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
          this.setState(
            {
              frames: response.data,
            },
            () => console.log(this.state.size, "size")
          );
          console.log(response.data, "frames");
        })
        .catch((error) => {
          console.log(error, "error");
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
            title: "Burton Custom Freestyle 151",
            body_html: "<strong>Good snowboard!</strong>",
            vendor: "Burton",
            product_type: "Snowboard",
            productImage: baseImage,
            price: this.state.selectedFrame.total,
          },
        })
        .then((response) => {
          console.log(response, "response product");
          window.location.href = `https://clovenut.myshopify.com/products/${response.data.product_listing.handle}`;
        });
    } else if (!this.state.files.cdnUrl) {
      this.setState({
        snackOpen: true,
        errorMessage: " Please Upload an Image",
      });
    } else {
      this.setState({
        snackOpen: true,
        errorMessage: " Please Select Frame Size",
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Row xs={12} className="product-container">
          <Col className="frame-img-container" md={{ span: 3, offset: 1 }} xs={{ span: 11}}>
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
          </Col>
          <Col className="frame-product-details" md={{ span: 7, offset: 1 }} xs={{ span: 11}}>
            <Row>
              <h2 className="product-name"> Product Name </h2>
            </Row>
            <Row>
              <h5 className="product-desc"> 
                How large should we print your digital photo? Available sizes are based on your photo's resolution.
                How large should we print your digital photo? Available sizes are based on your photo's resolution. 
              </h5>
            </Row>
            <Row>
              <Form.Group>
                <Form.Control
                  as="select"
                  size="lg"
                  custom
                >
                  <option value="">Select Frame Size</option>
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              {this.state.frames.map((frame) => (
                <span className="frame-type-thumbnail">
                  <img
                    className="frame-thumbnail"
                    src={frame["Frame External Link"]}
                    onClick={() => this.buildFrame(frame["Frame Code"])}
                  />
                </span>
              ))}
            </Row>
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
      </Fragment>
    );
  }
}

export default FrameBuilder;
