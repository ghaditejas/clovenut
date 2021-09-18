import React, { Component, Fragment } from "react";
import { Widget } from "@uploadcare/react-widget";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(process.env.REACT_APP_API_ENDPOINT, 'env');
    this.state = {
      files: {},
      uploaded: false,
      snackOpen: false,
      sizeOption: [],
      size: "",
      errorMessage: "",
      defaultFrame: "",
      defaultPrice: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.getBase64FromUrl = this.getBase64FromUrl.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.selectSize = this.selectSize.bind(this);
  }

  handleClose = () => {
    this.setState({
      snackOpen: false,
    });
  };

  componentDidMount() {
    axios.get('/api/getDefaultFrame')
      .then((response) => {
        this.setState(
          {
            defaultFrame: response.data[0]['Frame_Code'],
          });
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }

  handleChange(e) {
    const originalHeight = (e.originalImageInfo.height / 100).toFixed(1);
    const originalWidth = (e.originalImageInfo.width / 100).toFixed(1);
    const imageSize = [];
    let i = 0;
    let height = originalHeight;
    while (height >= 5) {
      imageSize.push({
        height: (originalHeight - i).toFixed(1),
        width: (originalWidth - i).toFixed(1),
      })
      height--;
      i++;
    }
    this.setState(
      {
        files: e,
        uploaded: true,
        sizeOption: imageSize,
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

  addProduct = async () => {
    if (this.state.files.cdnUrl && this.state.size) {
      this.props.history.push({
        pathname: "/framebuilder",
        state: { file: this.state.files.cdnUrl, frameSize: this.state.size, sizeOption:this.state.sizeOption},
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

  selectSize = (e) => {
    this.setState({
      size: e.target.value,
    }, () => {
      const selectedSize = this.state.size.split("x");
      axios
        .post("/api/buildImage", {
          m1: this.state.defaultFrame,
          aw: 600,
          ah: 600,
          iw: selectedSize[1],
          ih: selectedSize[0],
          imgUrl: this.state.files.cdnUrl,
          p1: '',
          pphf: ''
        })
        .then((response) => {
          console.log(response.data, "frame");
          this.setState({
            defaultPrice: response.data.total,
          });
        });
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.snackOpen && (
          <Alert variant="danger" onClose={this.handleClose} dismissible>
            {this.state.errorMessage}
          </Alert>
        )}
        {this.state.uploaded ? (
          <Fragment>
            <Row>
              <Col xs={12}>
                <div class="center">
                  <h1 class="upload-photo-heading">Select a size.</h1>
                  <h3 className="upload-pic-sub-heading">
                    How large should we print your digital photo? Available
                    sizes are based on your photo's resolution.
                  </h3>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-md-center select-image-dimension">
              <Col xs={12} md={3}>
                <Form.Group
                  className="select-size"
                  controlId="exampleForm.SelectCustom"
                >
                  <Form.Control
                    as="select"
                    size="lg"
                    onChange={(e) => this.selectSize(e)}
                    custom
                  >
                    <option value="">Select Frame Size</option>
                    {this.state.sizeOption.map((size) => (
                      <option
                        value={`${size.height}x${size.width}`}
                      >{`${size.height}" x ${size.width}"`}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            {this.state.defaultPrice && this.state.files.cdnUrl &&
              <Row className="justify-content-md-center">
                <Col xs={12} md={3}>
                  <h2 className="default-price">${this.state.defaultPrice}</h2>
                </Col>
              </Row>}
            <Row>
              <img
                className="image-preview"
                src={this.state.files.cdnUrl}
                alt="Uploaded"
              />
            </Row>
          </Fragment>
        ) : (
          <Fragment>
            <Row>
              <Col xs={12}>
                <div class="center">
                  <h1 class="upload-photo-heading">
                    Upload your digital photo.
                  </h1>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12} className="center">
                <Widget
                  id="file"
                  publicKey="023600512e719c72f047"
                  clearable="true"
                  imagesOnly="true"
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </Fragment>
        )}
        <div className="continue-button">
          <Button
            variant="default finalize-image-button"
            size="lg"
            onClick={this.addProduct}
          >
            Continue
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default Home;
