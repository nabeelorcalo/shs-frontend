import { RecoilState, atom } from "recoil";

export const cadidatesListState: RecoilState<any> = atom({
  key: 'cadidatesListState',
  default: []
});
export const selectedCandidateState: RecoilState<any> = atom({
  key: 'selectedCandidateState',
  default: []
});

export const cadidatesInterviewListState: RecoilState<any> = atom({
  key: 'cadidatesInterviewListState',
  default: []
});

export const cadidatesCommentListState: RecoilState<any> = atom({
  key: 'cadidatesiNTERVIEWListState',
  default: []
});

export const cadidatesAPICallStatus: RecoilState<any> = atom({
  key: 'cadidatesAPICallStatus',
  default: false
});

export const candidateFilterParam: RecoilState<any> = atom({
  key: 'candidateFilterParam',
  default: false
});
