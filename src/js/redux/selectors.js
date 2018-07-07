import _ from 'lodash';

export const getActiveGames = state => {
    const obj = {};
    _.map(state.scores.games, (game, index) => {
        if (game.active) obj[index] = game;
    });
    return obj;
};

export const getScoresByGameId = (state, id) => {
    const game = _.find(state.scores.games, { event_id: id });
    const event = state.events.items[id];
    if (event && game) return { ...game, id: event.game_id };
};

export const getEventById = (state, id) =>
    state.events.items ? state.events.items[id] : null;

export const getEventPlayers = (state, id) =>
    state.events.items[id].players || [];
