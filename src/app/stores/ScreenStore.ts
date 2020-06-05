/* import { types } from 'mobx-state-tree';
//import { useHistory } from "react-router-dom";

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

 */