import { useState } from 'react'
import {
  Box,
  Typography,
  Container,
  Chip,
  Divider,
  Card,
  CardContent,
  Avatar,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PersonIcon from '@mui/icons-material/Person'

const skills = ['React', 'JavaScript', 'MUI', 'TypeScript', 'Git', 'Vite', 'CSS', 'HTML']

const initialAboutMeData = {
  basicInfo: {
    name: '홍길동',
    education: 'OO대학교 컴퓨터공학과',
    major: '웹 개발',
    experience: '1년차 / 신입',
    photo: '',
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content: '개발을 시작하게 된 계기나 경험을 작성해주세요.',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content: '개발할 때 중요하게 생각하는 가치나 원칙을 작성해주세요.',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content: '취미, 관심사 등 개인적인 내용을 작성해주세요.',
      showInHome: false,
    },
  ],
}

function About() {
  const [aboutMeData] = useState(initialAboutMeData)

  const { basicInfo, sections } = aboutMeData

  const handlePhotoChange = (e) => {
    // 이미지 업로드 처리 (추후 구현)
    const file = e.target.files[0]
    if (file) {
      console.log('업로드된 파일:', file.name)
    }
  }

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

        {/* 기본 정보 카드 */}
        <Card
          sx={{
            bgcolor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-primary-dark)',
            borderRadius: 2,
            mb: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h3" sx={{ color: 'var(--color-primary)', mb: 3 }}>
              기본 정보
            </Typography>
            <Grid container spacing={3} alignItems="center">
              {/* 프로필 사진 */}
              <Grid item xs={12} sm="auto">
                <Box
                  component="label"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                  }}
                >
                  <Avatar
                    src={basicInfo.photo || undefined}
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: 'var(--color-primary-dark)',
                      border: '2px dashed var(--color-primary)',
                    }}
                  >
                    {!basicInfo.photo && <PersonIcon sx={{ fontSize: 48, color: 'var(--color-primary)' }} />}
                  </Avatar>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                    사진 업로드
                  </Typography>
                  <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
                </Box>
              </Grid>

              {/* 텍스트 정보 */}
              <Grid item xs={12} sm>
                <Grid container spacing={2}>
                  {[
                    { label: '이름', value: basicInfo.name },
                    { label: '학력', value: basicInfo.education },
                    { label: '전공', value: basicInfo.major },
                    { label: '경력', value: basicInfo.experience },
                  ].map(({ label, value }) => (
                    <Grid item xs={12} sm={6} key={label}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: 'var(--color-accent)', minWidth: '40px', fontWeight: 600 }}
                        >
                          {label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* 콘텐츠 섹션 (아코디언) */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ color: 'var(--color-primary)', mb: 2 }}>
            소개
          </Typography>
          {sections.map((section) => (
            <Accordion
              key={section.id}
              sx={{
                bgcolor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-primary-dark)',
                borderRadius: '8px !important',
                mb: 1,
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'var(--color-primary)' }} />}
                sx={{ px: 3 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography variant="body1" sx={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
                    {section.title}
                  </Typography>
                  {section.showInHome && (
                    <Chip
                      label="홈 노출"
                      size="small"
                      sx={{
                        bgcolor: 'var(--color-primary-dark)',
                        color: 'var(--color-accent)',
                        border: '1px solid var(--color-accent)',
                        fontSize: '0.65rem',
                        height: '20px',
                      }}
                    />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3 }}>
                <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                  {section.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* 기술 스택 */}
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

        {/* 경력 / 학력 */}
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
