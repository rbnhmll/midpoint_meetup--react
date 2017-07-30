import React from 'react';
import PropTypes from 'prop-types';

const ModalToggle = (props) => {
  return (
    <div
      onClick={props.toggleModal} className="show-button"
    >
      <span className="fa fa-info" />
    </div>
  );
};

ModalToggle.propTypes = {
  toggleModal: PropTypes.func,
};

ModalToggle.defaultProps = {
  toggleModal: PropTypes.func,
};

export default ModalToggle;
