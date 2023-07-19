// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import { useRecoilState } from "recoil";
import apiEndPoints from "../../config/apiEndpoints";
import api from "../../api";
import { IconPColorState, IconSColorState, imageState, pColorState, sColorState, sbColorState, themeState } from "../../store";


// Chat operation and save into store
const useCustomHook = () => {
  const [pColor, setPColor] = useRecoilState<any>(pColorState);
  const [sColor, setSColor] = useRecoilState<any>(sColorState);
  const [sbColor, setSBColor] = useRecoilState<any>(sbColorState);
  const [pIconsColor, setPIconsColor] = useRecoilState<any>(IconPColorState);
  const [sIconsColor, setSIconsColor] = useRecoilState<any>(IconSColorState);
  const [themeLogo, setThemeLogo] = useRecoilState<any>(imageState);
  const { PACTH_PERSONALIZATION } = apiEndPoints;

  const personalizePatch = async (payload: any) => {
    console.log(payload, "payload")
    try {
      let res = await api.patch(PACTH_PERSONALIZATION, payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then(() => {
        setPColor(payload?.buttonPrimaryColor)
        setSColor(payload?.buttonSecondaryColor)
        setSBColor(payload?.sideMenuColor)
        setPIconsColor(payload?.sideMenuIconPrimaryColor)
        setSIconsColor(payload?.sideMenuIconSecondaryColor)
        setThemeLogo(payload?.logo)
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  return {
    personalizePatch,
    sIconsColor,
    pIconsColor,
    sbColor,
    sColor,
    pColor,
    themeLogo
  };
};

export default useCustomHook;