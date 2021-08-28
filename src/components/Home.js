import React, { Component, Fragment } from 'react';
import { Widget } from "@uploadcare/react-widget";
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {},
      uploaded: false,
      snackOpen: false,
      sizeOption: [],
      size: "",
      errorMessage: "",
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
    })
  };

  handleChange(e) {
    const height = e.originalImageInfo.height / 100;
    const width = e.originalImageInfo.width / 100;
    console.log(height, width, 'dimension');
    const imageSize = [
      { height, width },
      {
        height: height - 1,
        width: width - 1
      },
      {
        height: height - 2,
        width: width - 2
      },
      {
        height: height - 3,
        width: width - 3
      },
    ]
    console.log(e, 'e')
    this.setState({
      files: e,
      uploaded: true,
      sizeOption: imageSize
    }, () => {
      console.log(this.state.size, 'pooooo');
    })
  }

  getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result.substr(reader.result.indexOf(',') + 1));
      }
    });
  }

  addProduct = async () => {
    if (this.state.files.cdnUrl && this.state.size) {
      // const baseImage = await this.getBase64FromUrl(this.state.files.cdnUrl);
      // axios.post('http://localhost:3001/api/product', {
      //   "product": {
      //     "title": "Burton Custom Freestyle 151",
      //     "body_html": "<strong>Good snowboard!</strong>",
      //     "vendor": "Burton",
      //     "product_type": "Snowboard",
      //     "status": "draft",
      //     "productImage": baseImage
      //   }
      // })
      //   .then(response => {
      //     console.log(response, 'response product');
      //     // this.props.history.push(`/products/${response.data.product_listing.product_id}`)
      //     window.location.href = `https://cloveenut.myshopify.com/products/${response.data.product_listing.handle}`;
      //   });
      this.props.history.push({
        pathname: '/framebuilder',
        state: { file: this.state.files.cdnUrl, frameSize: this.state.size }
      })
    } else if (!this.state.files.cdnUrl) {
      this.setState({
        snackOpen: true,
        errorMessage: " Please Upload an Image",
      })
    } else {
      this.setState({
        snackOpen: true,
        errorMessage: " Please Select Frame Size",
      })
    }
  }

  selectSize = (e) => {
    console.log(e, 'size');
    this.setState({
      size: e.target.value,
    })
  }

  render() {
    return (
      <Fragment>
        {this.state.snackOpen &&
          <Alert variant="danger" onClose={this.handleClose} dismissible>
            {this.state.errorMessage}
          </Alert>
        }
        {this.state.uploaded ?
          <Fragment >
            <Row>
              <Col xs={12}>
                <div class="center">
                  <h1 class="upload-photo-heading">Select a size.</h1>
                  <h3>How large should we print your digital photo? Available sizes are based on your photo's resolution.</h3>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12} md={3}>
                <Form.Group className="select-size" controlId="exampleForm.SelectCustom">
                  <Form.Control as="select" size="lg" onChange={(e) => this.selectSize(e)} custom>
                    <option value="">Select Frame Size</option>
                    {this.state.sizeOption.map(size => (
                      <option value={`${size.height}x${size.width}`}>{`${size.height}"x${size.width}"`}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <img className="image-preview" src={this.state.files.cdnUrl} alt="Uploaded Image" />
            </Row>
          </Fragment> :
          <Fragment>
            <Row>
              <Col xs={12}>
                <div class="center">
                  <h1 class="upload-photo-heading">Upload your digital photo.</h1>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={6} className="center">
                <Widget
                  id='file'
                  publicKey='023600512e719c72f047'
                  clearable="true"
                  imagesOnly="true"
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </Fragment>
        }
        <div className="continue-button">
          <Button variant="primary finalize-image-button" size="lg" onClick={this.addProduct}>
            Continue
          </Button>
        </div>
      </Fragment >
    )
  }
}

export default Home;
