import { cast, Instance, types } from 'mobx-state-tree';
import { customAlert } from 'app/core/components/alert';


// const countSaveMarks = 0;

const Gift = types
  .model('Gift', {
    id: types.identifierNumber,
    title: '',
    img: '',
    mark: types.maybeNull(types.number),
    saved: types.maybe(types.boolean)
  })
  .actions((self) => ({
    setMark(mark: 0 | 1) {
      self.mark = mark;
      self.saved = false;
    },
    setSave() {
      self.saved = true;
    }
  }));

export type GiftType = Instance<typeof Gift>;

const GiftStore = types
  .model('GiftStore', {
    gifts: types.array(Gift),
    currentGiftIndex: 0
  })
  .views((self) => ({}))
  .actions((self) => ({
    setGifts(gifts?: GiftType[]) {
      if (gifts && gifts.length > 0) {
        self.gifts = cast(gifts);
        // self.gifts.replace(mocks)
      } else {
        customAlert.danger('Не удалось получить список подарков!');
      }
    },
    attachGifts(gifts: GiftType[]) {
      const uniqueGifts: GiftType[] = self.gifts
        .concat(gifts)
        .reduce(
          (acc, value: any) =>
            acc.some((i: GiftType) => i.id === value.id)
              ? acc
              : acc.concat(value),
          []
        );
      self.gifts.replace(uniqueGifts);
    },
    setCurrentGiftIndex(index: number) {
      self.currentGiftIndex = index;
    }
  }));

export type GiftStoreType = Instance<typeof GiftStore>;

export default GiftStore;
