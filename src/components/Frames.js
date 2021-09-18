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
            <Row>
                <Col>
                    <h1 className="sidebar-title">Mouldings</h1>
                </Col>
                <Col>
                    <h1 className="close-sidebar" onClick={()=>this.props.onSetSidebarOpen(false)}>X</h1>
                </Col>
            </Row>
            {this.props.frames.map((frame) => (
                <Row className="sidebar-frame-list">
                  <Col><h3>{frame['Frame_Name']}</h3></Col>
                  <Col>
                    <img
                      alt=""
                      // className={(this.state.choosedFrame.Frame_Code === frame["Frame_Code"]) ? "selected-frame frame-thumbnail" : "frame-thumbnail"}
                      className="sidebar-frame-image"
                      src={frame["Frame_External_Link"]}
                      onClick={() => this.props.buildFrame(frame, frame["Frame_Code"])}
                    />
                  </Col>
                  
                </Row>
              )
              )}
        </Fragment>
    )
  }
}

export default Frames;
