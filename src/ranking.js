import __ from 'lodash';

export default function(app, History) {

  app.get('/:service/items', (req, res) => {
    const {
      service
    } = req.params;
    const {
      limit,
      from,
      to
    } = req.query;

    if (
      !service ||
      !from
    ) {
      res.status(400).json({
        err: 'service, from are required'
      });
      return;
    }
    History.find({ service, updateDate: {
      $gte: new Date(from),
      $lte: to ? new Date(to) : new Date()
    } }, 'item user -_id', { limit: 10000, sort: { updateDate: -1 } }, (err, items) => {
      const scores = [];
      items
        .map(item => {
          const matched = __.find(scores, { item: item.item });
          if (matched) {
            matched.score += 1;
          } else {
            scores.push({
              item: item.item,
              score: 1
            });
          }
        });
      res.json({
        items: __.orderBy(scores, ['score'], ['desc']).slice(0, limit || 10)
      });
    });
  });

  app.get('/:service/items/:item', (req, res) => {
    const {
      service,
      item
    } = req.params;
    const {
      from,
      to
    } = req.query;

    if (
      !service
    ) {
      res.status(400).json({
        err: 'service, item, from are required'
      });
      return;
    }
    History.find({ service, item, updateDate: {
      $gte: new Date(from),
      $lte: to ? new Date(to) : new Date()
    } }, 'item user -_id', { limit: 10000, sort: { updateDate: -1 } }, (err, items) => {
      res.json({
        score: items.length
      });
    });
  });
}
