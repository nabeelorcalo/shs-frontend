import { atom, selector } from "recoil";

export const propertyState = atom({
  key: 'propertyState',
  default: []
})

export const galleryState = atom({
  key: 'galleryState',
  default: []
})

export const availablePropertiesState = atom({
  key: 'availablePropertiesState',
  default: []
});

export const filterParamsState = atom({
  key: 'filterParamsState',
  default: {}
});

export const savedFilterState = atom({
  key: 'savedFilterState',
  default: {}
});

export const savedPropertiesState = atom({
  key: 'savedPropertiesState',
  default: []
});

export const rentedPropertiesState = atom({
  key: 'rentedPropertiesState',
  default: []
});

export const searchRentedState = atom({
  key: 'searchRentedState',
  default: {}
});

export const bookingRequestsState = atom({
  key: 'bookingRequestsState',
  default: []
});

export const propertyContractState = atom({
  key: 'propertyContractState',
  default: {}
});

export const bookingRequestsFilterState = atom({
  key: 'bookingRequestsFilterState',
  default: {page: 1, limit: 7}
});

export const allPropertyAgentsState = atom({
  key: 'allPropertyAgentsState',
  default: []
});

export const paymentsListState = atom({
  key: 'paymentsListState',
  default: []
});

export const paymentsFilterState = atom({
  key: 'paymentsFilterState',
  default: {page: 1, limit: 7}
});

export const bookingRequestParamsState = atom({
  key: 'bookingRequestParamsState',
  default: {}
});

export const allPaymentCardsState = atom({
  key: 'allPaymentCardsState',
  default: []
});

export const modalPaymentReceiptState = atom({
  key: 'modalPaymentReceiptState',
  default: false
})
