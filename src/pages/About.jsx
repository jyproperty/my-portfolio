import { Box, Typography, Container, Chip, Divider } from '@mui/material'

const skills = ['React', 'JavaScript', 'MUI', 'TypeScript', 'Git', 'Vite', 'CSS', 'HTML']

function About() {
  return (
    <Box sx={{ bgcolor: 'var(--color-bg-primary)', minHeight: '80vh', py: 8 }}>
      <Container maxWidth="md">
        {/* 페이지 타이틀 */}
        <Typography
          variant="h1"
          sx={{ color: 'var(--color-text-primary)', mb: 1, fontSize: { xs: '2rem', md: '2.5rem' } }}
        >
          About Me
        </Typography>
        <Divider sx={{ borderColor: 'var(--color-accent)', mb: 6, width: '60px', borderWidth: 2 }} />

        {/* 소개 섹션 */}
        <Box
          sx={{
            bgcolor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-primary-dark)',
            borderRadius: 2,
            p: 4,
            mb: 4,
          }}
        >
          <Typography variant="h3" sx={{ color: 'var(--color-primary)', mb: 2 }}>
            소개
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            안녕하세요! 저는 React와 MUI를 활용한 프론트엔드 개발을 공부하고 있습니다.
            사용자 경험을 중시하며, 깔끔하고 유지보수하기 좋은 코드를 작성하는 것을 목표로 합니다.
            이 포트폴리오는 앞으로 제가 만든 작품들을 기록하는 공간입니다.
          </Typography>
        </Box>

        {/* 스킬 섹션 */}
        <Box
          sx={{
            bgcolor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-primary-dark)',
            borderRadius: 2,
            p: 4,
            mb: 4,
          }}
        >
          <Typography variant="h3" sx={{ color: 'var(--color-primary)', mb: 3 }}>
            기술 스택
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                sx={{
                  bgcolor: 'var(--color-primary-dark)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-primary)',
                  '&:hover': { bgcolor: 'var(--color-primary)', cursor: 'default' },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* 경력/학력 섹션 */}
        <Box
          sx={{
            bgcolor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-primary-dark)',
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography variant="h3" sx={{ color: 'var(--color-primary)', mb: 3 }}>
            경력 / 학력
          </Typography>
          {[
            { period: '2024 - 현재', title: '프론트엔드 개발 학습', desc: 'React, MUI 기반 프로젝트 개발' },
            { period: '2023', title: '웹 개발 입문', desc: 'HTML, CSS, JavaScript 기초 학습' },
          ].map((item, index) => (
            <Box key={index} sx={{ mb: index < 1 ? 3 : 0 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Typography variant="body2" sx={{ color: 'var(--color-accent)', minWidth: '80px', pt: 0.2 }}>
                  {item.period}
                </Typography>
                <Box>
                  <Typography variant="body1" sx={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
              {index < 1 && <Divider sx={{ borderColor: 'var(--color-primary-dark)', my: 2 }} />}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default About
