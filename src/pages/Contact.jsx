import { Box, Typography, Container, Divider } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'

const contactItems = [
  {
    icon: <EmailIcon />,
    label: 'Email',
    value: 'your.email@example.com',
    desc: '이메일로 연락주세요',
  },
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    value: 'github.com/jyproperty',
    desc: '프로젝트 코드를 확인하세요',
  },
]

function Contact() {
  return (
    <Box sx={{ bgcolor: 'var(--color-bg-primary)', minHeight: '80vh', py: 8 }}>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{ color: 'var(--color-text-primary)', mb: 1, fontSize: { xs: '2rem', md: '2.5rem' } }}
        >
          Contact
        </Typography>
        <Divider sx={{ borderColor: 'var(--color-accent)', mb: 2, width: '60px', borderWidth: 2 }} />
        <Typography variant="body1" sx={{ color: 'var(--color-text-muted)', mb: 6 }}>
          궁금한 점이나 협업 제안이 있다면 언제든지 연락주세요.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {contactItems.map((item) => (
            <Box
              key={item.label}
              sx={{
                bgcolor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-primary-dark)',
                borderRadius: 2,
                p: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Box
                sx={{
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  bgcolor: 'var(--color-primary-dark)',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: 'var(--color-text-muted)', mb: 0.5 }}>
                  {item.label}
                </Typography>
                <Typography variant="h3" sx={{ color: 'var(--color-text-primary)', mb: 0.5 }}>
                  {item.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                  {item.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* 메시지 안내 박스 */}
        <Box
          sx={{
            bgcolor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-accent)',
            borderRadius: 2,
            p: 4,
            mt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ color: 'var(--color-primary)', mb: 2 }}>
            함께 만들어요
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)' }}>
            새로운 프로젝트, 아이디어, 또는 단순한 인사도 환영합니다.
            빠른 시일 내에 답변 드리겠습니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Contact
