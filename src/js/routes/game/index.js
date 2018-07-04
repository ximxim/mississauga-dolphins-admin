import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import moment from 'moment';
import { Link } from 'react-router-dom';

import requiresAuth from '../../utils/requiresAuth';
import { getEventById, getScoresByGameId } from '../../redux/selectors';
import {
    createGame,
    updateGame,
    finishGame,
    deleteGame,
} from '../../redux/modules/Scores';
import GameCard from './components/GameCard';

import styles from './styles';

class Game extends Component {
    render() {
        const event = this.props.getEvent();
        if (!event) return null;

        return (
            <div className="container">
                <div className="row">
                    <div className="col">{this.renderBreadCrumbs(event)}</div>
                </div>
                <div className="row">
                    {this.renderGameDetails(event)}
                    {this.renderGameMainContent(event)}
                </div>
            </div>
        );
    }

    renderBreadCrumbs = event => (
        <Breadcrumb>
            <BreadcrumbItem>
                <Link to="/Games">Games</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{event.title}</BreadcrumbItem>
        </Breadcrumb>
    );

    renderGameDetails = game => (
        <div className="col-md-4" key={game.id}>
            <div className="card" style={styles.card}>
                <div style={styles.cardBody}>
                    <div style={styles.title}>
                        <img
                            src={game.cover.source}
                            alt="game cover"
                            style={styles.image}
                        />
                    </div>
                    <Table style={styles.table} striped>
                        <tbody>
                            <tr>
                                <td>
                                    <FontAwesome.FaClockO style={styles.icon} />
                                </td>
                                <td style={{ textAlign: 'left' }}>
                                    {moment(game.start_time).format(
                                        'MMMM Do YYYY, h:mm: a',
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FontAwesome.FaInfoCircle
                                        style={styles.icon}
                                    />
                                </td>
                                <td style={{ textAlign: 'left' }}>
                                    <p>{game.match_no}</p>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );

    renderGameMainContent = game => (
        <div className="col-md-8 padder">
            <h2>{game.title}</h2>
            {this.renderScoringControls(game)}
        </div>
    );

    renderScoringControls = game => {
        const score = this.props.getScoresByGameId(game.id);

        if (!game.game_id) {
            return (
                <GameCard
                    loading={this.props.loadingScores}
                    eventId={game.id}
                    submit={this.props.createGame}
                />
            );
        }

        if (game.game_id && !score.active) {
            return (
                <GameCard
                    eventId={game.id}
                    update={this.handleUpdate}
                    delete={this.handleDelete}
                    loading={this.props.loadingScores}
                    game={score}
                />
            );
        }

        return (
            <GameCard
                eventId={game.id}
                update={this.handleUpdate}
                finish={this.handleFinish}
                loading={this.props.loadingScores}
                game={score}
            />
        );
    };

    handleUpdate = (form, eventId) => {
        const selectedGame = this.props.getScoresByGameId(eventId);
        this.props.updateGame({ id: selectedGame.id, game: form });
    };

    handleFinish = eventId => {
        const selectedGame = this.props.getScoresByGameId(eventId);
        this.props.finishGame({ id: selectedGame.id, game: selectedGame });
    };

    handleDelete = eventId => {
        const selectedGame = this.props.getScoresByGameId(eventId);
        this.props.deleteGame({ id: selectedGame.id, game: selectedGame });
    };
}

const mapStateToProps = (state, ownProps) => ({
    getEvent: () => getEventById(state, ownProps.match.params.id),
    getScoresByGameId: id => getScoresByGameId(state, id),
    loadingScores: state.scores.loading,
});

const mapDispatchToProps = {
    createGame,
    updateGame,
    finishGame,
    deleteGame,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(requiresAuth(Game));
