const axios = require('axios');
/**
 * Gets the Men's College Basketball game play-by-play data for a specified game.
 * @param {number} id - Game id.
 * @returns json
 * @example
 * const result = await sdv.cbbGames.getPlayByPlay(401260281);
 */
exports.getPlayByPlay = async (id) => {
    const baseUrl = 'http://cdn.espn.com/core/mens-college-basketball/playbyplay';
    const params = {
        gameId: id,
        xhr: 1,
        render: 'false',
        userab: 18
    };

    const res = await axios.get(baseUrl, {
        params
    });

    return {
        teams: res.data.gamepackageJSON.header.competitions[0].competitors,
        id: res.data.gamepackageJSON.header.id,
        plays: res.data.gamepackageJSON.plays,
        competitions: res.data.gamepackageJSON.header.competitions,
        season: res.data.gamepackageJSON.header.season,
        boxScore: res.data.gamepackageJSON.boxscore
    };
};
/**
 * Gets the Men's College Basketball game box score data for a specified game.
 * @param {number} id - Game id.
 * @returns json
 * @example
 * const result = await sdv.cbbGames.getBoxScore(401260281);
 */
exports.getBoxScore = async (id) => {
    const baseUrl = 'http://cdn.espn.com/core/mens-college-basketball/boxscore';
    const params = {
        gameId: id,
        xhr: 1,
        render: false,
        device: 'desktop',
        userab: 18
    };

    const res = await axios.get(baseUrl, {
        params
    });

    const game = res.data.gamepackageJSON.boxscore;
    game.id = res.data.gameId;

    return game;
};
/**
 * Gets the Men's College Basketball game summary data for a specified game.
 * @param {number} id - Game id.
 * @returns json
 * @example
 * const result = await sdv.cbbGames.getSummary(401260281);
 */
exports.getSummary = async (id) => {
    const baseUrl = 'http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/summary';
    const params = {
        event: id
    };

    const res = await axios.get(baseUrl, {
        params
    });

    return {
        boxScore: res.data.boxscore,
        gameInfo: res.data.gameInfo,
        leaders: res.data.leaders,
        winProbability: res.data.winprobability,
        header: res.data.header,
        plays: res.data.plays,
        standings: res.data.standings
    };
};
/**
 * Gets the Men's College Basketball game PickCenter data for a specified game.
 * @param {number} id - Game id.
 * @returns json
 * @example
 * const result = await sdv.cbbGames.getPicks(401260281);
 */
exports.getPicks = async (id) => {
    const baseUrl = 'http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/summary';
    const params = {
        event: id
    };

    const res = await axios.get(baseUrl, {
        params
    });

    return {
        id: parseInt(res.data.header.id),
        gameInfo: res.data.gameInfo,
        leaders: res.data.leaders,
        header: res.data.header,
        teams: res.data.header.competitions[0].competitors,
        competitions: res.data.header.competitions,
        winProbability: res.data.winprobability,
        pickcenter: res.data.winprobability,
        againstTheSpread: res.data.againstTheSpread,
        odds: res.data.odds,
        season: res.data.header.season,
        standings: res.data.standings
    };
};