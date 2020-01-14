import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Footer = ({ count }) => <p>voce tem {count} favoritos</p>;

const mapStateToProps = state => ({
  count: state.favorites.data.length,
});

Footer.propTypes = {
  count: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Footer);
