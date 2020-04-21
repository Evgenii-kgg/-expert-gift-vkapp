import { types } from 'mobx-state-tree';
import history from 'app/core/components/history/history';

export enum ScreenEnum {
  'MainPage',
  'Profile',
  'Stage',
  'ListGift'
}
// history.push(location)

const ScreenStore = types
  .model('ScreenStore', {
    currentScreen: ScreenEnum.Profile
  })
  .actions((self) => ({
    setScreen(screen: ScreenEnum) {
      self.currentScreen = screen;
    }
  }));

export default ScreenStore;

