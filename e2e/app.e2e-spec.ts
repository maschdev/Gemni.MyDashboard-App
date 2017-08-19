import { MyDashboardAppPage } from './app.po';

describe('my-dashboard-app App', function() {
  let page: MyDashboardAppPage;

  beforeEach(() => {
    page = new MyDashboardAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
