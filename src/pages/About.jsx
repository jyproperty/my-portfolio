import { useState } from 'react'
import { ChevronDown, User } from 'lucide-react'

const skills = ['React', 'JavaScript', 'DaisyUI', 'TypeScript', 'Git', 'Vite', 'CSS', 'HTML']

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
    const file = e.target.files[0]
    if (file) console.log('업로드된 파일:', file.name)
  }

  return (
    <div className="min-h-[80vh] bg-base-100 py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold mb-1">About Me</h1>
        <div className="divider divider-primary w-16 mt-0 mb-12"></div>

        {/* 기본 정보 카드 */}
        <div className="card bg-base-200 shadow mb-6">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">기본 정보</h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* 프로필 사진 */}
              <label className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0">
                <div className="avatar">
                  <div className="w-24 h-24 rounded-full bg-base-300 border-2 border-dashed border-primary flex items-center justify-center overflow-hidden">
                    {basicInfo.photo ? (
                      <img src={basicInfo.photo} alt="프로필" className="object-cover w-full h-full" />
                    ) : (
                      <User size={40} className="text-primary" />
                    )}
                  </div>
                </div>
                <span className="text-xs text-base-content/40">사진 업로드</span>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>

              {/* 텍스트 정보 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                {[
                  { label: '이름', value: basicInfo.name },
                  { label: '학력', value: basicInfo.education },
                  { label: '전공', value: basicInfo.major },
                  { label: '경력', value: basicInfo.experience },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-2">
                    <span className="text-primary font-semibold text-sm min-w-[40px]">{label}</span>
                    <span className="text-base-content/70 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 소개 섹션 (아코디언) */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-3">소개</h2>
          <div className="flex flex-col gap-2">
            {sections.map((section) => (
              <div key={section.id} className="collapse collapse-arrow bg-base-200 border border-base-300">
                <input type="checkbox" />
                <div className="collapse-title font-medium flex items-center gap-2">
                  {section.title}
                  {section.showInHome && (
                    <span className="badge badge-outline badge-primary badge-xs">홈 노출</span>
                  )}
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70 leading-relaxed pt-1">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="card bg-base-200 shadow mb-6">
          <div className="card-body">
            <h2 className="card-title text-primary mb-2">기술 스택</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="badge badge-outline badge-primary">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 경력 / 학력 */}
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">경력 / 학력</h2>
            <ul className="timeline timeline-vertical">
              {[
                { period: '2024 - 현재', title: '프론트엔드 개발 학습', desc: 'React, DaisyUI 기반 프로젝트 개발' },
                { period: '2023', title: '웹 개발 입문', desc: 'HTML, CSS, JavaScript 기초 학습' },
              ].map((item, i) => (
                <li key={i}>
                  {i > 0 && <hr className="bg-primary/30" />}
                  <div className="timeline-start text-xs text-primary font-semibold">{item.period}</div>
                  <div className="timeline-middle">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                  <div className="timeline-end timeline-box bg-base-100 border-base-300">
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-base-content/50 mt-0.5">{item.desc}</p>
                  </div>
                  {i < 1 && <hr className="bg-primary/30" />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
