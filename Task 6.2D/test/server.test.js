const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);


const User = require('../models/User');

beforeEach(async () => {
  await User.deleteMany({}); // Remove all users before each test
});

describe('Bike App API', () => {

  it('GET / should return 200', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('POST /submit should return 200 with valid data', (done) => {
    chai.request(app)
      .post('/submit')
      .type('form')
      .send({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: '123456' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Form submitted successfully');
        done();
      });
  });

  it('POST /submit should return 400 if fields missing', (done) => {
    chai.request(app)
      .post('/submit')
      .type('form')
      .send({ firstName: 'John' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'All fields are required');
        done();
      });
  });

  it('GET /nonexistent should return 404', (done) => {
    chai.request(app)
      .get('/nonexistent')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
// Duplicate Email 
it('POST /submit should return 400 for duplicate email', async () => {
  // First, create a user
  await chai.request(app)
    .post('/submit')
    .type('form')
    .send({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: '123456' });

  // Try submitting again with same email
  const res = await chai.request(app)
    .post('/submit')
    .type('form')
    .send({ firstName: 'Jane', lastName: 'Smith', email: 'john@example.com', password: 'abcdef' });

  expect(res).to.have.status(400);
  expect(res.body).to.have.property('error', 'Email already exists');
});

  // Invalid Email Format
  it('POST /submit should return 400 for invalid email format', (done) => {
    const user = { firstName: 'Alice', lastName: 'Smith', email: 'invalid-email', password: '123456' };
    chai.request(app)
      .post('/submit')
      .type('form')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Invalid email format');
        done();
      });
  });

});
