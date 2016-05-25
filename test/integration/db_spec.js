describe('angular app', () => {
  it('should create a dinosaur', () => {
    browser.get('http://localhost:5000');
    element(by.css('.dinosaurs .create')).element(by.model('dino.name')).sendKeys('Preachasaurus');
    element(by.css('.dinosaurs .create')).element(by.model('dino.diet')).sendKeys('heathens');
    element(by.css('.dinosaurs .create')).element(by.model('dino.specialPower')).sendKeys('religious allegory');
    element(by.css('.dinosaurs .create')).element(by.model('dino.attack')).sendKeys('7');
    element(by.css('.btn-create-dino')).click();
    element(by.css('.dinosaurs .items li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('Preachasaurus is a dinosaur that eats '
      + 'heathens and has the power of religious allegory and an attack strength of 7');
    });
  });
  it('should get a list of dinosaurs, the last one should be the last one created', () => {
    browser.get('http://localhost:5000');
    element(by.css('.dinosaurs .items li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('Preachasaurus is a dinosaur that eats '
      + 'heathens and has the power of religious allegory and an attack strength of 7');
    });
  });
  it('should not update the last dinosaur on cancel', () => {
    browser.get('http://localhost:5000');
    element(by.css('.dinosaurs .items li:last-child .btn-edit-dino')).click();
    element(by.css('.dinosaurs .items')).element(by.model('dino.name')).clear().sendKeys('A different guy');
    element(by.css('.dinosaurs .items')).element(by.model('dino.diet')).clear().sendKeys('mice');
    element(by.css('.dinosaurs  .items')).element(by.model('dino.specialPower')).clear().sendKeys('things');
    element(by.css('.dinosaurs .items')).element(by.model('dino.attack')).clear().sendKeys('3');
    element(by.css('.dinosaurs .items li:last-child .btn-cancel-dino')).click();
    element(by.css('.dinosaurs .items li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('Preachasaurus is a dinosaur that eats '
      + 'heathens and has the power of religious allegory and an attack strength of 7');
    });
  });
  it('should update the last dinosaur in the list', () => {
    browser.get('http://localhost:5000');
    element(by.css('.dinosaurs .items li:last-child .btn-edit-dino')).click();
    element(by.css('.dinosaurs .items')).element(by.model('dino.name')).clear().sendKeys('A different guy');
    element(by.css('.dinosaurs .items')).element(by.model('dino.diet')).clear().sendKeys('mice');
    element(by.css('.dinosaurs .items')).element(by.model('dino.specialPower')).clear().sendKeys('things');
    element(by.css('.dinosaurs .items')).element(by.model('dino.attack')).clear().sendKeys('3');
    element(by.css('.dinosaurs .items li:last-child .btn-update-dino')).click();
    element(by.css('.dinosaurs .items li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('A different guy is a dinosaur that eats '
      + 'mice and has the power of things and an attack strength of 3');
    });
  });
  it('should delete the last dinosaur', () => {
    browser.get('http://localhost:5000');
    element(by.css('.dinosaurs .items li:last-child .btn-remove-dino')).click();
    var last = element(by.css('.dinosaurs .items li:last-child p'));
    expect(last.isPresent()).toBeFalsy();
  });
  it('should create a politician', () => {
    browser.get('http://localhost:5000');
    element(by.css('.politicians .create')).element(by.model('politician.name')).sendKeys('Donald Drumpf');
    element(by.css('.politicians .create')).element(by.model('politician.party')).sendKeys('crazy towner');
    element(by.css('.politicians .create')).element(by.model('politician.specialPower')).sendKeys('big hair');
    element(by.css('.politicians .create')).element(by.model('politician.debateSkills')).sendKeys('1');
    element(by.css('.btn-create-politician')).click();
    element(by.css('.politicians .items li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('Donald Drumpf is a crazy towner that has '
      + 'the power of big hair and a debate skill of 1');
    });
  });
  it('should get a list of politicians, the last one should be the last one created', () => {
    browser.get('http://localhost:5000');
    element(by.css('.politicians .items li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('Donald Drumpf is a crazy towner that has '
      + 'the power of big hair and a debate skill of 1');
    });
  });
  it('should not update on cancel', () => {
    browser.get('http://localhost:5000');
    element(by.css('.politicians .items li:last-child .btn-edit-politician')).click();
    element(by.css('.politicians .items')).element(by.model('politician.name')).clear().sendKeys('A different guy');
    element(by.css('.politicians .items')).element(by.model('politician.party')).clear().sendKeys('mice');
    element(by.css('.politicians .items')).element(by.model('politician.specialPower')).clear().sendKeys('things');
    element(by.css('.politicians .items')).element(by.model('politician.debateSkills')).clear().sendKeys('3');
    element(by.css('.politicians .items li:last-child .btn-cancel-politician')).click();
    element(by.css('.politicians .items li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('Donald Drumpf is a crazy towner that has '
      + 'the power of big hair and a debate skill of 1');
    });
  });
  it('should update the last politician in the list', () => {
    browser.get('http://localhost:5000');
    element(by.css('.politicians .items li:last-child .btn-edit-politician')).click();
    element(by.css('.politicians .items')).element(by.model('politician.name')).clear().sendKeys('A different guy');
    element(by.css('.politicians .items')).element(by.model('politician.party')).clear().sendKeys('mice');
    element(by.css('.politicians .items')).element(by.model('politician.specialPower')).clear().sendKeys('things');
    element(by.css('.politicians .items')).element(by.model('politician.debateSkills')).clear().sendKeys('3');
    element(by.css('.politicians .items li:last-child .btn-update-politician')).click();
    element(by.css('.politicians .items li:last-child p')).getText().then( (text) => {
      expect(text).toEqual('A different guy is a mice that has '
      + 'the power of things and a debate skill of 3');
    });
  });
  it('should delete the last politician', () => {
    browser.get('http://localhost:5000');
    element(by.css('.politicians .items li:last-child .btn-remove-politician')).click();
    var last = element(by.css('.politicians .items li:last-child p'));
    expect(last.isPresent()).toBeFalsy();
  });
});
