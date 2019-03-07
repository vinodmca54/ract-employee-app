import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import axios from "axios";
//import { get_empdata } from "../actions/types";
import {
  getempdata,
  deleteEmpdata,
  showmodel
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
  async componentDidMount() {
    const empresponce = await fetch("http://localhost:7777/getempData");
    const Json = await empresponce.json();
    //this.props.getempdata(Json);
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
  }
  handleClose() {}

  render() {
    const { empdata } = this.props;
    //console.log("hhhhhh", empdata);
    return (
      <div className="container">
        <>
          <Button variant="primary" onClick={this.handleShow}>
            Launch demo modal
          </Button>

          <Modal show={this.props.showempreg} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <ModalBody>Woohoo, you're reading this text in a modal!</ModalBody>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">EmpName</th>
              <th scope="col">EmpEmail</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Location</th>
              <th scope="col">Delete emp</th>
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
  empdata: state.employeReducer.empdata
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
