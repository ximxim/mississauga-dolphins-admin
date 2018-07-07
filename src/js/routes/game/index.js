import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    Button,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import moment from 'moment';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import requiresAuth from '../../utils/requiresAuth';
import { getEventById, getScoresByGameId } from '../../redux/selectors';
import {
    createGame,
    updateGame,
    finishGame,
    deleteGame,
} from '../../redux/modules/Scores';
import { addPlayer, deletePlayer } from '../../redux/modules/Events';

import GameCard from './components/GameCard';
import PlayersSuggestInput from './components/PlayersSuggestInput';

import styles from './styles';

class Game extends Component {
    state = {
        playerName: '',
        selectedPlayer: -1,
    };

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
            <h2 className="text-center">{game.title}</h2>
            {this.renderScoringControls(game)}
            <h2 className="text-center">Players List</h2>
            {this.renderAddPlayersControl()}
        </div>
    );

    renderAddPlayersControl = () => {
        const { playerName } = this.state;

        return (
            <div className="card" style={{ margin: 10 }}>
                <div className="card-body">
                    <Form>
                        <PlayersSuggestInput
                            players={this.props.players}
                            placeholder="Enter a player name"
                            value={playerName}
                            onSuggestionSelected={(event, { suggestion }) =>
                                this.setState({ selectedPlayer: suggestion.id })
                            }
                            onChange={(event, { newValue }) =>
                                this.setState({ playerName: newValue })
                            }
                        />
                        <Button
                            className="btn-success text-white btn-md circle-btn-sm btn-block"
                            variant="raised"
                            onClick={this.handleAddPlayer}
                            disabled={!playerName || this.props.loadingEvents}
                            style={{ marginTop: 10 }}
                            key="addPlayer"
                        >
                            Add Player
                        </Button>
                        <br />
                    </Form>
                    {this.renderPlayersList()}
                </div>
            </div>
        );
    };

    renderScoringControls = game => {
        const score = this.props.getScoresByGameId(game.id);

        if (!game.game_id) {
            return (
                <GameCard
                    players={this.props.players}
                    loading={this.props.loadingScores}
                    eventId={game.id}
                    submit={this.props.createGame}
                    addPlayer={selectedPlayer =>
                        this.setState({ selectedPlayer }, this.handleAddPlayer)
                    }
                />
            );
        }

        if (game.game_id && !score.active) {
            return (
                <GameCard
                    players={this.props.players}
                    eventId={game.id}
                    update={this.handleUpdate}
                    delete={this.handleDelete}
                    loading={this.props.loadingScores}
                    game={score}
                    addPlayer={selectedPlayer =>
                        this.setState({ selectedPlayer }, this.handleAddPlayer)
                    }
                />
            );
        }

        return (
            <GameCard
                players={this.props.players}
                eventId={game.id}
                update={this.handleUpdate}
                finish={this.handleFinish}
                loading={this.props.loadingScores}
                game={score}
                addPlayer={selectedPlayer =>
                    this.setState({ selectedPlayer }, this.handleAddPlayer)
                }
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

    renderPlayersList = () => {
        const event = this.props.getEvent();
        const playersList = this.props.players || [];
        if (!event.players)
            return (
                <p className="text-center">No players added to this event</p>
            );

        return (
            <ListGroup>
                {_.map(event.players, id => {
                    const player = playersList[id];
                    if (!player) return null;

                    return (
                        <ListGroupItem key={player.id}>
                            {player.FIRST_NAME} {player.LAST_NAME}
                            <Button
                                className="close"
                                onClick={() =>
                                    this.handleDeletePlayer(player.id)
                                }
                                disabled={this.props.loadingEvents}
                            >
                                <span aria-hidden="true">&times;</span>
                            </Button>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        );
    };

    handleAddPlayer = () => {
        const eventId = this.props.match.params.id;
        const playerId = this.state.selectedPlayer;

        this.props.addPlayer({ eventId, playerId });
        this.setState({ selectedPlayer: '', playerName: '' });
    };

    handleDeletePlayer = playerId => {
        const eventId = this.props.match.params.id;

        this.props.deletePlayer({ eventId, playerId });
    };
}

const mapStateToProps = (state, ownProps) => ({
    players: state.players.items,
    getEvent: () => getEventById(state, ownProps.match.params.id),
    getScoresByGameId: id => getScoresByGameId(state, id),
    loadingScores: state.scores.loading,
    loadingEvents: state.events.loading,
});

const mapDispatchToProps = {
    createGame,
    updateGame,
    finishGame,
    deleteGame,
    addPlayer,
    deletePlayer,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(requiresAuth(Game));
