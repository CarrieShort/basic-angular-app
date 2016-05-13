describe('angular app', () => {
  it('should have a 2 way data binding', () => {
    browser.get('http://localhost:5000');
    element(by.model('comment.msg')).sendKeys('hello world');
    element(by.css('h1')).getText().then( (text) => {
      expect(text).toEqual('hello world');
    });
  });
});
