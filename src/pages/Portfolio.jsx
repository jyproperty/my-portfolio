import { projects } from '../data/projects'

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

function Portfolio() {
  return (
    <div className="min-h-[80vh] bg-base-100 py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl font-bold mb-1">Portfolio</h1>
        <div className="divider divider-primary w-16 mt-0 mb-2"></div>
        <p className="text-base-content/50 mb-12">직접 만든 프로젝트들을 소개합니다.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
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
      </div>
    </div>
  )
}

export default Portfolio
