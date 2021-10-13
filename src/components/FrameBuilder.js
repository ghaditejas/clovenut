import React, { Component, Fragment } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import RangeSlider from 'react-bootstrap-range-slider';
import Sidebar from "react-sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Frames from './Frames';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class FrameBuilder extends Component {
  constructor(props) {
    super(props);
    console.log('props',props);
    this.state = {
      frames: [],
      selectedFrame: [],
      categories: [],
      category: '',
      choosedFrame: {},
      sidebarOpen:false,
      size: props.location.state.frameSize.split("x"),
      selectedSize: props.location.state.frameSize,
      sizeOption: props.location.state.sizeOption,
      matt: 'MAT001',
      mattWidth: 1,
      errorMessage: "",
    };
    this.addProduct = this.addProduct.bind(this);
    this.getBase64FromUrl = this.getBase64FromUrl.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.buildFrame = this.buildFrame.bind(this);
    this.handleMattColourChange = this.handleMattColourChange.bind(this);
    this.handleRange = this.handleRange.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.handleSizeChange= this.handleSizeChange.bind(this);
  }

  changeImage(){
    this.props.history.push('/');
  }

  handleSizeChange(e){
    this.setState({
      selectedSize: e.target.value,
      size:e.target.value.split('x')
    },()=>{
      this.buildFrame(this.state.choosedFrame, this.state.choosedFrame.Frame_Code)
    })
  }

  onSetSidebarOpen(sideBarStatus) {
    window.scrollTo(0, 0);
    this.setState({ sidebarOpen: sideBarStatus });
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
    this.props.setLoader();
    axios
      .post("/api/buildImage", {
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
          choosedFrame: frame,
          sidebarOpen:false,
      },()=>setTimeout(()=>this.props.setLoader(),4000));
      });
  };

  componentDidMount() {
    if (
      this.props.location.state &&
      this.props.location.state.file &&
      this.props.location.state.frameSize
    ) {
      axios
        .get("/api/getFrames")
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
        .get("/api/getFrameCategory")
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
    this.props.setLoader();
    if (this.state.selectedFrame.frameImg) {
      const baseImage = await this.getBase64FromUrl(
        this.state.selectedFrame.frameImg
      );
      axios
        .post("/api/product", {
          product: {
            title: `${this.state.choosedFrame.Frame_Name}`,
            body_html: `<strong>${this.state.choosedFrame.Frame_Description}<strong>`,
            vendor: "Clovenut",
            product_type: "Frame",
            productImage: baseImage,
            price: this.state.selectedFrame.total,
            imageUrl: this.props.location.state.file,
            frameDimension:  `${this.state.selectedFrame.frameHeight}" x ${this.state.selectedFrame.frameWidth}"`
          },
        })
        .then((response) => {
          console.log(response, "response product");
          this.props.setLoader();
          window.location.href = `https://clovenut.myshopify.com/products/${response.data.product_listing.handle}`;
        });
    }
  };

  render() {
    return (
      <Fragment>
        <Sidebar
          sidebar={<Frames 
          frames={this.state.frames}
          buildFrame={this.buildFrame}
          onSetSidebarOpen={this.onSetSidebarOpen}
        />}
        sidebarClassName="sidebar-frame"
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      />
        <Row xs={12} className="product-container">
          <Col className="frame-img-container image-container" md={{ span: 5, offset: 1 }} xs={{ span: 11 }}>
            <Row>
              <Carousel
                showThumbs={true}
                showStatus={false}
                thumbWidth={40}
                thumbHeight={40}
                autoPlay={false}
                className="frame-image">
              <div>
                    <img 
                    alt=""
                    className="stimuled-image"
                    src={
                  this.state.selectedFrame.frameImg ||
                  this.props.location.state.file
                } />
                </div>
                <div>
                    <img 
                      alt=""
                      src={this.state.choosedFrame.Frame_External_Link}
                     />
                </div>
                <div>
                    <img 
                      alt=""
                      src={this.state.choosedFrame.Frame_External_Link}
                    />
                </div>
                <div>
                    <img 
                      alt=""
                      src={this.state.choosedFrame.Frame_External_Link}
                  />
                </div>
              </Carousel>
            </Row>
          </Col>
          <Col className="frame-product-details" md={{ span: 5, offset: 1 }} xs={{ span: 11 }}>
            <Row>
              <h2 className="product-name"> {this.state.choosedFrame.Frame_Name} </h2>
            </Row>
            <Row>
              <h5 className="product-desc">
                {this.state.choosedFrame.Frame_Description}
              </h5>
            </Row>
            <Row>
              <div className="frame-select-wrapper frame-name" onClick={()=>this.onSetSidebarOpen(true)}>
                <div  className="frame-select-label">Frame Style :</div>
                <div className="frame-change-name">
                  <span
                    className="frame-select-box selected-frame-name"
                    onClick={()=>this.onSetSidebarOpen(true)}
                    >
                    {this.state.choosedFrame.Frame_Name}
                  </span>
                  <span
                   className="selected-frame-name edit-button"
                   onClick={()=>this.onSetSidebarOpen(true)}
                   >
                    Change
                  </span>
                </div>
              </div>
            </Row>
            <Row>
              <Form.Group className="frame-select-wrapper">
                <div className="frame-select-label">ART DIMENSION :</div>
                <Form.Control
                  as="select"
                  size="lg"
                  className="frame-select-box"
                  value={this.state.selectedSize}
                  onChange={this.handleSizeChange}
                  custom
                >
                  {this.state.sizeOption.map((size) => (
                    <option
                    value={`${size.height}x${size.width}`}
                  >{`${size.height}" x ${size.width}"`}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="frame-select-wrapper">
                <div className="frame-select-label">MAT STYLE :</div>
                <Form.Control
                  as="select"
                  size="lg"
                  className="frame-select-box"
                  value={this.state.matt}
                  onChange={this.handleMattColourChange}
                  custom
                >
                  <option value="">No Matt</option>
                  <option value="MAT001">White</option>
                  <option value="MAT003">Off-White</option>
                  <option value="MAT002">Black</option>
                </Form.Control>
              </Form.Group>
            </Row>
            {this.state.matt && <Row>
              <Form.Group >
                <Form.Label className="frame-select-label">
                 MAT SIZE :
                </Form.Label>
              <RangeSlider
                className="frame-select-box"
                value={this.state.mattWidth}
                size="sm"
                min="1"
                max="25"
                variant='secondary'
                onChange={(e) => this.handleRange(e)}
                onAfterChange={() => this.buildFrame(this.state.choosedFrame, this.state.choosedFrame.Frame_Code)}
              />
              </Form.Group>
            </Row>
            }
            {this.state.selectedFrame.total &&
            <Row>
              <h5 className="frame-size">Final Frame Size: {this.state.selectedFrame.frameHeight}" x {this.state.selectedFrame.frameWidth}" </h5>
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
                  <span>&#x20b9;{this.state.selectedFrame.total}</span>}
                Finalize
              </Button>
            </Row>
            <div onClick={this.changeImage}>
                <h5 className="change-image">  &larr; Change Image ?</h5>
              </div>
          </Col>
        </Row>
      </Fragment >
    );
  }
}

export default FrameBuilder;
