import React, { Component } from 'react';
import { connect } from 'react-redux';

import requiresAuth from '../../utils/requiresAuth';
import { getEventById } from '../../redux/selectors';

class Game extends Component {
    render() {
        const event = this.props.getEvent();
        if (! event) return null;
        return (
            <div>
                <p>Did you ask for game id: {event.title}</p>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    getEvent: () => getEventById(state, ownProps.match.params.id),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(Game));
