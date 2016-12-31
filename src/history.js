
export default function(app, History) {

  app.get('/:service/users/:user/items', (req, res) => {
    const {
      service,
      user
    } = req.params;
    if (
      !service ||
      !user
    ) {
      res.status(400).json({
        err: 'service, user are required'
      });
      return;
    }
    History.find({ service, user }, 'item -_id', { sort: { updateDate: -1 } }, (err, items) => {
      res.json({
        items
      });
    });
  });

  app.post('/:service/users/:user/items/:item', (req, res) => {
    const {
      service,
      user,
      item
    } = req.params;
    if (
      !service ||
      !user ||
      !item
    ) {
      res.status(400).json({
        err: 'service, user, item are required'
      });
      return;
    }
    const updateDate = new Date();
    History.findOneAndUpdate({ service, user, item }, { service, user, item, updateDate }, { upsert: true }, (err) => {
      if (err) {
        res.status(503).json({err: err});
      } else {
        res.json({});
      }
    });
  });

  app.delete('/:service/users/:user/items', (req, res) => {
    const {
      service,
      user
    } = req.params;
    if (
      !service ||
      !user
    ) {
      res.status(400).json({
        err: 'service, user are required'
      });
      return;
    }
    History.find({ service, user }, (err, items) => {
      const promises = items.map(deleteItem =>
        new Promise((resolve) =>
          deleteItem.remove(() => resolve({}))
        )
      );
      Promise.all(promises).then(
        () => {
          if (err) {
            res.status(503).json({err: err});
          } else {
            res.json({});
          }
        }
      );
    });
  });

  app.delete('/:service/users/:user/items/:item', (req, res) => {
    const {
      service,
      user,
      item
    } = req.params;
    if (
      !service ||
      !user ||
      !item
    ) {
      res.status(400).json({
        err: 'service, user, item are required'
      });
      return;
    }
    History.findOneAndRemove({ service, user, item }, (err) => {
      if (err) {
        res.status(503).json({err: err});
      } else {
        res.json({});
      }
    });
  });

}
