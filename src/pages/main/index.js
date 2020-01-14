import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FavoriteActions } from '../../store/ducks/favorite';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      repositoryInput: '',
    };
  }

  handleAddRepository = event => {
    event.preventDefault();
    const { repositoryInput } = this.state;
    const { addFavoriteRequest } = this.props;
    addFavoriteRequest(repositoryInput);
    this.setState({ repositoryInput: '' });
  };

  render() {
    const { repositoryInput } = this.state;
    return (
      <>
        <form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            value={repositoryInput}
            placeholder="Usuario/Repositorio"
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Enviar</button>
          {this.props.favorites.loading && <span>Carregando...</span>}
          {!!this.props.favorites.error && (
            <span style={{ color: '#f00' }}>{this.props.favorites.error} </span>
          )}
        </form>
        <ul>
          {this.props.favorites.data.map(favorite => (
            <li key={favorite.id}>
              <p>
                <strong>{favorite.name}</strong> ({favorite.description})
              </p>
              <a href={favorite.url}>Acessar o github</a>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

Main.propTypes = {
  addFavoriteRequest: PropTypes.func.isRequired,
  favorites: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    error: PropTypes.oneOf([null, PropTypes.string]),
  }).isRequired,
};

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoriteActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
