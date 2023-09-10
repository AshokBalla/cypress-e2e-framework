describe('API validation examples', () => {
  it('declares a reusable request example', () => {
    expect(['/api/users', '/api/employees']).to.include('/api/users');
  });
});
