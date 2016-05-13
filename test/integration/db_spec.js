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
  it('should get a list of dinosaurs, the last one should be the last one created', () => {
    browser.get('http://localhost:5000');
    element(by.css('ul li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('Preachasaurus is a dinosaur that eats heathens and has the power of religious allegory and an attack strenght of 7');
    });
  });
  it('should not update on cancel', () => {
    browser.get('http://localhost:5000');
    element(by.css('ul li:last-child .btn-edit-dino')).click();
    element(by.model('dino.name')).clear().sendKeys('A different guy');
    element(by.model('dino.diet')).clear().sendKeys('mice');
    element(by.model('dino.specialPower')).clear().sendKeys('things');
    element(by.model('dino.attack')).clear().sendKeys('3');
    element(by.css('ul li:last-child .btn-cancel-dino')).click();
    element(by.css('ul li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('Preachasaurus is a dinosaur that eats heathens and has the power of religious allegory and an attack strenght of 7');
    });
  });
  it('should update the last dinosaur in the list', () => {
    browser.get('http://localhost:5000');
    element(by.css('ul li:last-child .btn-edit-dino')).click();
    element(by.model('dino.name')).clear().sendKeys('A different guy');
    element(by.model('dino.diet')).clear().sendKeys('mice');
    element(by.model('dino.specialPower')).clear().sendKeys('things');
    element(by.model('dino.attack')).clear().sendKeys('3');
    element(by.css('ul li:last-child .btn-update-dino')).click();
    element(by.css('ul li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('A different guy is a dinosaur that eats mice and has the power of things and an attack strenght of 3');
    });
  });
  it('should delete the last dinosaur', () => {
    browser.get('http://localhost:5000');
    element(by.css('ul li:last-child .btn-remove-dino')).click();
    element(by.css('ul li:last-child p')).getText().then( (text) => {
      expect(text).not.toEqual('Preachasaurus is a dinosaur that eats heathens and has the power of religious allegory and an attack strenght of 7');
    });
  });
});
