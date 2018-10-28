const events = require('./events.json');
const correctEventTypes = new Set(['info', 'critical']);

exports.events = (req, res) => {
    const {type, offset, limit} = req.query;

    let eventsOnSend = [];

    if (type !== undefined) {
        if (correctEventTypes.has(type)) {
            eventsOnSend = events.events.filter(item => item.type === type);
        } else {
            res.status(400);
            res.send("incorrect type");
            return;
        }
    } else {
        eventsOnSend = events.events;
    }

    if (offset !== undefined && limit !== undefined) {
        const start = parseInt(offset);
        const size = parseInt(limit);

        if (start >= eventsOnSend.length) {
            res.status(400);
            res.send("incorrect offset");
            return;
        }

        eventsOnSend = eventsOnSend.slice(start, start + size);
    }

    res.send(JSON.stringify({events: eventsOnSend}));
};
