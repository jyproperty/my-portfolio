import { useState, useEffect } from 'react'
import { Phone, Mail, Lock, LockOpen } from 'lucide-react'

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
import { supabase } from '../supabase'

const MY_CONTACTS = [
  { icon: <Phone size={18} />, label: '전화번호', value: '010-0000-0000' },
  { icon: <Mail size={18} />, label: '이메일', value: 'your.email@example.com' },
]

const MY_SNS = [
  { icon: <InstagramIcon />, label: 'Instagram', url: 'https://instagram.com/' },
  { icon: <LinkedinIcon />, label: 'LinkedIn', url: 'https://linkedin.com/in/' },
  { icon: <GithubIcon />, label: 'GitHub', url: 'https://github.com/jyproperty' },
]

// ── 비공개 연락처 잠금 해제 모달 ──
function UnlockModal({ id, onUnlock }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  function handleConfirm() {
    if (pw === '1234') {
      onUnlock()
      setPw('')
      setError(false)
      document.getElementById(id).close()
    } else {
      setError(true)
    }
  }

  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-base-200">
        <h3 className="font-bold text-lg mb-2">비공개 연락처 열람</h3>
        <p className="text-base-content/50 text-sm mb-4">비밀번호를 입력하면 연락처를 확인할 수 있습니다.</p>
        <input
          type="password"
          placeholder="비밀번호"
          className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false) }}
          onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
        />
        {error && <p className="text-error text-xs mt-1">비밀번호가 올바르지 않습니다.</p>}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost btn-sm">취소</button>
          </form>
          <button className="btn btn-primary btn-sm" onClick={handleConfirm}>확인</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop"><button>close</button></form>
    </dialog>
  )
}

// ── 방명록 카드 ──
function GuestbookCard({ entry }) {
  const [unlocked, setUnlocked] = useState(false)
  const modalId = `unlock-modal-${entry.id}`

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <div className="card bg-base-200 shadow hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">{entry.name?.trim() || '익명'}</span>
          <span className="text-xs text-base-content/40">{formatDate(entry.created_at)}</span>
        </div>
        <p className="text-base-content/70 text-sm leading-relaxed">{entry.message}</p>
        {entry.affiliation && (
          <p className="text-xs text-base-content/40 mt-1">🏢 {entry.affiliation}</p>
        )}
        {entry.contact && (
          <div className="mt-1">
            {entry.contact_public || unlocked ? (
              <p className="text-primary text-sm flex items-center gap-1">
                📞 {entry.contact}
                {unlocked && !entry.contact_public && <LockOpen size={12} />}
              </p>
            ) : (
              <>
                <button
                  className="btn btn-ghost btn-xs gap-1 text-base-content/40 p-0 h-auto min-h-0"
                  onClick={() => document.getElementById(modalId).showModal()}
                >
                  <Lock size={12} /> 비공개 연락처
                </button>
                <UnlockModal id={modalId} onUnlock={() => setUnlocked(true)} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── 메인 Contact 페이지 ──
function Contact() {
  const [form, setForm] = useState({
    name: '', message: '', affiliation: '', contact: '', contact_public: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
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
    <div className="min-h-[80vh] bg-base-100 py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold mb-1">Contact</h1>
        <div className="divider divider-primary w-16 mt-0 mb-2"></div>
        <p className="text-base-content/50 mb-10">궁금한 점이나 협업 제안이 있다면 언제든지 연락주세요.</p>

        {/* 연락처 카드 */}
        <div className="card bg-base-200 shadow mb-6">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">연락처</h2>
            <div className="flex flex-col gap-4 mb-4">
              {MY_CONTACTS.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="btn btn-circle btn-sm btn-primary btn-outline">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-base-content/40">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="divider my-1"></div>
            <div className="flex gap-2">
              {MY_SNS.map((sns) => (
                <a
                  key={sns.label}
                  href={sns.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost"
                  title={sns.label}
                >
                  {sns.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 방명록 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-1">방명록</h2>
          <div className="divider divider-primary w-16 mt-0 mb-8"></div>

          {/* 작성 폼 */}
          <form onSubmit={handleSubmit} className="card bg-base-200 shadow mb-6">
            <div className="card-body">
              <h3 className="card-title text-primary mb-4">메시지 남기기</h3>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="이름 (비우면 익명으로 표시)"
                  className="input input-bordered w-full"
                  value={form.name}
                  onChange={handleChange('name')}
                />
                <textarea
                  placeholder="방명록 내용 *"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  required
                  value={form.message}
                  onChange={handleChange('message')}
                />
                <input
                  type="text"
                  placeholder="소속 / 직업 (선택)"
                  className="input input-bordered w-full"
                  value={form.affiliation}
                  onChange={handleChange('affiliation')}
                />
                <input
                  type="text"
                  placeholder="연락처 (선택)"
                  className="input input-bordered w-full"
                  value={form.contact}
                  onChange={handleChange('contact')}
                />
                {form.contact.trim() && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary toggle-sm"
                      checked={form.contact_public}
                      onChange={(e) => setForm((prev) => ({ ...prev, contact_public: e.target.checked }))}
                    />
                    <span className="text-sm text-base-content/60">
                      {form.contact_public ? '공개 (누구나 볼 수 있음)' : '비공개 (비밀번호로만 열람 가능)'}
                    </span>
                  </label>
                )}

                {submitStatus === 'success' && (
                  <div role="alert" className="alert alert-success alert-soft">
                    방명록이 등록되었습니다!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div role="alert" className="alert alert-error alert-soft">
                    오류가 발생했습니다. 다시 시도해주세요.
                  </div>
                )}

                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? <span className="loading loading-spinner loading-sm"></span> : '등록'}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* 방명록 목록 */}
          <div className="flex flex-col gap-3">
            {loading ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : guestbook.length === 0 ? (
              <div className="card bg-base-200 shadow text-center">
                <div className="card-body">
                  <p className="text-base-content/40">아직 방명록이 없습니다. 첫 번째 메시지를 남겨보세요!</p>
                </div>
              </div>
            ) : (
              guestbook.map((entry) => (
                <GuestbookCard key={entry.id} entry={entry} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
