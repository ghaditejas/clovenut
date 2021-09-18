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
      sizeOption: [],
      sidebarOpen:false,
      size: props.location.state.frameSize.split("x"),
      selectedSize: props.location.state.frameSize,
      sizeOption: props.location.state.sizeOption,
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
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleSizeChange= this.handleSizeChange.bind(this);
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
          <Col className="frame-img-container" md={{ span: 3, offset: 1 }} xs={{ span: 11 }}>
            <Row >
              <Carousel showStatus={false} className="frame-image">
              <div>
                    <img 
                    alt=""
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
              {/* {this.state.frames.map((frame) => (
                frame['Frame_Category'] === parseInt(this.state.category, 10) &&
                <span className="frame-type-thumbnail">
                  <img
                    alt=""
                    className={(this.state.choosedFrame.Frame_Code === frame["Frame_Code"]) ? "selected-frame frame-thumbnail" : "frame-thumbnail"}
                    src={frame["Frame_External_Link"]}
                    onClick={() => this.buildFrame(frame, frame["Frame_Code"])}
                  />
                </span>
              )
              )} */}
              <h5  className="product-desc">Frame: 
                <a 
                  className="selected-frame-name"
                  href="javascript:void(0)"
                  onClick={()=>this.onSetSidebarOpen(true)}>
                   {this.state.choosedFrame.Frame_Name}
                </a>
              </h5>
            </Row>
            <Row>
              <Form.Group>
                {console.log(this.state.sizeOption,'asdasdsd')}
                <Form.Control
                  as="select"
                  size="lg"
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
