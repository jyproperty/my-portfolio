import { Box, Typography, Divider } from '@mui/material'

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid var(--color-primary-dark)',
        py: 3,
        textAlign: 'center',
      }}
    >
      <Divider sx={{ borderColor: 'var(--color-primary-dark)', mb: 2 }} />
      <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
        © 2026 My Portfolio. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
