import React, { Component } from 'react';
import { Loader } from '.';
// import { LikeButton, CommentButton, CommentList, CommentModal } from '.';

import { connect } from 'react-redux';
import * as Actions from '../actions';

export class Wine extends Component {
  render() {
    if (this.props.wine === null) {
      return null;
    }
    return (
      <div className="col s12 m12 l6 offset-l3">
        <h2 className="center-align">Wine details</h2>
        <div className="card horizontal">
          <div className="card-image">
            <img
              className="responsive-img wine-detail-image"
              alt="Wine bottle pic"
              src={`https://wines-api.herokuapp.com/api/wines/${this.props.wine.id}/image`}
            />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h3>{this.props.wine.name}</h3>
              <br />
              <p>
                <b>Appellation:</b> {this.props.wine.appellation.name}
              </p>
              <p>
                <b>Region:</b> {this.props.wine.appellation.region}
              </p>
              <p>
                <b>Color:</b> {this.props.wine.type}
              </p>
              <p>
                <b>Grapes:</b> {this.props.wine.grapes.join(', ')}
              </p>
              {/* <CommentList wine={this.props.wine} /> */}
            </div>
            <div className="card-action">
              {/* <LikeButton wine={this.props.wine} /> */}
              {/* <CommentButton openCommentModal={this.props.openCommentModal} /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class _WinePage extends Component {

  componentDidMount() {
    const id = this.props.match.params.wineId;
    this.props.dispatch(Actions.fetchCurrentWine(id));
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="center-align">
          <Loader />
        </div>
      );
    }
    return (
      <div>
        <Wine
          wine={this.props.wine}
        />
        {/* <CommentModal
          wine={this.state.selectedWine}
          isOpen={this.state.commentModalOpen}
          closeCommentModal={this.closeCommentModal}
        /> */}
      </div>
    );
  }

}

function mapFromStoreToProps(store) {
  return {
    wine: store.currentWine ? store.currentWine.wine : null,
    loading: store.loading === 'HTTP_LOADING',
  };
}

export const WinePage = connect(mapFromStoreToProps)(_WinePage);
