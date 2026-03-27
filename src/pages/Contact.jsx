import { useState, useEffect } from 'react'
import {
  Box, Typography, Container, Divider,
  TextField, Button, Alert, CircularProgress,
  Switch, FormControlLabel, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Tooltip,
} from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { supabase } from '../supabase'

// ────────────────────────────────────────────
// 내 연락처 정보 (실제 정보로 수정하세요)
// ────────────────────────────────────────────
const MY_CONTACTS = [
  { icon: <PhoneIcon />, label: '전화번호', value: '010-0000-0000' },
  { icon: <EmailIcon />, label: '이메일', value: 'your.email@example.com' },
]

const MY_SNS = [
  { icon: <InstagramIcon />, label: 'Instagram', url: 'https://instagram.com/' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://linkedin.com/in/' },
  { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/jyproperty' },
]

const FIELD_SX = {
  '& .MuiOutlinedInput-root': {
    color: 'var(--color-text-primary)',
    '& fieldset': { borderColor: 'var(--color-primary-dark)' },
    '&:hover fieldset': { borderColor: 'var(--color-primary)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
  },
  '& .MuiInputLabel-root': { color: 'var(--color-text-muted)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-primary)' },
}

// ────────────────────────────────────────────
// 비공개 연락처 잠금 해제 다이얼로그
// ────────────────────────────────────────────
function UnlockDialog({ open, onClose, onUnlock }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  function handleConfirm() {
    if (pw === '1234') {
      onUnlock()
      setPw('')
      setError(false)
      onClose()
    } else {
      setError(true)
    }
  }

  function handleClose() {
    setPw('')
    setError(false)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{
      sx: { bgcolor: 'var(--color-bg-secondary)', border: '1px solid var(--color-primary-dark)', borderRadius: 2 }
    }}>
      <DialogTitle sx={{ color: 'var(--color-text-primary)' }}>비공개 연락처 열람</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: 'var(--color-text-muted)', mb: 2 }}>
          비밀번호를 입력하면 연락처를 확인할 수 있습니다.
        </Typography>
        <TextField
          label="비밀번호"
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false) }}
          onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
          fullWidth
          size="small"
          error={error}
          helperText={error ? '비밀번호가 올바르지 않습니다.' : ''}
          sx={FIELD_SX}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} sx={{ color: 'var(--color-text-muted)' }}>취소</Button>
        <Button onClick={handleConfirm} variant="contained" sx={{
          bgcolor: 'var(--color-accent)', color: 'var(--color-text-primary)',
          '&:hover': { bgcolor: 'var(--color-primary)' }
        }}>확인</Button>
      </DialogActions>
    </Dialog>
  )
}

// ────────────────────────────────────────────
// 방명록 카드
// ────────────────────────────────────────────
function GuestbookCard({ entry }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <Box sx={{
      bgcolor: 'var(--color-bg-secondary)',
      border: '1px solid var(--color-primary-dark)',
      borderRadius: 2,
      p: 3,
      transition: 'border-color 0.2s ease',
      '&:hover': { borderColor: 'var(--color-primary)' },
    }}>
      {/* 헤더: 이름 + 시각 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="body1" sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
          {entry.name?.trim() || '익명'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
          {formatDate(entry.created_at)}
        </Typography>
      </Box>

      {/* 방명록 내용 */}
      <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, mb: 1.5 }}>
        {entry.message}
      </Typography>

      {/* 소속/직업 */}
      {entry.affiliation && (
        <Typography variant="body2" sx={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', mb: 0.5 }}>
          🏢 {entry.affiliation}
        </Typography>
      )}

      {/* 연락처 */}
      {entry.contact && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          {entry.contact_public ? (
            <Typography variant="body2" sx={{ color: 'var(--color-primary)', fontSize: '0.8rem' }}>
              📞 {entry.contact}
            </Typography>
          ) : unlocked ? (
            <Typography variant="body2" sx={{ color: 'var(--color-primary)', fontSize: '0.8rem' }}>
              📞 {entry.contact}
            </Typography>
          ) : (
            <Tooltip title="비밀번호로 열람">
              <Button
                size="small"
                startIcon={<LockIcon sx={{ fontSize: '0.9rem' }} />}
                onClick={() => setDialogOpen(true)}
                sx={{
                  color: 'var(--color-text-muted)',
                  fontSize: '0.75rem',
                  p: 0,
                  minWidth: 0,
                  textTransform: 'none',
                  '&:hover': { color: 'var(--color-primary)', bgcolor: 'transparent' },
                }}
              >
                비공개 연락처
              </Button>
            </Tooltip>
          )}
          {unlocked && !entry.contact_public && (
            <LockOpenIcon sx={{ fontSize: '0.9rem', color: 'var(--color-primary)' }} />
          )}
        </Box>
      )}

      <UnlockDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onUnlock={() => setUnlocked(true)}
      />
    </Box>
  )
}

