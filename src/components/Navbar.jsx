import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
]

function Navbar() {
  const location = useLocation()

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            letterSpacing: 1,
            flexGrow: 1,
          }}
        >
          MY PORTFOLIO
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path
                  ? 'var(--color-accent)'
                  : 'var(--color-text-secondary)',
                fontWeight: location.pathname === item.path ? 600 : 400,
                '&:hover': { color: 'var(--color-text-primary)' },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
