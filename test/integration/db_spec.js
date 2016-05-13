describe('angular app', () => {
  it('should create a dinosaur', () => {
    browser.get('http://localhost:5000');
    element(by.model('dinoctrl.newDino.name')).sendKeys('Preachasaurus');
    element(by.model('dinoctrl.newDino.diet')).sendKeys('heathens');
    element(by.model('dinoctrl.newDino.specialPower')).sendKeys('religious allegory');
    element(by.model('dinoctrl.newDino.attack')).sendKeys('7');
    element(by.css('.btn-create-dino')).click();
    element(by.css('ul li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('Preachasaurus is a dinosaur that eats heathens and has the power of religious allegory and an attack strenght of 7');
    });
  });
});
