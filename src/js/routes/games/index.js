import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Collapse } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';

import requiresAuth from '../../utils/requiresAuth';
import { getActiveGames, getScoresByGameId } from '../../redux/selectors';
import {
    createGame,
    updateGame,
    finishGame,
    deleteGame,
} from '../../redux/modules/Scores';

class Games extends Component {
    state = {
        otherUpcomingGamesVisible: false,
        otherPastGamesVisible: false,
        otherActiveGamesVisible: false,
    };

    render() {
        return (
            <div className="container padder">
                <div className="row">
                    <div className="col text-center marginBottomx50">
                        {this.renderHeader()}
                        {this.renderActiveGames()}
                        {this.renderUpcomingGames()}
                        {this.renderPastGames()}
                    </div>
                </div>
            </div>
        );
    }

    renderActiveGames = () => {
        const activeGames = this.getActiveGameEvents();
        const games = _.filter(activeGames, event => event.game);
        const { otherActiveGamesVisible } = this.state;

        return this.renderGames({
            games,
            collapse: otherActiveGamesVisible,
            title: 'Active Games',
            toggle: this.toggleOtherActiveGamesCollapse,
        });
    };

    renderUpcomingGames = () => {
        const upcomingEvents = this.getUpcomingEvents();
        const games = _.filter(upcomingEvents, event => event.game);
        const { otherUpcomingGamesVisible } = this.state;

        return this.renderGames({
            games,
            collapse: otherUpcomingGamesVisible,
            title: 'Upcoming Games',
            toggle: this.toggleOtherUpcomingGamesCollapse,
        });
    };

    renderPastGames = () => {
        const pastEvents = this.getPastEvents();
        const games = _.filter(pastEvents, event => event.game);
        const { otherPastGamesVisible } = this.state;

        return this.renderGames({
            games,
            collapse: otherPastGamesVisible,
            title: 'Past Games',
            toggle: this.toggleOtherPastGamesCollapse,
        });
    };

    renderGames = ({ games, collapse, title, toggle }) => {
        let body;
        if (games.length === 0) {
            return null;
        }
        if (games.length < 3) {
            body = <tbody>{_.map(games, game => this.renderGame(game))}</tbody>;
        } else {
            const firstThreeGames = games.slice(0, 3);
            const otherGames = games.slice(3, games.length);

            body = (
                <tbody>
                    {_.map(firstThreeGames, game => this.renderGame(game))}
                    <tr>
                        <td colSpan="2">
                            <Button
                                className="btn btn-info center"
                                onClick={toggle}
                            >
                                {collapse ? 'Hide Games' : `Show All ${title}`}
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={{ borderTop: 0, padding: 0 }}>
                            <Collapse isOpen={collapse}>
                                <Table>
                                    <tbody>
                                        {_.map(otherGames, game =>
                                            this.renderGame(game),
                                        )}
                                    </tbody>
                                </Table>
                            </Collapse>
                        </td>
                    </tr>
                </tbody>
            );
        }

        return (
            <div>
                <h4 className="helper">{title}</h4>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Start Date</th>
                        </tr>
                    </thead>
                    {body}
                </Table>
            </div>
        );
    };

    renderGame = game => (
        <tr
            key={game.id}
            onClick={() => this.props.history.push(`/Game/${game.id}`)}
        >
            <td>{game.title}</td>
            <td>{moment(game.start_time).format('MMMM Do YYYY, h:mm: a')}</td>
        </tr>
    );

    renderHeader = () => (
        <div className="col text-center">
            <h2>Mississauga Dolphins Admin Portal</h2>
            <h4>Games</h4>
        </div>
    );

    getUpcomingEvents = () => {
        if (this.props.events) {
            const ascendingFeed = _.sortBy(this.props.events.items, [
                'start_time',
            ]);
            const upcomingEvents = _.filter(
                ascendingFeed,
                item => item.start_time >= moment(0, 'HH').format(),
            );
            return upcomingEvents.length > 0
                ? upcomingEvents
                : [
                      {
                          type: 'empty',
                      },
                  ];
        }
        return [];
    };

    getActiveGameEvents = () => {
        if (this.props.scores) {
            const activeGames = _.filter(
                this.props.scores.games,
                game => game.active,
            );
            return _.map(
                activeGames,
                game => this.props.events.items[game.event_id],
            );
        }
        return [];
    };

    getPastEvents = () => {
        if (this.props.events) {
            const ascendingFeed = _.sortBy(this.props.events.items, [
                'start_time',
            ]);
            const descendingFeed = ascendingFeed.reverse();
            const pastEvents = _.filter(
                descendingFeed,
                item => item.start_time < moment(0, 'HH').format(),
            );
            return pastEvents.length > 0
                ? pastEvents
                : [
                      {
                          type: 'empty',
                      },
                  ];
        }
        return [];
    };

    toggleOtherActiveGamesCollapse = () =>
        this.setState(prevState => ({
            otherActiveGamesVisible: !prevState.otherActiveGamesVisible,
        }));

    toggleOtherUpcomingGamesCollapse = () =>
        this.setState(prevState => ({
            otherUpcomingGamesVisible: !prevState.otherUpcomingGamesVisible,
        }));

    toggleOtherPastGamesCollapse = () =>
        this.setState(prevState => ({
            otherPastGamesVisible: !prevState.otherPastGamesVisible,
        }));
}

const mapStateToProps = state => {
    const { uid: user } = state.authUser;
    return {
        user,
        scores: state.scores,
        events: state.events,
        getActiveGames: () => getActiveGames(state),
        getScoresByGameId: id => getScoresByGameId(state, id),
    };
};

const mapDispatchToProps = {
    createGame,
    updateGame,
    finishGame,
    deleteGame,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(requiresAuth(Games));
