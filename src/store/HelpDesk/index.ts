import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import constants from "../../config/constants";
const { persistAtom } = recoilPersist();

export const helpDeskListState = atom({
  key: "helpDeskListState",
  default: [],
});

export const helpDeskListDetail = atom({
  key: "helpDeskListDetail",
  default: [],
});

export const getRoleBaseUsers = atom({
  key: "getRoleBaseUsers",
  default: [],
});

export const getRoleBaseUsersData = selector({
  key: "getRoleBaseUsersData",
  get: ({ get }) => {
    const usersList = get(getRoleBaseUsers);
    return usersList.map((val: any, index: number) => ({
      key: index,
      value: val?.id,
      label: `${val?.firstName} ${val?.lastName}`,
      avatarPlaceholder: `${val?.firstName?.charAt(0)} ${val?.lastName?.charAt(0)}`,
      avatar: `${constants.MEDIA_URL}/${val?.profileImage?.mediaId}.${val?.profileImage?.metaData?.extension}`
    })).sort((a: any, b: any) =>
      a.label.localeCompare(b.label)
    );
  },
});

export const helpDeskFilters = atom({
  key: "helpDeskFilters",
  default: {
    page: 1,
    limit: 10,
    date: null,
    assignedUsers: [],
    roles: [],
    assigned: "",
    priority: null,
    type: null,
    status: '',
    search: null,
    sort: 'DESC',
    isFlaged: {}
  },
});

export const helpDeskPaginationState = atom({
  key: "helpDeskPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  },
});