import * as React from "react";
import WebFont from "webfontloader";
import {grey} from "@mui/material/colors";
import {createTheme, Theme as MuiTheme, ThemeProvider as MuiThemeProvider,} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {Theme} from "../../types/theme";
import ParkIcon from "@mui/icons-material/Park";


interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const muiTheme: MuiTheme = React.useMemo(() => {
    const currentTheme: Theme = {
      primary: `#FEE282`,
      secondary: `#00A7D3`,
      description:
          "Get to know the most known react form libraries used to date. ",
      divider: `#D58820`,
      backgroundSecondary: `#00689F`,
      backgroundPrimary: `#0F233A`,
      mode: "dark",
      name: "forest",
      title: "Forest",
      icon: ParkIcon,
      primaryFont: "Lobster",
      secondaryFont: "Lobster",
      textFont: "Antic Slab",
    }

    const families = [
      currentTheme.primaryFont,
      currentTheme.secondaryFont,
      currentTheme.textFont,
    ];
    if (currentTheme.tertiaryFont) {
      families.push(currentTheme.tertiaryFont);
    }
    WebFont.load({
      google: {
        families: families,
      },
    });

    const primaryFont = {
      fontFamily: [`"${currentTheme.primaryFont}"`, "Roboto"].join(","),
    };
    const secondaryFont = {
      fontFamily: [`"${currentTheme.secondaryFont}"`, "Roboto"].join(","),
    };

    const tertiaryFont = {
      fontFamily: [
        `"${
          currentTheme.tertiaryFont
            ? currentTheme.tertiaryFont
            : currentTheme.secondaryFont
        }"`,
        "Roboto",
      ].join(","),
    };

    const textFont = {
      fontFamily: [`"${currentTheme.textFont}"`, "sans-serif"].join(","),
    };
    const {
      mode: modeColor,
      primary,
      secondary,
      divider,
      backgroundPrimary,
      backgroundSecondary,
    } = currentTheme;

    const textPrimary = modeColor === "light" ? `#000000` : grey["50"];
    const textSecondary = modeColor === "light" ? grey["900"] : grey["400"];

    return createTheme({
      palette: {
        mode: modeColor,
        primary: {
          main: primary,
        },
        secondary: {
          main: secondary,
        },
        divider: divider,
        background: {
          default: backgroundPrimary,
          paper: backgroundSecondary,
        },
        text: {
          primary: textPrimary,
          secondary: textSecondary,
        },
      },
      typography: {
        ...textFont,
        h1: primaryFont,
        h2: primaryFont,
        h3: secondaryFont,
        h4: secondaryFont,
        h5: tertiaryFont,
        h6: tertiaryFont,
      },
      components: {
        // Name of the component
        MuiTableCell: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              borderBottom: "1px solid transparent",
              borderBottomColor: divider,
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: secondary,
              color: textPrimary,
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: secondary,
              color: textPrimary,
            },
          },
        },
        MuiListSubheader: {
          styleOverrides: {
            root: {
              backgroundColor: "transparent",
              lineHeight: "2rem",
            },
          },
        },
      },
    });
  }, []);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
};
