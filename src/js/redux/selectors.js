import _ from 'lodash';

export const getActiveGames = state => {
    const obj = {};
    _.map(state.scores.games, (game, index) => {
        if (game.active) obj[index] = game;
    });
    return obj;
}