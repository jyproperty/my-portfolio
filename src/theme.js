import { createTheme } from '@mui/material/styles'

// 컬러 팔레트 디자인 시스템 (huemint.com 기반 웜-다크 팔레트)
const colors = {
  primary: '#746250',        // 웜 모카 브라운
  primaryLight: '#9c8879',   // 로즈-베이지 그레이
  primaryDark: '#4e4a45',    // 웜 다크 그레이
  secondary: '#706766',      // 쿨-뉴트럴 미드 그레이
  accent: '#441b18',         // 딥 버건디
  bgPrimary: '#141313',      // 거의 검정 차콜
  bgSecondary: '#2c2e2b',    // 짙은 올리브 다크 그레이
  textPrimary: '#ada8aa',    // 쿨 라이트 그레이
  textSecondary: '#9c8879',  // 로즈-베이지 그레이
  textMuted: '#706766',      // 미드 그레이
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
      dark: colors.primaryDark,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.accent,
    },
    background: {
      default: colors.bgPrimary,
      paper: colors.bgSecondary,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      disabled: colors.textMuted,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: colors.accent,
          color: colors.textPrimary,
          '&:hover': {
            backgroundColor: colors.primary,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgSecondary,
          border: `1px solid ${colors.primaryDark}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgPrimary,
          borderBottom: `1px solid ${colors.primaryDark}`,
          boxShadow: 'none',
        },
      },
    },
  },
})

export { colors }
export default theme
