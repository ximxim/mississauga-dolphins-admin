import React, { Component } from 'react';
import { connect } from 'react-redux';

import requiresAuth from '../../utils/requiresAuth';
import { getEventById } from '../../redux/selectors';
import styles from './styles';

class Game extends Component {
    render() {
        const event = this.props.getEvent();
        if (! event) return null;
        return (
            <div className="marginTopx50 col-8 offset-2">
                <img
                    src={event.cover.source}
                    alt="game cover"
                    style={styles.image}
                    className="padder"
                />
                <h3 className="text-center">{event.title}</h3>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    getEvent: () => getEventById(state, ownProps.match.params.id),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(Game));
