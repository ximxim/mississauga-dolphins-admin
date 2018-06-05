import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';
import * as FontAwesome from 'react-icons/lib/fa';

import { getActiveGames } from '../../redux/selectors';
import { createGame, updateGame, requestGames, finishGame } from '../../redux/modules/Scores';
import { requestEvents } from '../../redux/modules/Events';
import NewGameCard from './components/newGameCard';
import UpdateGameCard from './components/updateGameCard';

import styles from './styles';

class scores extends Component {

    state = {
        newGameModalVisible: false,
        updateGameModalVisible: false,
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
                        {this.renderUpdateGameModal()}
                        {this.renderNewGameModal()}
                    </div>
                </div>
            </div>
        );
    }

    renderEvents = () => {
        const games = _.filter(this.props.events.items, event => event.game);
        return <div className="row">
            {_.map(games, game => this.renderGame(game))}
        </div>
    }

    renderGame = (game) => {
        return <div className="col-12">
            <div className="card" style={styles.card}>
                <div className="card-body">
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
                            <td style={{ textAlign: 'left' }}>
                                <p><b>Match No:</b> {game.match_no}</p>
                                <p><b>Division:</b> {game.division}</p>
                                <p><b>Round Type:</b> {game.round_type}</p>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <a href="#" className="btn btn-primary">Start Scoring</a>
                </div>
            </div>
        </div>;
    }

    renderGamesTable = () => {
        if (_.size(this.props.getActiveGames()) === 0) return <h6>No Active Games</h6>;
        return <Table striped>
            <thead>
            <tr>
                <th scope="col">Home</th>
                <th scope="col">Visitor</th>
                <th scope="col">Created At</th>
            </tr>
            </thead>
            <tbody>
            {this.renderGames()}
            </tbody>
        </Table>
    }

    renderGames = () => _.map(this.props.getActiveGames(), (game, index) => {
        return <tr onClick={() => this.startUpdate(index)}>
            <td>{game.home.name}</td>
            <td>{game.visitor.name}</td>
            <td>{moment(game.created_at).fromNow()}</td>
        </tr>
    });

    renderHeader = () => <div className="col text-center">
        <h2>Mississauga Dolphins Admin Portal</h2>
        <h4>Games</h4>
    </div>

    renderNewGameButton = () => <Button
        className="btn-primary text-white btn-lg circle-btn-sm padder marginBottom"
        onClick={this.toggleNewGameModal}
    >
        New Game
    </Button>

    renderNewGameModal = () => {
        return <Modal
            isOpen={this.state.newGameModalVisible}
            toggle={this.toggleNewGameModal}
            className={this.props.className}
        >
            <ModalHeader toggle={this.toggleNewGameModal}>Create Game</ModalHeader>
            <ModalBody>
                <NewGameCard submit={this.handleSubmit} />
            </ModalBody>
        </Modal>;
    }

    renderUpdateGameModal = () => {
        console.log(_.size(this.props.getActiveGames()));
        if (_.size(this.props.getActiveGames()) === 0) return null;
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
                    game={this.props.scores.games[this.state.gameToUpdate]}
                />
            </ModalBody>
        </Modal>;
    }

    handleSubmit = (form) => {
        this.toggleNewGameModal();
        this.props.createGame(form);
    }

    handleUpdate = (form) => {
        this.toggleUpdateGameModal();
        this.props.updateGame({ id: this.state.gameToUpdate, game: form });
    }

    handleFinish = () => {
        const { gameToUpdate: id } = this.state;
        this.props.finishGame({ id, game: this.props.scores.games[id] });
        this.toggleUpdateGameModal();
    }

    toggleNewGameModal = () => this.setState({ newGameModalVisible: ! this.state.newGameModalVisible });
    toggleUpdateGameModal = () => this.setState({ updateGameModalVisible: ! this.state.updateGameModalVisible });
    startUpdate = game => this.setState({ gameToUpdate: game }, this.toggleUpdateGameModal);
}

const mapStateToProps = (state) => {
    const { uid: user } = state.authUser;
    return {
        user,
        scores: state.scores,
        events: state.events,
        getActiveGames: () => getActiveGames(state),
    };
}

const mapDispatchToProps = {
    requestGames,
    requestEvents,
    createGame,
    updateGame,
    finishGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(scores);
