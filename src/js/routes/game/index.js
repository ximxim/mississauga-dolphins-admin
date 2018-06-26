import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import moment from 'moment';

import requiresAuth from '../../utils/requiresAuth';
import { getEventById, getScoresByGameId } from '../../redux/selectors';
import { createGame, updateGame, finishGame, deleteGame } from '../../redux/modules/Scores';
import NewGameCard from './components/newGameCard';
import UpdateGameCard from './components/updateGameCard';

import styles from './styles';

class Game extends Component {
    render() {
        const event = this.props.getEvent();
        if (! event) return null;

        return <div className="row">
            {this.renderGameDetails(event)}
            {this.renderGameMainContent(event)}
        </div>
    }

    renderGameDetails = (game) => <div className="col-md-4" key={game.id}>
        <div className="card" style={styles.card}>
            <div style={styles.cardBody}>
                <div style={styles.title}>
                    <img src={game.cover.source} alt="game cover" style={styles.image} />
                </div>
                <Table style={styles.table} striped>
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
            </div>
        </div>
    </div>;

    renderGameMainContent = (game) => <div className="col-md-8 padder">
        <h2>{game.title}</h2>
        {this.renderScoringControls(game)}
    </div>;

    renderScoringControls = (game) => {
        const score = this.props.getScoresByGameId(game.id);

        if (! game.game_id) {
            return <NewGameCard
                eventId={game.id}
                submit={this.props.createGame}
            />;
        }

        if (game.game_id && ! score.active) {
            return <UpdateGameCard
                update={this.handleUpdate}
                delete={this.handleDelete}
                game={score}
                eventId={game.id}
            />
        }

        return <UpdateGameCard
            update={this.handleUpdate}
            finish={this.handleFinish}
            game={score}
            eventId={game.id}
        />;
    }

    handleUpdate = (form, eventId) => {
        const selectedGame = this.props.getScoresByGameId(eventId);
        this.props.updateGame({ id: selectedGame.id, game: form });
    }

    handleFinish = (eventId) => {
        const selectedGame = this.props.getScoresByGameId(eventId);
        this.props.finishGame({ id: selectedGame.id, game: selectedGame });
    }

    handleDelete = (eventId) => {
        const selectedGame = this.props.getScoresByGameId(eventId);
        this.props.deleteGame({ id: selectedGame.id, game: selectedGame });
    }
}

const mapStateToProps = (state, ownProps) => ({
    getEvent: () => getEventById(state, ownProps.match.params.id),
    getScoresByGameId: (id) => getScoresByGameId(state, id),
});

const mapDispatchToProps = {
    createGame,
    updateGame,
    finishGame,
    deleteGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(Game));
