import { ProjectquoraPage } from './app.po';

describe('projectquora App', () => {
  let page: ProjectquoraPage;

  beforeEach(() => {
    page = new ProjectquoraPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
