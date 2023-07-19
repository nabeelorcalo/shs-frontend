import { createContext, useContext, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { IconPColorState, IconSColorState, companyLogo, imageState, primaryBtnColorState, secondaryBtnColorState, sidebarColorState } from "../store";

export const CustomTheme = () => {
  const primaryBtnColor = useRecoilValue(primaryBtnColorState);
  const secondaryBtnColor = useRecoilValue(secondaryBtnColorState);
  const sidebarcolor = useRecoilValue(sidebarColorState);
  const sideMenuPIconColor = useRecoilValue(IconPColorState)
  const sideMenuSIconColor = useRecoilValue(IconSColorState)
  const themeImage = useRecoilValue(companyLogo)


  const colors = {
    image: themeImage,
    primary: primaryBtnColor,
    secondary: secondaryBtnColor,
    sidebar: sidebarcolor,
    pIcon: sideMenuPIconColor,
    sIcon: sideMenuSIconColor
  }
  console.log(themeImage, "secondary Color");

  const themeContext = createContext(colors);
  const theme = useContext(themeContext);

  return { themeContext, theme }
}