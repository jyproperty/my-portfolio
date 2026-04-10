import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import MagicBento from '../components/MagicBento'

const bentoCards = [
  { label: 'UI / UX', title: 'Frontend', description: 'React, DaisyUI를 활용한 반응형 인터페이스 개발', color: '#100e00' },
  { label: 'Style', title: 'Design System', description: '일관된 컴포넌트 기반 디자인 시스템 구성', color: '#100e00' },
  { label: 'Deploy', title: 'CI / CD', description: 'GitHub Actions로 자동 빌드·배포 파이프라인 운영', color: '#100e00' },
  { label: 'Backend', title: 'Supabase', description: '실시간 DB, 인증, Storage 등 BaaS 연동', color: '#100e00' },
  { label: 'Version', title: 'Git', description: '체계적인 브랜치 전략과 커밋 컨벤션으로 협업', color: '#100e00' },
  { label: 'Growth', title: 'Learning', description: '새로운 기술을 빠르게 습득하고 적용하는 개발자', color: '#100e00' },
]

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const statusBadge = {
  '완료': 'badge-success',
  '진행중': 'badge-warning',
  '준비중': 'badge-ghost',
}

function Home() {
  const featuredProjects = projects.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="hero min-h-[80vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <p className="text-primary font-semibold tracking-[0.3em] uppercase text-sm mb-4">
              안녕하세요, 저는
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              개발자 포트폴리오
            </h1>
            <p className="text-base-content/60 text-lg md:text-xl mb-8">
              React와 DaisyUI로 만드는 포트폴리오 사이트입니다.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/portfolio" className="btn btn-primary btn-lg">작품 보기</Link>
              <Link to="/contact" className="btn btn-outline btn-lg">연락하기</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 무엇을 하나요 - MagicBento */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">무엇을 하나요?</h2>
          <MagicBento
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="212, 160, 23"
            disableAnimations={false}
            cards={bentoCards}
          />
        </div>
      </section>

      {/* 프로젝트 */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold mb-1">Projects</h2>
          <div className="divider divider-primary w-16 mt-0 mb-2"></div>
          <p className="text-base-content/50 mb-10">최근에 만든 프로젝트들입니다.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {featuredProjects.map((project) => (
              <div key={project.id} className="card bg-base-200 shadow hover:shadow-lg transition-shadow">
                <div className="card-body flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title text-base">{project.title}</h3>
                    <span className={`badge ${statusBadge[project.status]} badge-sm`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-base-content/60 text-sm leading-relaxed flex-1">{project.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="badge badge-outline badge-xs">{tag}</span>
                    ))}
                  </div>
                  <div className="card-actions justify-end mt-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-xs gap-1">
                      <GithubIcon /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/portfolio" className="btn btn-outline btn-wide">전체 프로젝트 보기</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
