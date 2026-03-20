import { Box, Typography, Container, Card, CardContent, Chip, Divider } from '@mui/material'

const projects = [
  {
    id: 1,
    title: '프로젝트 1',
    desc: '여기에 첫 번째 프로젝트 설명이 들어갑니다. 어떤 기술을 사용했는지, 어떤 문제를 해결했는지 작성하세요.',
    tags: ['React', 'MUI'],
    status: '완료',
  },
  {
    id: 2,
    title: '프로젝트 2',
    desc: '여기에 두 번째 프로젝트 설명이 들어갑니다. 프로젝트의 주요 기능과 배운 점을 작성하세요.',
    tags: ['React', 'Vite', 'CSS'],
    status: '진행중',
  },
  {
    id: 3,
    title: '프로젝트 3',
    desc: '여기에 세 번째 프로젝트 설명이 들어갑니다. 앞으로 추가될 작품들이 이 형태로 보여집니다.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    status: '준비중',
  },
]

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
          앞으로 제가 만든 작품들이 이 곳에 추가됩니다.
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
              }}
            >
              <CardContent sx={{ p: 3 }}>
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
                    }}
                  >
                    {project.status}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 3, lineHeight: 1.7 }}>
                  {project.desc}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Portfolio
