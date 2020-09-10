import React, { Component } from 'react';
import { Loader } from '.';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as Actions from '../actions';

export class Regions extends Component {
  onSelectRegion = (e, region) => {
    e.preventDefault();
    this.props.onSelectRegion(region);
  };

  render() {
    return (
      <div className="col s12 m6 l4 offset-m3 offset-l4">
        <h2 className="center-align">Regions</h2>
        <div className="collection">
          {this.props.regions.map(region => (
            <Link to = {`/regions/${region}`}>
              <a
                key={region}
                href="#!"
                onClick={e => this.onSelectRegion(e, region)}
                className={['collection-item', region === this.props.region ? 'active' : ''].join(
                  ' '
                )}>
                {region}
              </a>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export class _RegionsPage extends Component {

  componentDidMount() {
    this.props.dispatch(Actions.fetchRegions());
  }

  onSelectRegion = region => {
    this.props.history.push({
      pathname: `/regions/${region}`
    });
  };

  render() {
    if (this.props.loading === 'LOADED') {
      return (
        <div className="center-align">
          <Loader />
        </div>
      );
    }
    return (
      <Regions onSelectRegion={this.onSelectRegion} regions={this.props.regions} />
    );
  }
}
//call when updating store
//send store value in redux to props in react
function mapFromStoreToProps(store) {
  return {
    regions: store.regions,
    loading: store.loading === 'HTTP_LOADING',
  }
}

export const RegionsPage = connect(mapFromStoreToProps)(_RegionsPage);