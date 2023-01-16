import { defaultTheme } from "../styles/themes/default";
//arquivo de definição de tipos
import "styled-components";
import { defaultTheme } from "styled-components";

type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
