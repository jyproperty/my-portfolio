import { Box, Typography, Button, Container, Divider, Card, CardContent, Chip, IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const statusColor = {
  '완료': 'var(--color-primary)',
  '진행중': 'var(--color-accent)',
  '준비중': 'var(--color-text-muted)',
}

function Home() {
  const featuredProjects = projects.slice(0, 3)

  return (
    <Box>
      {/* Hero 섹션 */}
      <Box
        sx={{
          bgcolor: 'var(--color-bg-primary)',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="body2"
            sx={{
              color: 'var(--color-primary)',
              letterSpacing: 3,
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            안녕하세요, 저는
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            개발자 포트폴리오
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: 'var(--color-text-secondary)',
              fontWeight: 400,
              mb: 4,
              fontSize: { xs: '1.1rem', md: '1.4rem' },
            }}
          >
            React와 MUI로 만드는 포트폴리오 사이트입니다.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component={Link}
              to="/portfolio"
              size="large"
              sx={{
                bgcolor: 'var(--color-button-primary)',
                color: 'var(--color-text-primary)',
                px: 4,
                py: 1.5,
                '&:hover': { bgcolor: 'var(--color-button-hover)' },
              }}
            >
              작품 보기
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/contact"
              size="large"
              sx={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-text-secondary)',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'var(--color-text-primary)',
                  color: 'var(--color-text-primary)',
                },
              }}
            >
              연락하기
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 소개 요약 섹션 */}
      <Box sx={{ bgcolor: 'var(--color-bg-secondary)', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{ color: 'var(--color-text-primary)', textAlign: 'center', mb: 6 }}
          >
            무엇을 하나요?
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
              gap: 4,
            }}
          >
            {[
              { title: 'Frontend', desc: 'React, MUI를 활용한 반응형 UI 개발' },
              { title: 'Design', desc: '디자인 시스템 기반의 일관된 UI/UX 구성' },
              { title: 'Deploy', desc: 'GitHub Actions를 활용한 CI/CD 자동화' },
            ].map((item) => (
              <Box
                key={item.title}
                sx={{
                  bgcolor: 'var(--color-bg-primary)',
                  border: '1px solid var(--color-primary-dark)',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: 'var(--color-primary)', mb: 2 }}
                >
                  {item.title}
                </Typography>
                <Divider sx={{ borderColor: 'var(--color-accent)', mb: 2, width: '40px', mx: 'auto', borderWidth: 2 }} />
                <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)' }}>
                  {item.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 프로젝트 섹션 */}
      <Box sx={{ bgcolor: 'var(--color-bg-primary)', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{ color: 'var(--color-text-primary)', mb: 1 }}
          >
            Projects
          </Typography>
          <Divider sx={{ borderColor: 'var(--color-accent)', mb: 2, width: '60px', borderWidth: 2 }} />
          <Typography variant="body1" sx={{ color: 'var(--color-text-muted)', mb: 6 }}>
            최근에 만든 프로젝트들입니다.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
              gap: 3,
              mb: 4,
            }}
          >
            {featuredProjects.map((project) => (
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

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              component={Link}
              to="/portfolio"
              sx={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-text-secondary)',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'var(--color-text-primary)',
                  color: 'var(--color-text-primary)',
                },
              }}
            >
              전체 프로젝트 보기
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
