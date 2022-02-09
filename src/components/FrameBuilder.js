import React, { Component, Fragment } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import RangeSlider from "react-bootstrap-range-slider";
import Sidebar from "react-sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Frames from "./Frames";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class FrameBuilder extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = {
      frames: [],
      selectedFrame: [],
      categories: [],
      category: "",
      choosedFrame: {},
      sidebarOpen: false,
      size: props.location.state.frameSize.split("x"),
      canvasType: "1",
      canvasEdge: "MIR",
      selectedSize: props.location.state.frameSize,
      sizeOption: props.location.state.sizeOption,
      matt: "MAT001",
      mattWidth: 2,
      errorMessage: "",
      selectCarousel:0,
      flow: this.props.location.state.flow,
    };
    this.addProduct = this.addProduct.bind(this);
    this.getBase64FromUrl = this.getBase64FromUrl.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.buildFrame = this.buildFrame.bind(this);
    this.handleMattColourChange = this.handleMattColourChange.bind(this);
    this.handleRange = this.handleRange.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleCanvasTypeChange = this.handleCanvasTypeChange.bind(this);
    this.handleEdgeChange = this.handleEdgeChange.bind(this);
    this.slideControl = this.slideControl.bind(this);
  }

  handleEdgeChange(e) {
    this.setState(
      {
        canvasEdge: e.target.value,
      },
      () => {
        this.buildFrame(
          this.state.choosedFrame,
          this.state.choosedFrame.Frame_Code
        );
      }
    );
  }

  slideControl(index,item){
    this.setState({
      selectCarousel:index,
    })
  }
  handleCanvasTypeChange(e) {
    this.setState(
      {
        canvasType: e.target.value,
      },
      () => {
        let frameCanvas = this.state.frames;
        if (this.state.canvasType === "1") {
          frameCanvas = this.state.frames.filter(
            (frame) => frame.Frame_Code === "Canvas" && frame
          );
        }else{
          frameCanvas = this.state.frames.filter(
            (frame) => frame.Frame_Code !== "Canvas" && frame
          );
        }
        this.setState({
          choosedFrame: frameCanvas[0],
        });
        this.buildFrame(frameCanvas[0], frameCanvas[0]["Frame_Code"]);
      }
    );
  }

  changeImage() {
    this.props.history.push(`/pic/${this.props.location.state.flow}`);
  }

  handleSizeChange(e) {
    this.setState(
      {
        selectedSize: e.target.value,
        size: e.target.value.split("x"),
      },
      () => {
        this.buildFrame(
          this.state.choosedFrame,
          this.state.choosedFrame.Frame_Code
        );
      }
    );
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
    this.setState(
      {
        matt: e.target.value,
      },
      () => {
        this.buildFrame(
          this.state.choosedFrame,
          this.state.choosedFrame.Frame_Code
        );
      }
    );
  };

  handleRange = (e) => {
    console.log(e, "event");
    this.setState({
      mattWidth: e.target.value,
    });
  };

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
    const buildImageParams = {
      aw: 600,
      ah: 600,
      iw: this.state.size[1] * 2.54,
      ih: this.state.size[0] * 2.54,
      print: this.state.flow === "canvas" ? "P01" : "P02",
      back: "B01",
      imgUrl: this.props.location.state.file,
    };

    if (this.state.flow === "canvas") {
      if (this.state.canvasType === "1") {
        buildImageParams.stretchImg = this.state.canvasEdge;
      } else {
        buildImageParams.m1 = frameCode;
      }
      buildImageParams.smount = "SM10";
    } else {
      buildImageParams.m1 = frameCode;
      buildImageParams.glass = "G01";
      buildImageParams.p1 = this.state.matt || "";
      buildImageParams.pphf = this.state.matt ? this.state.mattWidth * 2.54 || 1*2.54  : "";
    }
    axios.post("/api/buildImage", buildImageParams).then((response) => {
      console.log(response, "frame");
      this.setState(
        {
          selectedFrame: response.data,
          choosedFrame: frame,
          sidebarOpen: false,
          selectCarousel: 0,
        },
        () => setTimeout(() => this.props.setLoader(), 3000)
      );
    });
  };

  componentDidMount() {
    if (
      this.props.location.state &&
      this.props.location.state.file &&
      this.props.location.state.frameSize &&
      (this.props.location.state.flow === "canvas" ||
        this.props.location.state.flow === "frame")
    ) {
      axios
        .post("/api/getFramesByCategory", { category: this.props.location.state.flow === "frame" ? '1' : '2' })
        .then((response) => {
          const { data } = response;
          let frameCanvas = data;
          if (this.state.flow === "canvas") {
            frameCanvas = data.filter(
              (frame) => frame.Frame_Code === "Canvas" && frame
            );
          }
          this.setState({
            frames: data,
            category: frameCanvas[0]["Frame_Category"],
            choosedFrame: frameCanvas[0],
          });
          this.buildFrame(frameCanvas[0], frameCanvas[0]["Frame_Code"]);
        })
        .catch((error) => {
          console.log(error, "frameError");
        });
      axios
        .get("/api/getFrameCategory")
        .then((response) => {
          this.setState({
            categories: response.data,
          });
        })
        .catch((error) => {
          console.log(error, "CategoryError");
        });
    } else {
      this.props.history.push("/pic/canvas");
    }
  }

  addProduct = async () => {
    this.props.setLoader();
    if (this.state.selectedFrame.frameImg) {
      const baseImage = await this.getBase64FromUrl(
        this.state.selectedFrame.frameImg
      );
      let description = `<p>Print Size: ${this.state.size[1]}" x ${this.state.size[0]}"</p>
      <p>Final Frame Size: ${parseFloat((this.state.selectedFrame.frameWidth)/2.54).toFixed(2)}" x ${parseFloat((this.state.selectedFrame.frameHeight)/2.54).toFixed(2)
        }"</p>
      <p>Frame Code:${this.state.choosedFrame.Frame_Name}</p>`;
      description = this.state.flow !== "canvas" && this.state.matt ? description +
      `<p>Mat Color: ${this.state.matt}</p>
      <p>Mat Size: ${this.state.mattWidth}"</p>` : description;
      description = this.state.flow !== "canvas" &&  description +`<p>Uploaded Image: ${this.props.location.state.file.split("/-")[0]}/</p>
      <p>Note :  1 Inch = 2.54 cm</p>`;
      axios
        .post("/api/product", {
          product: {
            title: `${this.state.choosedFrame.Frame_Name}`,
            body_html: description,
            vendor: "Clovenut",
            product_type: "Frame",
            productImage: baseImage,
            price: Math.ceil(this.state.selectedFrame.total/10)*10,
            imageUrl: this.props.location.state.file,
            sku: "Image Size | Frame Code | Mat Color | Mat Size | Image Identifier",
            frameDimension: `${this.state.selectedFrame.frameHeight}" x ${this.state.selectedFrame.frameWidth}"`,
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
        {this.state.sidebarOpen && <Sidebar
          sidebar={
            <Frames
              frames={this.state.frames}
              buildFrame={this.buildFrame}
              onSetSidebarOpen={this.onSetSidebarOpen}
            />
          }
          sidebarClassName="sidebar-frame"
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        />
        }
        <Row xs={12} className="product-container">
          <Col
            className="frame-img-container image-container"
            md={{ span: 5, offset: 1 }}
            xs={{ span: 11 }}
          >
            <Row>
              <Carousel
                showThumbs={true}
                showStatus={false}
                thumbWidth={40}
                thumbHeight={40}
                autoPlay={false}
                swipeable={false}
                selectedItem={this.state.selectCarousel}
                onChange={this.slideControl}
                className="frame-image"
              >
                <div>
                  <img
                    alt=""
                    className="stimuled-image"
                    src={
                      this.state.selectedFrame.frameImg ||
                      this.props.location.state.file
                    }
                  />
                </div>
                <div>
                  <img
                    alt=""
                    src={`/${this.state.choosedFrame.Frame_Image_1}`}
                  />
                </div>
                <div>
                  <img
                    alt=""
                    src={`/${this.state.choosedFrame.Frame_Image_2}`}
                  />
                </div>
                <div>
                  <img
                    alt=""
                    src={`/${this.state.choosedFrame.Frame_Image_3}`}
                  />
                </div>
              </Carousel>
            </Row>
          </Col>
          <Col
            className="frame-product-details"
            md={{ span: 5, offset: 1 }}
            xs={{ span: 11 }}
          >
            <Row>
              <h2 className="product-name">
                {" "}
                {this.state.choosedFrame.Frame_Name}{" "}
              </h2>
            </Row>
            <Row>
              <h5 className="product-desc">
                {this.state.choosedFrame.Frame_Description}
              </h5>
            </Row>
            <Row>
              <h5 className="product-review">
              {this.state.flow === 'canvas' ?
                <div class="loox-rating" data-fetch data-id="6994631033012"></div> :
                <div class="loox-rating" data-fetch data-id="6994597675188"></div>
              }
              </h5>
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
                    >{`${size.width}" x ${size.height}"`}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
            {this.state.flow === "canvas" && (
              <Row>
                <Form.Group className="frame-select-wrapper">
                  <div className="frame-select-label">CANVAS TYPE :</div>
                  <Form.Control
                    as="select"
                    size="lg"
                    className="frame-select-box"
                    value={this.state.canvasType}
                    onChange={this.handleCanvasTypeChange}
                    custom
                  >
                    <option value="1"> Stretched </option>
                    <option value="2"> Framed </option>
                  </Form.Control>
                </Form.Group>
              </Row>
            )}
            {/* {this.state.canvasType === "1" && this.state.flow === "canvas" && (
              <Row>
                <Form.Group className="frame-select-wrapper">
                  <div className="frame-select-label">EDGES :</div>
                  <Form.Control
                    as="select"
                    size="lg"
                    className="frame-select-box"
                    value={this.state.canvasEdge}
                    onChange={this.handleEdgeChange}
                    custom
                  >
                    <option value="BK"> Black </option>
                    <option value="WH"> White </option>
                    <option value="MIR"> Mirror </option>
                  </Form.Control>
                </Form.Group>
              </Row>
            )} */}
            {(this.state.flow === "frame" ||
              (this.state.canvasType === "2" &&
                this.state.flow === "canvas")) && (
                <Row>
                  <div
                    className="frame-select-wrapper frame-name"
                    onClick={() => this.onSetSidebarOpen(true)}
                  >
                    <div className="frame-select-label">Frame Style :</div>
                    <div className="frame-change-name">
                      <span
                        className="frame-select-box selected-frame-name"
                        onClick={() => this.onSetSidebarOpen(true)}
                      >
                        {this.state.choosedFrame.Frame_Name}
                      </span>
                      <span
                        className="selected-frame-name edit-button"
                        onClick={() => this.onSetSidebarOpen(true)}
                      >
                        Change
                      </span>
                    </div>
                  </div>
                </Row>
              )}
            {this.state.flow === "frame" && (
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
            )}
            {this.state.flow === "frame" && this.state.matt && (
              <Row>
                <Form.Group>
                  <Form.Label className="frame-select-label">
                    MAT SIZE :
                    <Form.Control
                      type="text"
                      className="max-width-display"
                      value={`${this.state.mattWidth}"`}
                      readOnly
                    />
                  </Form.Label>
                  <RangeSlider
                    className="frame-select-box"
                    value={this.state.mattWidth}
                    size="sm"
                    min="1"
                    max="7"
                    variant="secondary"
                    onChange={(e) => this.handleRange(e)}
                    onAfterChange={() =>
                      this.buildFrame(
                        this.state.choosedFrame,
                        this.state.choosedFrame.Frame_Code
                      )
                    }
                  />
                </Form.Group>
              </Row>
            )}
            {this.state.selectedFrame.total && (
              <Row>
                <h5 className="frame-size">
                  Final Frame Size: {parseFloat((this.state.selectedFrame.frameWidth)/2.54).toFixed(2)}" x{" "}
                  {parseFloat((this.state.selectedFrame.frameHeight)/2.54).toFixed(2)}"{" "}
                </h5>
              </Row>
            )}
            <Row>
              <Button
                disabled={!this.state.selectedFrame}
                variant="default finalize-image-button"
                size="lg"
                onClick={this.addProduct}
                className="finalize-product-btn"
              >
                <div>
                  {this.state.selectedFrame.total && (
                    <span>&#x20b9;{ Math.ceil(this.state.selectedFrame.total/10)*10} | </span>
                  )}
                  Finalize
                </div>
              </Button>
            </Row>
            <div onClick={this.changeImage}>
              <h5 className="change-image"> &larr; Change Image ?</h5>
            </div>
            <hr className="hr xs-hide sm-hide"></hr>

            <Row>
              <div className="info-sections">
                <div className="whats-included">
                  <h4 className="bold mb1">What's Included</h4>
                  <p>
                    Each frame is built and assembled by hand with your artwork
                    in mind.
                  </p>
                  <ul>
                    <li>
                      <span>01</span>
                      <span>Custom Frame</span>
                    </li>
                    <li>
                      <span>02</span>
                      <span>Archival Printing</span>
                    </li>
                    <li>
                      <span>03</span>
                      {this.state.flow === 'canvas' ?
                        <span>Water & fade resistant, archival canvas</span>
                        : <span>Premium Quality Mat (if you want one!)</span>
                      }
                    </li>
                    {this.state.flow !== 'canvas' &&
                    <Fragment>
                    <li>
                      <span>04</span>
                      <span>Scratch-resistant Acrylic Glazing</span>
                    </li>
                    <li>
                      <span>05</span>
                      <span>Black board back covering</span>
                    </li>
                    </Fragment>
                    }
                    <li>
                      <span>{this.state.flow === 'canvas' ? '04' : '06' }</span>
                      <span>Hanging Hardware</span>
                    </li>
                    <li>
                      <span>{this.state.flow === 'canvas' ? '05' : '07' }</span>
                      <span>100% Happiness Guarantee </span>
                    </li>
                    <li>
                      <span>{this.state.flow === 'canvas' ? '06' : '08' }</span>
                      <span>30-Days Easy Return Policy</span>
                    </li>
                    <li>
                      <span>{this.state.flow === 'canvas' ? '07' : '09' }</span>
                      <span>Free Shipping</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Row>

            { this.state.selectedFrame && 
            <>
            <Row>
              <div className="info-sections">
                <div className="whats-included">
                  <h4 className="bold mb1">Pricing Block</h4>
                  <ul>
                    <li>
                      <span>01</span>
                      <span> Exterior molding price: {this.state.selectedFrame.moul1Price} </span>
                    </li>
                    <li>
                      <span>02</span>
                      <span> Top mat price: {this.state.selectedFrame.mat1Price}</span>
                    </li>
                    <li>
                      <span>03</span>
                      <span> Glass price: {this.state.selectedFrame.glassPrice} </span>
                    </li>
                    <li>
                      <span>04</span>
                      <span> Backing price: {this.state.selectedFrame.backingPrice}</span>
                    </li>
                    <li>
                      <span>05</span>
                      <span> Subject mounting price: {this.state.selectedFrame.mountPrice}</span>
                    </li>
                    <li>
                      <span>06</span>
                      <span> Frame mounting price: {this.state.selectedFrame.mountFramePrice}</span>
                    </li>
                    <li>
                      <span>07</span>
                      <span> Printing price: {this.state.selectedFrame.printPrice}</span>
                    </li>
                    <li>
                      <span>08</span>
                      <span> Various price: {this.state.selectedFrame.variousPrice}</span>
                    </li>
                    <li>
                      <span>09</span>
                      <span> Assembly price: {this.state.selectedFrame.assemblyPrice}</span>
                    </li>
                    <li>
                      <span>10</span>
                      <span> Total before taxes: {this.state.selectedFrame.Total}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Row>
            <Row>
              <div className="info-sections">
                <div className="whats-included">
                  <h4 className="bold mb1">Size Block</h4>
                  <ul>
                    <li>
                      <span>01</span>
                      <span>  Mat opening width in centimeters: {this.state.selectedFrame.matOpeningWidth}</span>
                    </li>
                    <li>
                      <span>02</span>
                      <span> Mat opening height in centimeters: {this.state.selectedFrame.matOpeningHeight}</span>
                    </li>
                    <li>
                      <span>03</span>
                      <span> Total frame width in centimeters: {this.state.selectedFrame.frameWidth}</span>
                    </li>
                    <li>
                      <span>04</span>
                      <span> Total frame height in centimeters: {this.state.selectedFrame.frameHeight}</span>
                    </li>
                    <li>
                      <span>05</span>
                      <span> Backing and/or mat and/or glass width in centimeters: {this.state.selectedFrame.backingWidth}</span>
                    </li>
                    <li>
                      <span>06</span>
                      <span> Backing and/or mat and/or glass height in centimeters: {this.state.selectedFrame.backingHeight}</span>
                    </li>
                    <li>
                      <span>07</span>
                      <span> Subject width in centimeters: {this.state.selectedFrame.subjectWidth}</span>
                    </li>
                    <li>
                      <span>08</span>
                      <span> Subject height in centimeters: {this.state.selectedFrame.subjectHeight}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Row>
            </>
            }

            
          </Col>
        </Row>
        {/* {this.state.flow === 'canvas' ?
          <div>
            <div id="looxReviews" data-product-id="6994631033012"></div>
          </div>
          :
          <div>
            <div id="looxReviews" data-product-id="6994597675188"></div>
          </div>
        } */}
      </Fragment>
    );
  }
}

export default FrameBuilder;
