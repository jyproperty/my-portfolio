import { Box, Typography, Container, Card, CardContent, Chip, Divider, IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { projects } from '../data/projects'

const statusColor = {
  '완료': 'var(--color-primary)',
  '진행중': 'var(--color-accent)',
  '준비중': 'var(--color-text-muted)',
}

function Portfolio() {
  return (
    <Box sx={{ bgcolor: 'var(--color-bg-primary)', minHeight: '80vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          sx={{ color: 'var(--color-text-primary)', mb: 1, fontSize: { xs: '2rem', md: '2.5rem' } }}
        >
          Portfolio
        </Typography>
        <Divider sx={{ borderColor: 'var(--color-accent)', mb: 2, width: '60px', borderWidth: 2 }} />
        <Typography variant="body1" sx={{ color: 'var(--color-text-muted)', mb: 6 }}>
          직접 만든 프로젝트들을 소개합니다.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {projects.map((project) => (
            <Card
              key={project.id}
              sx={{
                bgcolor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-primary-dark)',
                borderRadius: 2,
                transition: 'border-color 0.2s ease',
                '&:hover': { borderColor: 'var(--color-primary)' },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h3" sx={{ color: 'var(--color-text-primary)' }}>
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: statusColor[project.status],
                      fontSize: '0.75rem',
                      border: `1px solid ${statusColor[project.status]}`,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {project.status}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 3, lineHeight: 1.7, flex: 1 }}>
                  {project.desc}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: 'var(--color-primary-dark)',
                        color: 'var(--color-text-muted)',
                        fontSize: '0.75rem',
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    component="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{ color: 'var(--color-text-muted)', '&:hover': { color: 'var(--color-text-primary)' } }}
                  >
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Portfolio
