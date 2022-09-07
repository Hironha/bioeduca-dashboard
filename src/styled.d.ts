import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
    colors: {
      primary: string,
      success: string,
      warning: string,
      error: string,
    },
    border: {
      radius: string,
    },
	}
}