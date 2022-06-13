import { createSlice } from '@reduxjs/toolkit';

const getInitialShop = () => {
  // getting shop list
  const localShopList = window.localStorage.getItem('shopList');
  if (localShopList) {
    return JSON.parse(localShopList);
  }
  window.localStorage.setItem('shopList', []);
  return [];
};

const initialValue = {
  filterStatus: 'all',
  shopList: getInitialShop(),
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState: initialValue,
  reducers: {
    // add shop
    addShop: (state, action) => {
      state.shopList.push(action.payload);
      const shopList = window.localStorage.getItem('shopList');
      if (shopList) {
        const shopListArr = JSON.parse(shopList);
        shopListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('shopList', JSON.stringify(shopListArr));
      } else {
        window.localStorage.setItem(
          'shopList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    updateShop: (state, action) => {
      const shopList = window.localStorage.getItem('shopList');
      if (shopList) {
        const shopListArr = JSON.parse(shopList);
        shopListArr.forEach((shop) => {
          if (shop.id === action.payload.id) {
            shop.shopName = action.payload.shopName;
            shop.area = action.payload.area;
          }
        });
        window.localStorage.setItem('shopList', JSON.stringify(shopListArr));
        state.shopList = [...shopListArr];
      }
    },
    // delete shop
    deleteShop: (state, action) => {
      const shopList = window.localStorage.getItem('shopList');
      if (shopList) {
        const shopListArr = JSON.parse(shopList);
        shopListArr.forEach((shop, index) => {
          if (shop.id === action.payload) {
            shopListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('shopList', JSON.stringify(shopListArr));
        state.shopList = shopListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addShop, deleteShop, updateShop, updateFilterStatus } =
  shopSlice.actions;
export default shopSlice.reducer;
