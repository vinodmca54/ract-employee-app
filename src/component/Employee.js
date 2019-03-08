import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import axios from "axios";
//import { get_empdata } from "../actions/types";
import {
  getempdata,
  deleteEmpdata,
  showmodel,
  hidemodel
} from "../actions/employeeActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Form,
  Button,
  Col,
  Card,
  DropdownButton,
  Dropdown,
  Modal,
  ModalBody,
  OverlayTrigger
} from "react-bootstrap";

class Employee extends Component {
  formObj = {
    empname: "",
    empmobilenum: "",
    empmail: "",
    empaddress: ""
  };
  state = this.formObj;
  async componentDidMount() {
    const empresponce = await fetch("http://localhost:7777/getempData");
    const Json = await empresponce.json();
    // this.props.getempdata(Json);
    this.props.dispatch(getempdata(Json));
  }
  async deletehandler(id) {
    try {
      const res = await axios.delete(
        `http://localhost:7777/deleteEmpData/${id}`
      );
      if (res) {
        const empresponce = await fetch("http://localhost:7777/getempData");
        const Json = await empresponce.json();
        this.props.dispatch(deleteEmpdata(Json));
        //this.props.deleteEmpdata(res);
      }
    } catch (e) {
      console.log("error occured", e);
    }
  }
  handleShow() {
    this.props.dispatch(showmodel());
    console.log("props", this.props);
  }
  handleClose() {
    this.props.dispatch(hidemodel());
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async Edithandler(id) {
    console.log("sdhhsjdfjshjsfhsdjfhdsjk");
    const empresponce = await fetch(
      `http://localhost:7777/getempDatabyID/${id}`
    );
    const Json = await empresponce.json();
    this.handleShow();
    this.setState({ ...this.state, ...Json });
  }

  handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();
    let response = await fetch("http://localhost:7777/empdata", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Origin": "*"
      },
      body: JSON.stringify(this.state)
    });
    if (response) {
      this.handleClose();
      this.setState({ ...this.formObj });
      const empresponce = await fetch("http://localhost:7777/getempData");
      const Json = await empresponce.json();
      // this.props.getempdata(Json);
      console.log("updated", Json);
      this.props.dispatch(getempdata(Json));
    }
  };

  render() {
    const { empdata } = this.props;
    const { showempreg } = this.props;
    const { empname, empmobilenum, empmail, empaddress } = this.state;
    return (
      <div className="container">
        <Button variant="primary" onClick={this.handleShow.bind(this)}>
          Add Employee
        </Button>
        <Modal show={showempreg} onHide={this.handleClose.bind(this)}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#f6f7e7", borderBottom: "#da2828" }}
          >
            <Modal.Title>Employee Add-Form</Modal.Title>
          </Modal.Header>
          <ModalBody>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    value={empname}
                    name="empname"
                    type="text"
                    placeholder="Enter Name..."
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={empmail}
                    name="empmail"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridMobile">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile Number"
                    minLength="10"
                    maxLength="10"
                    value={empmobilenum}
                    name="empmobilenum"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    placeholder="1234 Main St"
                    value={empaddress}
                    name="empaddress"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              {/* <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Form.Row>

              <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group> */}

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </ModalBody>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={this.handleClose.bind(this)}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
        <table className="table table-bordered" style={{ marginTop: "2rem" }}>
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">EmpName</th>
              <th scope="col">EmpEmail</th>
              <th scope="col">Emp Mobile No</th>
              <th scope="col">Emp Location</th>
              <th scope="col">Delete Emp</th>
              <th scope="col">Edit Emp</th>
            </tr>
          </thead>
          <tbody>
            {empdata &&
              empdata.map((emp, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{emp.empname}</td>
                    <td>{emp.empmail}</td>
                    <td>{emp.empmobilenum}</td>
                    <td>{emp.empaddress}</td>
                    <td>
                      <span onClick={this.deletehandler.bind(this, emp._id)}>
                        <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                      </span>
                    </td>
                    <td>
                      <span onClick={this.Edithandler.bind(this, emp._id)}>
                        <FontAwesomeIcon icon={["fas", "edit"]} />
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

Employee.propTypes = {
  empdata: propTypes.array.isRequired
  //getempdata: propTypes.func.isRequired
};
const mapStateToProps = state => ({
  empdata: state.employeReducer.empdata,
  showempreg: state.employeReducer.showempreg
});

// const mapDispatchToProps = dispatch => {
//   return {
//     getempdata: () => dispatch({ type: "get_empdata" })
//   };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//       destroyTodo : () => dispatch({
//         type : 'DESTROY_TODO'
//       })
//     }
//   }

export default connect(
  mapStateToProps,
  null
)(Employee);