// ────────────────────────────────────────────
// 메인 Contact 페이지
// ────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({
    name: '',
    message: '',
    affiliation: '',
    contact: '',
    contact_public: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error'
  const [guestbook, setGuestbook] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchGuestbook() }, [])

  async function fetchGuestbook() {
    setLoading(true)
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setGuestbook(data)
    setLoading(false)
  }

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.message.trim()) return

    setSubmitting(true)
    setSubmitStatus(null)

    const payload = {
      name: form.name.trim() || null,
      message: form.message.trim(),
      affiliation: form.affiliation.trim() || null,
      contact: form.contact.trim() || null,
      contact_public: form.contact.trim() ? form.contact_public : false,
    }

    const { error } = await supabase.from('guestbook').insert([payload])

    if (error) {
      setSubmitStatus('error')
    } else {
      setSubmitStatus('success')
      setForm({ name: '', message: '', affiliation: '', contact: '', contact_public: false })
      fetchGuestbook()
    }
    setSubmitting(false)
  }

  return (
    <Box sx={{ bgcolor: 'var(--color-bg-primary)', minHeight: '80vh', py: 8 }}>
      <Container maxWidth="md">

        {/* 페이지 타이틀 */}
        <Typography variant="h1" sx={{ color: 'var(--color-text-primary)', mb: 1, fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Contact
        </Typography>
        <Divider sx={{ borderColor: 'var(--color-accent)', mb: 2, width: '60px', borderWidth: 2 }} />
        <Typography variant="body1" sx={{ color: 'var(--color-text-muted)', mb: 6 }}>
          궁금한 점이나 협업 제안이 있다면 언제든지 연락주세요.
        </Typography>

        {/* ── 내 연락처 ── */}
        <Box sx={{
          bgcolor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-primary-dark)',
          borderRadius: 2,
          p: 4,
          mb: 3,
        }}>
          <Typography variant="h3" sx={{ color: 'var(--color-primary)', mb: 3 }}>연락처</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            {MY_CONTACTS.map((item) => (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  color: 'var(--color-primary)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', width: 40, height: 40,
                  bgcolor: 'var(--color-primary-dark)', borderRadius: '50%', flexShrink: 0,
                }}>
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                    {item.label}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--color-text-primary)' }}>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* SNS 아이콘 */}
          <Divider sx={{ borderColor: 'var(--color-primary-dark)', mb: 2 }} />
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {MY_SNS.map((sns) => (
              <Tooltip key={sns.label} title={sns.label}>
                <IconButton
                  component="a"
                  href={sns.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'var(--color-text-muted)',
                    bgcolor: 'var(--color-primary-dark)',
                    '&:hover': { color: 'var(--color-text-primary)', bgcolor: 'var(--color-primary-dark)' },
                  }}
                >
                  {sns.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>

        {/* ── 방명록 ── */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h2" sx={{ color: 'var(--color-text-primary)', mb: 1 }}>방명록</Typography>
          <Divider sx={{ borderColor: 'var(--color-accent)', mb: 4, width: '60px', borderWidth: 2 }} />

          {/* 작성 폼 */}
          <Box component="form" onSubmit={handleSubmit} sx={{
            bgcolor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-primary-dark)',
            borderRadius: 2,
            p: 4, mb: 4,
          }}>
            <Typography variant="h3" sx={{ color: 'var(--color-primary)', mb: 3 }}>메시지 남기기</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              <TextField
                label="이름 (비우면 익명으로 표시)"
                value={form.name}
                onChange={handleChange('name')}
                fullWidth size="small" sx={FIELD_SX}
              />

              <TextField
                label="방명록 내용 *"
                value={form.message}
                onChange={handleChange('message')}
                required fullWidth multiline rows={3} sx={FIELD_SX}
              />

              <TextField
                label="소속 / 직업 (선택)"
                value={form.affiliation}
                onChange={handleChange('affiliation')}
                fullWidth size="small" sx={FIELD_SX}
              />

              <Box>
                <TextField
                  label="연락처 (선택)"
                  value={form.contact}
                  onChange={handleChange('contact')}
                  fullWidth size="small" sx={FIELD_SX}
                />
                {form.contact.trim() && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={form.contact_public}
                        onChange={(e) => setForm((prev) => ({ ...prev, contact_public: e.target.checked }))}
                        size="small"
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': { color: 'var(--color-primary)' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: 'var(--color-primary)' },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                        {form.contact_public ? '공개 (누구나 볼 수 있음)' : '비공개 (비밀번호로만 열람 가능)'}
                      </Typography>
                    }
                    sx={{ mt: 1, ml: 0 }}
                  />
                )}
              </Box>

              {submitStatus === 'success' && (
                <Alert severity="success" sx={{ bgcolor: 'var(--color-primary-dark)', color: 'var(--color-text-primary)' }}>
                  방명록이 등록되었습니다!
                </Alert>
              )}
              {submitStatus === 'error' && (
                <Alert severity="error">오류가 발생했습니다. 다시 시도해주세요.</Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{
                  alignSelf: 'flex-end', px: 4,
                  bgcolor: 'var(--color-accent)', color: 'var(--color-text-primary)',
                  '&:hover': { bgcolor: 'var(--color-primary)' },
                  '&:disabled': { opacity: 0.6 },
                }}
              >
                {submitting ? <CircularProgress size={20} color="inherit" /> : '등록'}
              </Button>
            </Box>
          </Box>

          {/* 방명록 목록 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress sx={{ color: 'var(--color-primary)' }} />
              </Box>
            ) : guestbook.length === 0 ? (
              <Box sx={{
                bgcolor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-primary-dark)',
                borderRadius: 2, p: 4, textAlign: 'center',
              }}>
                <Typography variant="body1" sx={{ color: 'var(--color-text-muted)' }}>
                  아직 방명록이 없습니다. 첫 번째 메시지를 남겨보세요!
                </Typography>
              </Box>
            ) : (
              guestbook.map((entry) => (
                <GuestbookCard key={entry.id} entry={entry} />
              ))
            )}
          </Box>
        </Box>

      </Container>
    </Box>
  )
}

export default Contact
