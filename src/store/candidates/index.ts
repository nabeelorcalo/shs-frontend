import { atom } from "recoil";

export const cadidatesListState = atom({
  key: 'cadidatesListState',
  default: []
});
export const selectedCandidateState = atom({
  key: 'selectedCandidateState',
  default: []
});

export const cadidatesInterviewListState = atom({
  key: 'cadidatesInterviewListState',
  default: []
});

export const cadidatesCommentListState = atom({
  key: 'cadidatesiNTERVIEWListState',
  default: []
});

export const cadidatesAPICallStatus = atom({
  key: 'cadidatesAPICallStatus',
  default: false
});

