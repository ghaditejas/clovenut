import React, { Component, Fragment } from "react";
import { Row, Col } from "react-bootstrap";

class Frames extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return(
        <Fragment>
            <Row className="sidebar-frame-main-container">
                <Col>
                    <h2 className="sidebar-title">Frame Style</h2>
                </Col>
                <Col>
                    <h1 className="close-sidebar" onClick={()=>this.props.onSetSidebarOpen(false)}>x</h1>
                </Col>
            </Row>
            {this.props.frames.map((frame) => (
                <Row className="sidebar-frame-list">
                  <Col>
                    <img
                      alt=""
                      // className={(this.state.choosedFrame.Frame_Code === frame["Frame_Code"]) ? "selected-frame frame-thumbnail" : "frame-thumbnail"}
                      className="sidebar-frame-image"
                      src={frame["Frame_External_Link"]}
                      onClick={() => this.props.buildFrame(frame, frame["Frame_Code"])}
                    />
                  </Col>
                  <Col><h5 className="sidebar-frame-name">{frame['Frame_Name']}</h5></Col>
                </Row>
              )
              )}
              
        </Fragment>
    )
  }
}

export default Frames;
