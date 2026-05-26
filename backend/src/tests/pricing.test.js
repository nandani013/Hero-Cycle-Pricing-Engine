const request = require('supertest');
const app = require('../index');

describe('Pricing API (Refactored)', () => {
  it('should return error if date is missing', async () => {
    const res = await request(app)
      .post('/api/calculate-price')
      .send({ parts: ['steel'] });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('Correct price before Dec 2016', async () => {
    const res = await request(app)
      .post('/api/calculate-price')
      .send({
        date: '2016-11-15',
        parts: ['tubeless_tyre']
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.breakdown['Wheels']).toEqual(200);
    expect(res.body.total).toEqual(200);
  });

  it('Correct price after Dec 2016', async () => {
    const res = await request(app)
      .post('/api/calculate-price')
      .send({
        date: '2016-12-05',
        parts: ['tubeless_tyre']
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.breakdown['Wheels']).toEqual(230);
    expect(res.body.total).toEqual(230);
  });

  it('Correct total calculation', async () => {
    const res = await request(app)
      .post('/api/calculate-price')
      .send({
        date: '2020-05-10',
        parts: ['steel', 'standard', 'v_brakes', 'basic', 'rim-standard', 'tyre-standard', 'spokes-standard', 'single']
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.total).toEqual(4980);
    expect(Object.keys(res.body.breakdown).length).toEqual(5);
    expect(res.body.breakdown['Wheels']).toEqual(1580);
  });
});
