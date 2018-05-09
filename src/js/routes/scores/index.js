import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';

import { getActiveGames } from '../../redux/selectors';
import { createGame, updateGame, requestGames, finishGame } from '../../redux/modules/Scores';
import NewGameCard from './components/newGameCard';
import UpdateGameCard from './components/updateGameCard';

class scores extends Component {

    state = {
        newGameModalVisible: false,
        updateGameModalVisible: false,
        gameToUpdate: null,
    }

    componentWillMount() {
        this.props.requestGames();
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
                        {this.renderNewGameButton()}
                        {this.renderNewGameModal()}
                        {this.renderGamesTable()}
                        {this.renderUpdateGameModal()}
                    </div>
                </div>
            </div>
        );
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
        getActiveGames: () => getActiveGames(state),
    };
}

const mapDispatchToProps = {
    requestGames,
    createGame,
    updateGame,
    finishGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(scores);
