import React, { Component } from 'react';
import { connect } from 'react-redux';

class Modal extends Component {

  render() {
    return (
      this.props.Modal.show_modal ?
      <div className="modal show-modal">
        <div className="modal-content">
          <span className="close-button" onClick={() => this.props.Close_modal()}>&times;</span>
          <h2>{this.props.Modal.title}</h2>
          <hr />
          <h4 className="text-center">{this.props.Modal.body}</h4>
        </div>
      </div> :
      null
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    Close_modal: () => {
      dispatch({
        type: 'HIDE_MODAL',
      });
		}
  };
};

export default connect(state => state, mapDispatchToProps)(Modal);
