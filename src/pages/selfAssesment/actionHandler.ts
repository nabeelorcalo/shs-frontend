import api from '../../api';
import { ROUTES_CONSTANTS } from '../../config/constants';
import apiEndpints from '../../config/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import {
  assessmentsDataState,
  assessmentDataState,
  filterData,
  remarkedByData,
} from '../../store';
import { useRecoilState } from 'recoil';
import _ from 'lodash';
import { Notifications } from '../../components';

const useCustomHook = () => {
  const { ASSESSMENT, MEDIA_UPLOAD } = apiEndpints;
  const navigate = useNavigate();
  const [selfAssessments, setSelfAssessments] =
    useRecoilState(assessmentsDataState);
  const [selfAssessment, setSelfAssessment] =
    useRecoilState(assessmentDataState);
  const [remarkedBy, setRemarkedBy] = useRecoilState(remarkedByData);
  const [filter, setFilter] = useRecoilState(filterData);

  const getSelfAssessments = async (val?: string) => {
    const hasValue = { search: val } ?? {};
    const { data } = await api.get(ASSESSMENT.GET_ASSESSMENTS, {
      ...filter,
      ...hasValue,
    });
    setSelfAssessments(data);
    if (_.isEmpty(filter)) {
      const remarkedObj = _.uniqBy(data, (obj: any) => obj.remarkedBy);
      setRemarkedBy(remarkedObj as any);
    }
  };

  const getSelfAssessment = async (id: number) => {
    const { data } = await api.get(`${ASSESSMENT.GET_ASSESSMENTS}/${id}`);
    const initialObject: any = {
      title: data.title,
      assessmentId: data.id,
      internSign: data?.internSig,
      supervisor: {
        firstName: data?.remarked?.firstName,
        lastName: data?.remarked?.lastName,
        sig: data?.supervisorSig,
      },
      name: `${data?.intern?.userDetail?.firstName} ${data?.intern?.userDetail?.lastName}`,
    };

    data.assessmentForm.forEach(
      (item: {
        learningCategorie: string;
        learningObjective: any;
        evidenceOfProgress: any;
        id: any;
      }) => {
        const category = item?.learningCategorie?.toLowerCase() || '';
        const objectiveKey = `${category}_objective`;
        const evidenceKey = `${category}_evidence`;
        const idKey = `${category}_id`;
        initialObject[objectiveKey] = item?.learningObjective || '';
        initialObject[evidenceKey] = item?.evidenceOfProgress || '';
        initialObject[idKey] = item?.id;
      }
    );
    setSelfAssessment(initialObject);
  };

  const saveSelfAssessment = async (assessment: any) => {
    const { data } = await api.post(ASSESSMENT.ADD_ASSESSMENT, assessment);
    if (data) {
      await getSelfAssessments();
      Notifications({
        title: 'Success',
        description: 'Assessment added',
        type: 'success',
      });
      navigate(`/${ROUTES_CONSTANTS.SELF_ASSESSMENT}`);
    }
  };

  const editSelfAssessment = async (assessment: any, id: number) => {
    const data = await api.patch(
      `${ASSESSMENT.EDIT_ASSESSMENT}/${id}`,
      assessment
    );
    if (data) {
      await getSelfAssessments();
      Notifications({
        title: 'Success',
        description: 'Assessment Edited',
        type: 'success',
      });
      navigate(`/${ROUTES_CONSTANTS.SELF_ASSESSMENT}`);
    }
  };

  const downloadAssessment = async (assessment: {
    id: number;
    downloadType: string;
  }) => {
    const { data } = await api.get(
      `${ASSESSMENT.GET_ASSESSMENT}/${assessment.id}`,
      { downloadType: assessment.downloadType }
    );
  };

  // custom header for "multipart/form-data"
  let headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
  const formData = new FormData();
  //upload manager signature and update feedback form data state to get signature s3 URL
  const handleSignatureUpload = async (file: any) => {
    let url = '';
    if (file) {
      formData.append('file', file);
      await api
        .post(MEDIA_UPLOAD, formData, headerConfig)
        .then(({ data }: any) => {
          url = data?.url;
        });
    }
    return url;
  };

  const handleFileUpload = async (file: any) => {
    // media upload
    const formData = new FormData();
    // custom header for "multipart/form-data"
    let headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
    if (file) {
      formData.append('file', file);
      const fileData = await api.post(MEDIA_UPLOAD, formData, headerConfig);
      return fileData?.data;
    }
  };

  const deleteAssessment = async (assessment: { id: number }) => {
    const data = await api.delete(
      `${ASSESSMENT.DELETE_ASSESSMENT}/${assessment.id}`
    );
    if (data.message === 'Success' || data.statusCode === 200) {
      await getSelfAssessments();
      Notifications({
        title: 'Success',
        description: 'Assessment Deleted',
        type: 'success',
      });
    }
  };

  const checkForImage = (url: string) => {
    let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;
    if (url && url.match(regex)) return true;
    else return false;
  };

  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  return {
    selfAssessments,
    remarkedBy,
    debouncedSearch,
    getSelfAssessment,
    editSelfAssessment,
    getSelfAssessments,
    downloadAssessment,
    saveSelfAssessment,
    deleteAssessment,
    handleFileUpload,
    checkForImage,
    handleSignatureUpload,
  };
};

export default useCustomHook;
