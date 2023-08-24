import { createContext, useContext } from "react";
import { useRecoilValue } from "recoil";
import constants from "../config/constants";
import {
  IconPColorState,
  IconSColorState,
  logoSelector,
  primaryBtnColorState,
  secondaryBtnColorState,
  sidebarColorState 
} from "../store";


export const CustomTheme = () => {
  const primaryBtnColor = useRecoilValue(primaryBtnColorState);
  const secondaryBtnColor = useRecoilValue(secondaryBtnColorState);
  const sidebarcolor = useRecoilValue(sidebarColorState);
  const sideMenuPIconColor = useRecoilValue(IconPColorState)
  const sideMenuSIconColor = useRecoilValue(IconSColorState)
  const themeImage = useRecoilValue(logoSelector)

  const colors = {
    image: `${constants.MEDIA_URL}/${themeImage?.mediaId}.${themeImage?.metaData?.extension}`,
    primary: primaryBtnColor,
    secondary: secondaryBtnColor,
    sidebar: sidebarcolor,
    pIcon: sideMenuPIconColor,
    sIcon: sideMenuSIconColor
  }

  const themeContext = createContext(colors);
  const theme = useContext(themeContext);

  return { themeContext, theme }
}