import __ from 'lodash';

export default function(app, History) {

  app.get('/:service/items/:item/cfs', (req, res) => {
    const {
      service,
      item
    } = req.params;
    const limit = req.query.limit;
    if (
      !service ||
      !item
    ) {
      res.status(400).json({
        err: 'service, user are required'
      });
      return;
    }
    History.find({ service, item }, 'item user -_id', { limit: 10000, sort: { updateDate: -1 } }, (err, items) => {
      const promises = items.map(itemsItem =>
        new Promise((resolve) => {
          History.find({ service, user: itemsItem.user}, 'item user -_id', (_err, userItems) => {
            resolve(userItems);
          });
        })
      );
      Promise.all(promises).then(cfItems => {
        const flatten = __.flatten(cfItems);
        const scores = [];
        flatten
          .filter(_item => _item.item !== item)
          .map(cf => {
            const matched = __.find(scores, { item: cf.item });
            if (matched) {
              matched.score += 1;
            } else {
              scores.push({
                item: cf.item,
                score: 1
              });
            }
          });
        res.json({
          items: __.orderBy(scores, ['score'], ['desc']).slice(0, limit || 10)
        });
      });
    });
  });
}
