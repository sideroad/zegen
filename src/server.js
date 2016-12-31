import Express from 'express';
import compression from 'compression';
// import __ from 'lodash';
import http from 'http';
import bodyParser from 'body-parser';
import { History } from './models';
import history from './history';
import cf from './cf';
import ranking from './ranking';

const app = new Express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

history(app, History);
cf(app, History);
ranking(app, History);

new http.Server(app).listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('App is now running');
});
