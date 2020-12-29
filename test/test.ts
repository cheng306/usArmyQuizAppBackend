import * as http from 'http';
import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';
import 'mocha';

describe('Test application', () => {
  let server:any;

  before((done) => {
    const port: string = process.env.PORT || '3000';
    app.set('port', port);

    // Create HTTP server.
    server = http.createServer(app);

    // Listen on provided port, on all network interfaces.
    server.listen(port, () => {
      console.log(`Server running in ${process.env.NODE_ENV}`);
      console.log(`URL: http://localhost:${port}`);
      done();
    });

    server.on('listening', () => {
      console.log('server start listening');
    });
  });

  after((done) => {
    server.close(() => {
      done();
    });
  });

  it('test get request of /', (done) => {
    // all test can follow this format
    // change get to post for post request
    // change res.body.# for expected response
    request(server)
      .get('/')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        // expect(res.body.isDBConnected).to.equal(true);
        expect(res.body.Environment).to.equal('development');
        console.log(res.body);
        return done();
      });
  });

  // every it is a new test point
  it('test get request of /', (done) => {
    // all test can follow this format
    // change get to post for post request
    // change res.body.# for expected response
    request(server)
      .get('/')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        // expect(res.body.isDBConnected).to.equal(true);
        expect(res.body.Environment).to.equal('development');
        console.log(res.body);
        return done();
      });
  });
});
