import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';
import * as FontAwesome from 'react-icons/lib/fa';

import { getActiveGames, getScoresByGameId } from '../../redux/selectors';
import { createGame, updateGame, requestGames, finishGame, deleteGame } from '../../redux/modules/Scores';
import { requestEvents } from '../../redux/modules/Events';
import NewGameCard from './components/newGameCard';
import UpdateGameCard from './components/updateGameCard';

import styles from './styles';

class scores extends Component {

    state = {
        newGameModalVisible: false,
        finishedGameModalVisible: false,
        updateGameModalVisible: false,
        selectedEvent: 0,
        gameToUpdate: null,
    }

    componentWillMount() {
        this.props.requestGames();
        this.props.requestEvents();
    }

    render() {
        if (! this.props.user) {
            return (<Redirect to={'/signin'} />);
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        {this.renderHeader()}
                        {this.renderEvents()}
                        {this.renderNewGameModal()}
                        {this.renderUpdateGameModal()}
                        {this.renderFinishedGameModal()}
                    </div>
                </div>
            </div>
        );
    }

    renderEvents = () => {
        const upcomingEvents = this.getUpcomingEvents();
        const games = _.filter(upcomingEvents, event => event.game);
        return <div className="row">
            {_.map(games, game => this.renderGame(game))}
        </div>
    }

    renderGame = (game) => {
        return <div className="col-md-4" key={game.id}>
            <div className="card" style={styles.card}>
                <div style={styles.cardBody}>
                    <div style={styles.title}>
                        <img src={game.cover.source} alt="game cover" style={styles.image} />
                        <h5 style={styles.cardTitle}>{game.title}</h5>
                    </div>
                    <Table striped>
                        <tbody>
                        <tr>
                            <td><FontAwesome.FaClockO style={styles.icon} /></td>
                            <td style={{ textAlign: 'left' }}>{moment(game.start_time).format('MMMM Do YYYY, h:mm: a')}</td>
                        </tr>
                        <tr>
                            <td><FontAwesome.FaInfoCircle style={styles.icon} /></td>
                            <td style={{ textAlign: 'left' }}><p>{game.match_no}</p></td>
                        </tr>
                        </tbody>
                    </Table>
                    <div className="padder">
                        {this.renderScoringButtons(game)}
                    </div>
                </div>
            </div>
        </div>;
    }

    renderScoringButtons = (game) => {
        const score = this.props.getScoresByGameId(game.id);
        if (! game.game_id) {
            return <Button
                onClick={() =>
                    this.setState({ selectedEvent: game.id }, this.toggleNewGameModal)
                }
                className="btn btn-primary btn-block"
            >
                Start Scoring
            </Button>
        }

        if (game.game_id && ! score.active) {
            return <Button
                onClick={() =>
                    this.setState({ selectedEvent: game.id }, this.toggleFinishedGameModal)
                }
                className="btn btn-primary btn-block"
            >
                Review Score
            </Button>
        }

        return <Button
            onClick={() =>
                this.setState({ selectedEvent: game.id }, this.toggleUpdateGameModal)
            }
            className="btn btn-primary btn-block"
        >
            Update Score
        </Button>
    }

    renderHeader = () => <div className="col text-center">
        <h2>Mississauga Dolphins Admin Portal</h2>
        <h4>Games</h4>
    </div>

    renderNewGameModal = () => {
        return <Modal
            isOpen={this.state.newGameModalVisible}
            toggle={this.toggleNewGameModal}
            className={this.props.className}
        >
            <ModalHeader toggle={this.toggleNewGameModal}>Start Scoring</ModalHeader>
            <ModalBody>
                <NewGameCard eventId={this.state.selectedEvent} submit={this.handleSubmit} />
            </ModalBody>
        </Modal>;
    }

    renderFinishedGameModal = () => {
        const { selectedEvent } = this.state;
        const selectedGame = (selectedEvent) ? this.props.getScoresByGameId(selectedEvent) : null;

        return <Modal
            isOpen={this.state.finishedGameModalVisible}
            toggle={this.toggleFinishedGameModal}
            className={this.props.className}
        >
            <ModalHeader toggle={this.toggleFinishedGameModal}>Review Score</ModalHeader>
            <ModalBody>
                <UpdateGameCard
                    update={this.handleUpdate}
                    delete={this.handleDelete}
                    game={selectedGame}
                />
            </ModalBody>
        </Modal>;
    }

    renderUpdateGameModal = () => {
        if (_.size(this.props.getActiveGames()) === 0) return null;

        const { selectedEvent } = this.state;
        const selectedGame = (selectedEvent) ? this.props.getScoresByGameId(selectedEvent) : null;

        return <Modal
            isOpen={this.state.updateGameModalVisible}
            toggle={this.toggleUpdateGameModal}
            className={this.props.className}
        >
            <ModalHeader toggle={this.toggleUpdateGameModal}>Update Game</ModalHeader>
            <ModalBody>
                <UpdateGameCard
                    update={this.handleUpdate}
                    finish={this.handleFinish}
                    game={selectedGame}
                />
            </ModalBody>
        </Modal>;
    }

    handleSubmit = (form) => {
        this.toggleNewGameModal();
        this.props.createGame(form);
    }

    handleUpdate = (form) => {
        const selectedGame = this.props.getScoresByGameId(this.state.selectedEvent);
        this.toggleUpdateGameModal();
        this.props.updateGame({ id: selectedGame.id, game: form });
    }

    handleFinish = () => {
        const selectedGame = this.props.getScoresByGameId(this.state.selectedEvent);
        this.props.finishGame({ id: selectedGame.id, game: selectedGame });
        this.toggleUpdateGameModal();
    }

    handleDelete = () => {
        const selectedGame = this.props.getScoresByGameId(this.state.selectedEvent);
        this.props.deleteGame({ id: selectedGame.id, game: selectedGame });
        this.toggleFinishedGameModal();
    }

    getUpcomingEvents = () => {
        const ascendingFeed = _.sortBy(this.props.events.items, ['start_time'])
        const upcomingEvents = _.filter(ascendingFeed, (item) => item.start_time > moment().format())
        return upcomingEvents.length > 0 ? upcomingEvents : [{ type: 'empty' }];
    }

    getPastEvents = () => {
        const ascendingFeed = _.sortBy(this.props.events.items, ['start_time'])
        const descendingFeed = ascendingFeed.reverse();
        const pastEvents = _.filter(descendingFeed, (item) => item.start_time <= moment().format())
        return pastEvents.length > 0 ? pastEvents : [{ type: 'empty' }];
    }

    toggleNewGameModal = () => this.setState({ newGameModalVisible: ! this.state.newGameModalVisible });
    toggleUpdateGameModal = () => this.setState({ updateGameModalVisible: ! this.state.updateGameModalVisible });
    toggleFinishedGameModal = () => this.setState({ finishedGameModalVisible: ! this.state.finishedGameModalVisible });
    startUpdate = game => this.setState({ gameToUpdate: game }, this.toggleUpdateGameModal);
}

const mapStateToProps = (state) => {
    const { uid: user } = state.authUser;
    return {
        user,
        scores: state.scores,
        events: state.events,
        getActiveGames: () => getActiveGames(state),
        getScoresByGameId: (id) => getScoresByGameId(state, id),
    };
}

const mapDispatchToProps = {
    requestGames,
    requestEvents,
    createGame,
    updateGame,
    finishGame,
    deleteGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(scores);
