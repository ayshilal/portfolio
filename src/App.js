import { useState, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Secret URL: add ?notes to access blog
    if (window.location.search.includes('notes')) {
      return 'blog';
    }
    return 'home';
  });

  if (currentPage === 'blog') {
    return <Blog onNavigate={setCurrentPage} />;
  }

  return <Home onNavigate={setCurrentPage} />;
}

function Home({ onNavigate }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setIsLoaded(true);

    // Secret key: type "notes" to access blog
    let keys = '';
    const handleKeyPress = (e) => {
      keys += e.key.toLowerCase();
      if (keys.includes('notes')) {
        onNavigate('blog');
        keys = '';
      }
      // Reset after 2 seconds of no typing
      setTimeout(() => { keys = ''; }, 2000);
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [onNavigate]);

  // Animation styles
  const animationStyles = `
    @keyframes fadeInOut {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    .nav-link {
      position: relative;
      transition: all 0.3s ease;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: #E07850;
      transition: width 0.3s ease;
    }

    .nav-link:hover::after {
      width: 100%;
    }

    .nav-link:hover {
      opacity: 1 !important;
      color: #1A3A3A !important;
    }

    .tech-pill {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .tech-pill:hover {
      transform: translateY(-2px);
      background: rgba(26, 58, 58, 0.15) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .experience-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .experience-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
    }

    .skill-btn {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .skill-btn:hover {
      transform: translateY(-2px);
    }

    .skill-tag {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      animation: scaleIn 0.4s ease-out both;
    }

    .skill-tag:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .cert-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .cert-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(107, 143, 173, 0.2);
    }

    .cta-btn {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(224, 120, 80, 0.4);
    }

    .cta-btn:active {
      transform: translateY(0);
    }

    .contact-link {
      transition: all 0.3s ease;
      position: relative;
    }

    .contact-link:hover {
      opacity: 1 !important;
      color: #E07850 !important;
    }

    .featured-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .featured-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(224, 120, 80, 0.15);
    }

    .section-title {
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 2px;
      background: linear-gradient(90deg, #E07850, #5B8A72);
      border-radius: 2px;
    }

    .edu-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .edu-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(147, 112, 165, 0.2);
    }

    .footer-dot {
      transition: all 0.3s ease;
    }

    .footer-dot:hover {
      transform: scale(1.5);
    }
  `;

  const experience = [
    {
      company: 'TD Bank',
      role: 'IT Developer III / Solutions Developer',
      period: 'Sep 2021 — Jul 2025',
      duration: '10 mos Contract / 1 yr 11 mos FTE',
      color: 'green',
      highlights: [
        'Worked as Senior .NET developer for Hedge Accounting team, managing 20+ .NET, C#, and SQL-based applications including complex amortization and financial calculation engines',
        'Collaborated with Finance and Front Office teams to analyze and resolve daily issues reported in financial reports',
        'Ran static code analysis for .NET applications using Veracode SAST scans and remediated 800+ security vulnerabilities to meet company security standards',
        'Executed Disaster Recovery (DR) test for production environment to validate failover readiness and ensure uptime for critical financial systems',
        'Managed relational database server migration, ensuring smooth data migration and system stability during transition',
      ],
      tech: ['C#', '.NET', 'SQL Server', 'SSIS', 'SonarQube', 'NUnit', 'Moq', 'Veracode'],
    },
    {
      company: 'Verisoft Group',
      role: 'Senior Software Developer',
      period: 'Mar 2018 — Jun 2019',
      duration: '',
      color: 'orange',
      highlights: [
        'Designed and implemented backend with .NET Core 2.2 and developed frontend using Angular 6 and TypeScript for KAD-SIS digital gold management platform for the Ministry of Finance',
        'Mentored junior team members, providing training on .NET Core 2 fundamentals and code-based migration in Entity Framework (Async programming, OAuth2)',
        'Utilized Angular libraries including Angular Material, NG Bootstrap, and NGX-Charts to enhance frontend framework and deliver seamless user experience',
        'Implemented DevOps practices to streamline software delivery processes, enabling CI/CD pipelines for automated publishing',
        'Leveraged debugging tools in PostgreSQL to build and troubleshoot complex custom functions and trigger functions',
      ],
      tech: ['.NET Core 2.2', 'C#', 'Angular 6', 'TypeScript', 'OAuth2', 'PostgreSQL', 'DevOps', 'CI/CD'],
    },
    {
      company: 'Mlpcare',
      role: 'Software Developer',
      period: 'Apr 2013 — Mar 2018',
      duration: '',
      color: 'blue',
      highlights: [
        'Developed and maintained web, desktop and mobile applications for physicians and nurses, used by 19K health practitioners in 20+ hospitals',
        'Utilized .NET 4.x MVC, Entity Framework, MongoDB, Elasticsearch and frontend stack including Angular 4, jQuery, HTML5/CSS3',
        'Wrote unit/integration test cases and automated test cases using Selenium, XUnit and NUnit ensuring reliability and quality of developed software',
        'Implemented cross-platform mobile application Web APIs and REST-based services using Xamarin.Forms, .NET Entity Framework, and TFS version controlling',
      ],
      tech: ['.NET 4.x', 'MVC', 'Entity Framework', 'Angular 4', 'MongoDB', 'Elasticsearch', 'Xamarin'],
    },
  ];

  const education = [
    { degree: 'M.S. in Electrical and Electronics Engineering', school: 'Istanbul University', note: 'Courses Completed, No Thesis (Incomplete)' },
    { degree: 'B.S. in Computer Engineering', school: 'Fatih University', note: '' },
  ];

  const certifications = [
    { name: 'ASP.NET MVC5 Development', issuer: 'Microsoft' },
    { name: 'Angular 4', issuer: 'Microsoft' },
    { name: 'Angular and TypeScript', issuer: 'TestDome' },
    { name: 'Advanced SQL and Tuning', issuer: 'Microsoft' },
    { name: 'iOS Devices and Development Workshop', issuer: 'Apple' },
  ];

  const skills = {
    backend: ['C#', '.NET / .NET Core', 'ASP.NET MVC', 'Web API', 'Entity Framework', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Azure', 'AWS Lambda'],
    frontend: ['Angular (4-7+)', 'TypeScript', 'HTML5', 'CSS3', 'Angular Material', 'jQuery'],
    tools: ['CI/CD', 'DevOps', 'Veracode', 'SonarQube', 'NUnit', 'XUnit', 'Selenium', 'Git', 'TFS'],
  };

  const colors = {
    green: { bg: 'rgba(91, 138, 114, 0.1)', border: '#5B8A72', tag: 'rgba(91, 138, 114, 0.25)', text: '#5B8A72' },
    orange: { bg: 'rgba(224, 120, 80, 0.1)', border: '#E07850', tag: 'rgba(224, 120, 80, 0.25)', text: '#E07850' },
    blue: { bg: 'rgba(107, 143, 173, 0.1)', border: '#6B8FAD', tag: 'rgba(107, 143, 173, 0.25)', text: '#6B8FAD' },
    purple: { bg: 'rgba(147, 112, 165, 0.1)', border: '#9370A5', tag: 'rgba(147, 112, 165, 0.25)', text: '#9370A5' },
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FDF6F0',
      color: '#1A3A3A',
      fontFamily: '"Inter", sans-serif',
    }}>
      <style>{animationStyles}</style>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px clamp(16px, 4vw, 32px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(253, 246, 240, 0.95)',
        backdropFilter: 'blur(10px)',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
        gap: '24px',
      }}>
        <button
          onClick={() => onNavigate('home')}
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: 300,
            letterSpacing: 'clamp(2px, 0.5vw, 4px)',
            color: '#1A3A3A',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            whiteSpace: 'nowrap',
          }}
        >
          AYSE
        </button>
        <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {['About', 'Experience', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
              style={{
                color: '#2D5A5A',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 400,
                opacity: 0.8,
              }}
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => onNavigate('blog')}
            style={{
              display: 'none',
              color: '#2D5A5A',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 400,
              opacity: 0.8,
              padding: 0,
            }}
          >
            Blog
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="about" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 32px 80px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <div style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease',
        }}>
          <p style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#2D5A5A',
            marginBottom: '16px',
            opacity: 0.7,
          }}>
            Full Stack Engineer
          </p>

          <div style={{ display: 'inline-block' }}>
            <h1 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 300,
              letterSpacing: '2px',
              marginBottom: '16px',
              color: '#1A3A3A',
            }}>
              Hello, I'm Ayse
            </h1>

            {/* Animated Dots */}
            <div style={{
              display: 'flex',
              marginBottom: '24px',
              width: '100%',
              justifyContent: 'space-between',
            }}>
              {[...Array(13)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: 'clamp(4px, 0.8vw, 5px)',
                    height: 'clamp(4px, 0.8vw, 5px)',
                    borderRadius: '50%',
                    background: i % 3 === 0 ? '#E07850' : i % 3 === 1 ? '#5B8A72' : '#6B8FAD',
                    animation: `fadeInOut 5s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>

          <p style={{
            fontSize: '16px',
            fontWeight: 300,
            color: '#2D5A5A',
            marginBottom: '40px',
            maxWidth: '600px',
            lineHeight: 1.8,
          }}>
            8+ years of experience designing, building, and maintaining scalable web applications. 
            Strong expertise in back-end development using C#, .NET, .NET Core, and cloud-native 
            services on Azure, with hands-on experience in PostgreSQL, MongoDB, and serverless 
            architectures.
          </p>

          {/* Tech Pills */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}>
            {['.NET', 'Azure', 'Angular', 'C#', 'SQL Server'].map((tech, i) => (
              <span
                key={tech}
                className="tech-pill"
                style={{
                  padding: '10px 20px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  background: 'rgba(26, 58, 58, 0.08)',
                  color: '#1A3A3A',
                  cursor: 'default',
                  animation: `scaleIn 0.4s ease-out ${i * 0.1}s both`,
                }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Contact links */}
          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            fontSize: '14px',
          }}>
            <a href="mailto:aysehilalyalciner@gmail.com" className="contact-link" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.8 }}>
              aysehilalyalciner@gmail.com
            </a>
            <a href="tel:+19296780598" className="contact-link" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.8 }}>
              (929) 678-0598
            </a>
            <a href="https://linkedin.com/in/ahyalciner" className="contact-link" target="_blank" rel="noopener noreferrer" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.8 }}>
              LinkedIn
            </a>
            <a href="https://github.com/ayshilal" className="contact-link" target="_blank" rel="noopener noreferrer" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.8 }}>
              GitHub
            </a>
          </div>

          {/* Featured Project Card */}
          <div
            className="featured-card"
            style={{
              marginTop: '48px',
              padding: '24px',
              borderRadius: '20px',
              background: colors.orange.bg,
              borderLeft: `3px solid ${colors.orange.border}`,
              maxWidth: '400px',
            }}>
            <p style={{
              fontSize: '11px',
              color: '#2D5A5A',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: 0.7,
            }}>
              Featured Project
            </p>
            <a 
              href="https://github.com/ayshilal/AllForKids"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '22px',
                fontWeight: 400,
                color: '#1A3A3A',
                textDecoration: 'none',
              }}
            >
              AllForKids →
            </a>
            <p style={{
              fontSize: '13px',
              color: '#2D5A5A',
              marginTop: '8px',
              opacity: 0.7,
            }}>
              Open source project on GitHub
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{
        padding: '80px 32px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '32px',
          fontWeight: 300,
          letterSpacing: '4px',
          marginBottom: '16px',
          textAlign: 'center',
          color: '#1A3A3A',
        }}>
          EXPERIENCE
        </h2>
        <p style={{
          fontSize: '12px',
          color: '#2D5A5A',
          opacity: 0.6,
          textAlign: 'center',
          marginBottom: '48px',
          letterSpacing: '1px',
        }}>
          my professional journey
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {experience.map((job, i) => (
            <div
              key={i}
              className="experience-card"
              style={{
                padding: '24px',
                borderRadius: '20px',
                background: colors[job.color].bg,
                borderLeft: `3px solid ${colors[job.color].border}`,
                animation: `fadeInUp 0.6s ease-out ${i * 0.15}s both`,
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '8px',
              }}>
                <div>
                  <h3 style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#1A3A3A',
                    marginBottom: '4px',
                  }}>
                    {job.company}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#2D5A5A',
                    opacity: 0.8,
                  }}>
                    {job.role}
                  </p>
                </div>
                <span style={{
                  fontSize: '12px',
                  color: '#2D5A5A',
                  opacity: 0.6,
                }}>
                  {job.period}{job.duration && ` · ${job.duration}`}
                </span>
              </div>

              <ul style={{
                listStyle: 'none',
                marginBottom: '16px',
              }}>
                {job.highlights.map((item, j) => (
                  <li key={j} style={{
                    position: 'relative',
                    paddingLeft: '16px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#1A3A3A',
                    lineHeight: 1.7,
                    opacity: 0.85,
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '8px',
                      width: '4px',
                      height: '4px',
                      background: colors[job.color].border,
                      borderRadius: '50%',
                    }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {job.tech.map((tech, j) => (
                  <span key={j} style={{
                    fontSize: '11px',
                    padding: '4px 10px',
                    borderRadius: '50px',
                    background: colors[job.color].tag,
                    color: colors[job.color].text,
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section style={{
        padding: '80px 32px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '32px',
          fontWeight: 300,
          letterSpacing: '4px',
          marginBottom: '16px',
          textAlign: 'center',
          color: '#1A3A3A',
        }}>
          EDUCATION
        </h2>
        <p style={{
          fontSize: '12px',
          color: '#2D5A5A',
          opacity: 0.6,
          textAlign: 'center',
          marginBottom: '48px',
          letterSpacing: '1px',
        }}>
          academic background
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {education.map((edu, i) => (
            <div key={i} className="edu-card" style={{
              padding: '24px',
              borderRadius: '20px',
              background: colors.purple.bg,
              borderLeft: `3px solid ${colors.purple.border}`,
              textAlign: 'center',
              animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
            }}>
              <h3 style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '20px',
                fontWeight: 400,
                color: '#1A3A3A',
                marginBottom: '4px',
              }}>
                {edu.degree}
              </h3>
              <p style={{ fontSize: '14px', color: '#2D5A5A', opacity: 0.8 }}>
                {edu.school}
              </p>
              {edu.note && (
                <p style={{ fontSize: '12px', color: '#2D5A5A', opacity: 0.5, marginTop: '4px' }}>
                  {edu.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{
        padding: '80px 32px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '32px',
          fontWeight: 300,
          letterSpacing: '4px',
          marginBottom: '16px',
          textAlign: 'center',
          color: '#1A3A3A',
        }}>
          SKILLS
        </h2>
        <p style={{
          fontSize: '12px',
          color: '#2D5A5A',
          opacity: 0.6,
          textAlign: 'center',
          marginBottom: '48px',
          letterSpacing: '1px',
        }}>
          technologies & tools
        </p>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {['All', 'Backend', 'Frontend', 'Tools'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="skill-btn"
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                background: activeCategory === cat ? '#1A3A3A' : 'rgba(26, 58, 58, 0.08)',
                color: activeCategory === cat ? 'white' : '#1A3A3A',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(26, 58, 58, 0.2)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {(activeCategory === 'All'
            ? [...skills.backend, ...skills.frontend, ...skills.tools]
            : skills[activeCategory.toLowerCase()]
          ).map((skill, i) => (
            <span
              key={skill}
              className="skill-tag"
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                fontSize: '13px',
                background: 'rgba(26, 58, 58, 0.08)',
                color: '#1A3A3A',
                cursor: 'default',
                animationDelay: `${i * 0.03}s`,
              }}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section style={{
        padding: '80px 32px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '32px',
          fontWeight: 300,
          letterSpacing: '4px',
          marginBottom: '16px',
          textAlign: 'center',
          color: '#1A3A3A',
        }}>
          CERTIFICATIONS
        </h2>
        <p style={{
          fontSize: '12px',
          color: '#2D5A5A',
          opacity: 0.6,
          textAlign: 'center',
          marginBottom: '48px',
          letterSpacing: '1px',
        }}>
          professional credentials
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
        }}>
          {certifications.map((cert, i) => (
            <div key={i} className="cert-card" style={{
              padding: '20px',
              borderRadius: '20px',
              background: colors.blue.bg,
              borderLeft: `3px solid ${colors.blue.border}`,
              animation: `scaleIn 0.4s ease-out ${i * 0.08}s both`,
            }}>
              <p style={{
                fontSize: '15px',
                fontWeight: 500,
                color: '#1A3A3A',
                marginBottom: '4px',
              }}>
                {cert.name}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#2D5A5A',
                opacity: 0.7,
              }}>
                {cert.issuer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{
        padding: '80px 32px',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '32px',
          fontWeight: 300,
          letterSpacing: '4px',
          marginBottom: '16px',
          color: '#1A3A3A',
        }}>
          LET'S CONNECT
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#2D5A5A',
          marginBottom: '40px',
          lineHeight: 1.7,
          opacity: 0.8,
        }}>
          I'm currently open to new opportunities and would love to hear about your project.
        </p>

        <a
          href="mailto:aysehilalyalciner@gmail.com"
          className="cta-btn"
          style={{
            display: 'inline-block',
            padding: '18px 40px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #E07850 0%, #D4694A 100%)',
            color: 'white',
            fontSize: '15px',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(224, 120, 80, 0.3)',
          }}
        >
          Get in Touch
        </a>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          marginTop: '40px',
          fontSize: '14px',
        }}>
          <a href="tel:+19296780598" className="contact-link" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.7 }}>
            (929) 678-0598
          </a>
          <a href="https://linkedin.com/in/ahyalciner" className="contact-link" target="_blank" rel="noopener noreferrer" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.7 }}>
            LinkedIn
          </a>
          <a href="https://github.com/ayshilal" className="contact-link" target="_blank" rel="noopener noreferrer" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.7 }}>
            GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 32px',
        textAlign: 'center',
        borderTop: '1px solid rgba(26, 58, 58, 0.1)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}>
          {['#E07850', '#5B8A72', '#6B8FAD', '#9370A5'].map((color, i) => (
            <span
              key={i}
              className="footer-dot"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: color,
                opacity: 0.6,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
        <p style={{
          fontSize: '12px',
          color: '#2D5A5A',
          opacity: 0.5,
        }}>
          © 2025 Ayse Hilal Yalciner
        </p>
      </footer>
    </div>
  );
}



function Blog({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('key-components');
  const [expandedMenus, setExpandedMenus] = useState(['az-204', 'azure-app-service']);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Default menu structure
  const defaultMenuItems = [
    {
      id: 'az-204',
      title: 'AZ-204 Certification',
      icon: '☁️',
      color: 'terracotta',
      children: [
        {
          id: 'azure-app-service',
          title: 'Azure App Service',
          children: [
            { id: 'key-components', title: 'Key Components' },
            { id: 'authentication', title: 'Authentication' },
            { id: 'inbound-outbound', title: 'Network Control' },
            { id: 'deploy', title: 'Deployment' },
          ]
        },
      ]
    },
    {
      id: 'ai-900',
      title: 'AI-900 Fundamentals',
      icon: '🤖',
      color: 'purple',
      children: [
        {
          id: 'ai-concepts',
          title: 'AI Concepts',
          children: [
            { id: 'ai-intro', title: 'Introduction to AI' },
            { id: 'ml-basics', title: 'Machine Learning' },
            { id: 'azure-ai-services', title: 'Azure AI Services' },
          ]
        },
      ]
    },
    {
      id: 'angular',
      title: 'Angular',
      icon: '🅰️',
      color: 'green',
      children: [
        {
          id: 'angular-fundamentals',
          title: 'Fundamentals',
          children: [
            { id: 'angular-components', title: 'Components' },
            { id: 'angular-services', title: 'Services & DI' },
            { id: 'angular-routing', title: 'Routing' },
          ]
        },
      ]
    },
  ];

  // Load menu items from localStorage
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem('blogMenuItems');
      return saved ? JSON.parse(saved) : defaultMenuItems;
    } catch {
      return defaultMenuItems;
    }
  });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev =>
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const handleSectionChange = (sectionId) => {
    if (editMode && hasUnsavedChanges) {
      if (!window.confirm('You have unsaved changes. Discard them?')) {
        return;
      }
      setHasUnsavedChanges(false);
    }
    setIsAnimating(true);
    setTimeout(() => {
      setActiveSection(sectionId);
      setIsAnimating(false);
    }, 150);
  };

  // Default content structure
  const defaultContent = {
    'key-components': {
      title: 'Key Components',
      subtitle: 'Azure App Service',
      color: 'terracotta',
      body: `• Scaling up and out
• Container support
• CI/CD support

When you create an App Service plan, the following is planned:
• Number of VMs
• Size of VMs
• OS
• Pricing Tier

Free/Shared Tiers share the same VM as other plans.
Other tiers have at least one dedicated VM for your app.
Isolated tiers run on dedicated VNET.

If the plan is to run on 5 instances, then all apps will run on all 5 instances. They will scale out together - if needed.

If you want to scale one app out independently or you need resources in different geographical regions then Isolate the app.`
    },
    'authentication': {
      title: 'Authentication',
      subtitle: 'Azure App Service',
      color: 'terracotta',
      body: `Azure App Service provides built-in authentication and authorization support.

• Sign in users with identity providers (Microsoft, Google, Facebook, Twitter)
• Built-in token store
• Session management
• Token refresh

Authentication flow:
1. Sign user in → Redirect to provider
2. Post-authentication → Provider redirects back with token
3. Validate token → App Service validates and stores token
4. Serve authenticated content → Request continues with auth headers`
    },
    'inbound-outbound': {
      title: 'Network Control',
      subtitle: 'Azure App Service',
      color: 'terracotta',
      body: `Inbound Features:
• App-assigned address
• Access restrictions
• Service endpoints
• Private endpoints

Outbound Features:
• Hybrid connections
• Gateway-required VNet integration
• VNet integration

Network behavior depends on the pricing tier:
• Free/Shared: Multi-tenant, outbound IPs shared
• Basic and above: Dedicated outbound IPs
• Isolated: Full network isolation`
    },
    'deploy': {
      title: 'Deployment',
      subtitle: 'Azure App Service',
      color: 'terracotta',
      body: `Deployment methods:

• Azure DevOps
• GitHub Actions
• Bitbucket
• Local Git
• FTP/FTPS
• ZIP deploy
• CLI (az webapp up)

Deployment slots:
• Swap deployments with zero downtime
• Warm up instances before swap
• Auto swap for continuous deployment
• Slot-specific app settings

Best practices:
• Use deployment slots for staging
• Enable auto swap for dev/test
• Use manual swap for production`
    },
    'ai-intro': {
      title: 'Introduction to AI',
      subtitle: 'AI Concepts',
      color: 'purple',
      body: `What is Artificial Intelligence?

• AI is software that imitates human behaviors and capabilities
• Key workloads include:
  - Machine Learning
  - Computer Vision
  - Natural Language Processing
  - Document Intelligence
  - Knowledge Mining
  - Generative AI

Types of AI:
• Narrow AI - designed for specific tasks
• General AI - human-level intelligence (theoretical)

Responsible AI Principles:
• Fairness
• Reliability & Safety
• Privacy & Security
• Inclusiveness
• Transparency
• Accountability`
    },
    'ml-basics': {
      title: 'Machine Learning',
      subtitle: 'AI Concepts',
      color: 'purple',
      body: `What is Machine Learning?

• ML is a subset of AI that enables systems to learn from data
• Models are trained using historical data to make predictions

Types of Machine Learning:

Supervised Learning:
• Classification - predict categories
• Regression - predict numeric values

Unsupervised Learning:
• Clustering - group similar items

Azure Machine Learning:
• Automated ML
• Designer (drag-and-drop)
• Notebooks
• MLflow integration`
    },
    'azure-ai-services': {
      title: 'Azure AI Services',
      subtitle: 'AI Concepts',
      color: 'purple',
      body: `Azure AI Services Overview:

Vision:
• Computer Vision
• Custom Vision
• Face API

Language:
• Language Understanding (LUIS)
• Text Analytics
• Translator
• QnA Maker

Speech:
• Speech-to-Text
• Text-to-Speech
• Speech Translation

Decision:
• Anomaly Detector
• Content Moderator
• Personalizer

Azure OpenAI Service:
• GPT models
• DALL-E
• Embeddings`
    },
    'angular-components': {
      title: 'Components',
      subtitle: 'Angular Fundamentals',
      color: 'green',
      body: `Angular Components

Components are the building blocks of Angular apps.

Structure:
• @Component decorator
• Template (HTML)
• Styles (CSS)
• Class (TypeScript)

Example:
@Component({
  selector: 'app-hello',
  template: '<h1>Hello {{name}}</h1>',
  styles: ['h1 { color: blue; }']
})
  name = 'World';
}

Lifecycle Hooks:
• ngOnInit - after component initialized
• ngOnChanges - when input changes
• ngOnDestroy - before component destroyed
• ngAfterViewInit - after view initialized`
    },
    'angular-services': {
      title: 'Services & DI',
      subtitle: 'Angular Fundamentals',
      color: 'green',
      body: `Angular Services & Dependency Injection

Services:
• Reusable business logic
• Shared data between components
• API calls

Creating a Service:
@Injectable({
  providedIn: 'root'
})
  getData() {
    return ['item1', 'item2'];
  }
}

Dependency Injection:
• Angular's DI system provides instances
• Constructor injection
• Hierarchical injector

Injection Tokens:
• providedIn: 'root' - singleton
• providedIn: 'any' - per module
• Component providers - per component`
    },
    'angular-routing': {
      title: 'Routing',
      subtitle: 'Angular Fundamentals',
      color: 'green',
      body: `Angular Routing

Setup:
• RouterModule.forRoot(routes)
• <router-outlet> in template

Route Configuration:
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '**', component: NotFoundComponent }
];

Navigation:
• routerLink directive
• Router.navigate() method

Route Guards:
• CanActivate - protect route access
• CanDeactivate - confirm leaving
• Resolve - pre-fetch data

Lazy Loading:
loadChildren: () => import('./feature/feature.module')
  .then(m => m.FeatureModule)`
    },
  };

  // Load saved content from localStorage or use default
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('blogContent');
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  // Save content and menu structure to localStorage
  const saveChanges = () => {
    try {
      localStorage.setItem('blogContent', JSON.stringify(content));
      localStorage.setItem('blogMenuItems', JSON.stringify(menuItems));
      setHasUnsavedChanges(false);
      setEditMode(false);
    } catch (e) {
      alert('Failed to save changes');
    }
  };

  // Cancel editing and revert changes
  const cancelEditing = () => {
    if (hasUnsavedChanges) {
      if (!window.confirm('Discard unsaved changes?')) {
        return;
      }
    }
    try {
      const savedContent = localStorage.getItem('blogContent');
      setContent(savedContent ? { ...defaultContent, ...JSON.parse(savedContent) } : defaultContent);
      const savedMenu = localStorage.getItem('blogMenuItems');
      setMenuItems(savedMenu ? JSON.parse(savedMenu) : defaultMenuItems);
    } catch {
      setContent(defaultContent);
      setMenuItems(defaultMenuItems);
    }
    setHasUnsavedChanges(false);
    setEditMode(false);
  };

  // Reset to default content and menu structure
  const resetToDefault = () => {
    if (window.confirm('Reset all content and topics to default? This cannot be undone.')) {
      localStorage.removeItem('blogContent');
      localStorage.removeItem('blogMenuItems');
      setContent(defaultContent);
      setMenuItems(defaultMenuItems);
      setActiveSection('key-components');
      setExpandedMenus(['az-204', 'azure-app-service']);
      setHasUnsavedChanges(false);
    }
  };

  // Update content for a section
  const updateContent = (sectionId, field, value) => {
    setContent(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Generate unique ID
  const generateId = () => `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Add a new subtopic to a main topic
  const addSubtopic = (topicId) => {
    const newId = generateId();
    const newSectionId = generateId();
    setMenuItems(prev => prev.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          children: [...topic.children, {
            id: newId,
            title: 'New Subtopic',
            children: [{ id: newSectionId, title: 'New Section' }]
          }]
        };
      }
      return topic;
    }));
    // Add default content for the new section
    setContent(prev => ({
      ...prev,
      [newSectionId]: {
        title: 'New Section',
        subtitle: 'New Subtopic',
        color: menuItems.find(t => t.id === topicId)?.color || 'green',
        body: 'Add your content here...'
      }
    }));
    setExpandedMenus(prev => [...prev, topicId, newId]);
    setHasUnsavedChanges(true);
  };

  // Add a new section to a subtopic
  const addSection = (topicId, subtopicId) => {
    const newId = generateId();
    const topic = menuItems.find(t => t.id === topicId);
    const subtopic = topic?.children.find(s => s.id === subtopicId);

    setMenuItems(prev => prev.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          children: topic.children.map(sub => {
            if (sub.id === subtopicId) {
              return {
                ...sub,
                children: [...sub.children, { id: newId, title: 'New Section' }]
              };
            }
            return sub;
          })
        };
      }
      return topic;
    }));
    // Add default content for the new section
    setContent(prev => ({
      ...prev,
      [newId]: {
        title: 'New Section',
        subtitle: subtopic?.title || 'Subtopic',
        color: topic?.color || 'green',
        body: 'Add your content here...'
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Delete a section
  const deleteSection = (topicId, subtopicId, sectionId) => {
    if (!window.confirm('Delete this section? This cannot be undone.')) return;

    setMenuItems(prev => prev.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          children: topic.children.map(sub => {
            if (sub.id === subtopicId) {
              return {
                ...sub,
                children: sub.children.filter(sec => sec.id !== sectionId)
              };
            }
            return sub;
          })
        };
      }
      return topic;
    }));
    // Remove content for the deleted section
    setContent(prev => {
      const newContent = { ...prev };
      delete newContent[sectionId];
      return newContent;
    });
    // If we deleted the active section, switch to another
    if (activeSection === sectionId) {
      const allSections = menuItems.flatMap(t => t.children.flatMap(s => s.children));
      const otherSection = allSections.find(s => s.id !== sectionId);
      if (otherSection) setActiveSection(otherSection.id);
    }
    setHasUnsavedChanges(true);
  };

  // Delete a subtopic
  const deleteSubtopic = (topicId, subtopicId) => {
    if (!window.confirm('Delete this subtopic and all its sections? This cannot be undone.')) return;

    const topic = menuItems.find(t => t.id === topicId);
    const subtopic = topic?.children.find(s => s.id === subtopicId);
    const sectionIds = subtopic?.children.map(s => s.id) || [];

    setMenuItems(prev => prev.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          children: topic.children.filter(sub => sub.id !== subtopicId)
        };
      }
      return topic;
    }));
    // Remove content for all sections in the subtopic
    setContent(prev => {
      const newContent = { ...prev };
      sectionIds.forEach(id => delete newContent[id]);
      return newContent;
    });
    // If we deleted the active section, switch to another
    if (sectionIds.includes(activeSection)) {
      const allSections = menuItems.flatMap(t => t.children.flatMap(s => s.children));
      const otherSection = allSections.find(s => !sectionIds.includes(s.id));
      if (otherSection) setActiveSection(otherSection.id);
    }
    setHasUnsavedChanges(true);
  };

  // Rename a subtopic
  const renameSubtopic = (topicId, subtopicId, newTitle) => {
    setMenuItems(prev => prev.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          children: topic.children.map(sub => {
            if (sub.id === subtopicId) {
              return { ...sub, title: newTitle };
            }
            return sub;
          })
        };
      }
      return topic;
    }));
    setHasUnsavedChanges(true);
  };

  // Rename a section in the menu
  const renameSection = (topicId, subtopicId, sectionId, newTitle) => {
    setMenuItems(prev => prev.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          children: topic.children.map(sub => {
            if (sub.id === subtopicId) {
              return {
                ...sub,
                children: sub.children.map(sec => {
                  if (sec.id === sectionId) {
                    return { ...sec, title: newTitle };
                  }
                  return sec;
                })
              };
            }
            return sub;
          })
        };
      }
      return topic;
    }));
    setHasUnsavedChanges(true);
  };

  const colors = {
    terracotta: { bg: 'rgba(176, 113, 113, 0.1)', border: '#B07171', text: '#B07171', light: 'rgba(176, 113, 113, 0.25)', gradient: 'linear-gradient(135deg, #B07171 0%, #A06161 100%)' },
    orange: { bg: 'rgba(224, 120, 80, 0.1)', border: '#E07850', text: '#E07850', light: 'rgba(224, 120, 80, 0.25)', gradient: 'linear-gradient(135deg, #E07850 0%, #D4694A 100%)' },
    green: { bg: 'rgba(91, 138, 114, 0.1)', border: '#5B8A72', text: '#5B8A72', light: 'rgba(91, 138, 114, 0.25)', gradient: 'linear-gradient(135deg, #5B8A72 0%, #4A7A62 100%)' },
    blue: { bg: 'rgba(107, 143, 173, 0.1)', border: '#6B8FAD', text: '#6B8FAD', light: 'rgba(107, 143, 173, 0.25)', gradient: 'linear-gradient(135deg, #6B8FAD 0%, #5A7F9D 100%)' },
    purple: { bg: 'rgba(147, 112, 165, 0.1)', border: '#9370A5', text: '#9370A5', light: 'rgba(147, 112, 165, 0.25)', gradient: 'linear-gradient(135deg, #9370A5 0%, #836095 100%)' },
  };

  // Filter content based on search
  const filteredSections = Object.entries(content).filter(([key, value]) =>
    searchQuery === '' ||
    value.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    value.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current topic color
  const currentColor = content[activeSection]?.color || 'green';

  // Calculate progress for each topic
  const getTopicProgress = (topicId) => {
    const topic = menuItems.find(t => t.id === topicId);
    if (!topic) return 0;
    let total = 0;
    let completed = 0;
    topic.children.forEach(sub => {
      sub.children.forEach(section => {
        total++;
        if (section.id === activeSection) completed++;
      });
    });
    return Math.round((completed / total) * 100);
  };

  const blogStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes glow {
      0%, 100% { box-shadow: 0 0 5px rgba(176, 113, 113, 0.3); }
      50% { box-shadow: 0 0 20px rgba(176, 113, 113, 0.5); }
    }

    @keyframes bounceIn {
      0% { opacity: 0; transform: scale(0.3); }
      50% { transform: scale(1.05); }
      70% { transform: scale(0.9); }
      100% { opacity: 1; transform: scale(1); }
    }

    @keyframes staggerFade {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes ripple {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(4); opacity: 0; }
    }

    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .blog-sidebar::-webkit-scrollbar {
      width: 6px;
    }

    .blog-sidebar::-webkit-scrollbar-track {
      background: transparent;
    }

    .blog-sidebar::-webkit-scrollbar-thumb {
      background: rgba(26, 58, 58, 0.2);
      border-radius: 3px;
    }

    .blog-sidebar::-webkit-scrollbar-thumb:hover {
      background: rgba(26, 58, 58, 0.3);
    }

    .menu-item {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .menu-item:hover {
      transform: translateX(4px);
    }

    .content-card {
      animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .topic-card {
      animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: both;
    }

    .topic-card:nth-child(1) { animation-delay: 0.1s; }
    .topic-card:nth-child(2) { animation-delay: 0.2s; }
    .topic-card:nth-child(3) { animation-delay: 0.3s; }

    .quick-btn {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .quick-btn:hover {
      transform: translateY(-3px) scale(1.02);
    }

    .quick-btn:active {
      transform: translateY(0) scale(0.98);
    }

    .nav-btn {
      position: relative;
      overflow: hidden;
    }

    .nav-btn::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5px;
      height: 5px;
      background: rgba(255, 255, 255, 0.5);
      opacity: 0;
      border-radius: 100%;
      transform: scale(1, 1) translate(-50%);
      transform-origin: 50% 50%;
    }

    .nav-btn:hover::after {
      animation: ripple 0.6s ease-out;
    }

    .floating-icon {
      animation: float 3s ease-in-out infinite;
    }

    .checklist-item {
      animation: staggerFade 0.4s ease-out both;
    }

    .checklist-item:nth-child(1) { animation-delay: 0.1s; }
    .checklist-item:nth-child(2) { animation-delay: 0.2s; }
    .checklist-item:nth-child(3) { animation-delay: 0.3s; }
    .checklist-item:nth-child(4) { animation-delay: 0.4s; }

    .search-input:focus {
      animation: glow 2s ease-in-out infinite;
    }

    .breadcrumb-item {
      animation: slideIn 0.3s ease-out both;
    }

    .breadcrumb-item:nth-child(1) { animation-delay: 0s; }
    .breadcrumb-item:nth-child(2) { animation-delay: 0.05s; }
    .breadcrumb-item:nth-child(3) { animation-delay: 0.1s; }
    .breadcrumb-item:nth-child(4) { animation-delay: 0.15s; }
    .breadcrumb-item:nth-child(5) { animation-delay: 0.2s; }

    .header-gradient {
      background-size: 200% 200%;
      animation: gradient 8s ease infinite;
    }

    .decorative-circle {
      animation: float 4s ease-in-out infinite;
    }

    .decorative-circle:nth-child(2) {
      animation-delay: -2s;
    }

    @media (max-width: 768px) {
      .blog-sidebar {
        position: fixed !important;
        left: 0;
        top: 64px !important;
        height: calc(100vh - 64px) !important;
        z-index: 50;
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 4px 0 20px rgba(0,0,0,0.1);
      }

      .blog-sidebar.open {
        transform: translateX(0);
      }

      .blog-main {
        margin-left: 0 !important;
        padding: 20px !important;
      }
    }
  `;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FDF6F0 0%, #F8F0E8 100%)',
      color: '#1A3A3A',
      fontFamily: '"Nunito", "Inter", sans-serif',
    }}>
      <style>{blogStyles}</style>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '0 clamp(16px, 4vw, 32px)',
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(253, 246, 240, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(26, 58, 58, 0.08)',
        boxShadow: '0 1px 20px rgba(0,0,0,0.03)',
      }}>
        {/* Left side - Menu toggle and logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(26, 58, 58, 0.05)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A3A3A" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
            </svg>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              className="floating-icon"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: colors[currentColor].gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                boxShadow: `0 4px 12px ${colors[currentColor].light}`,
              }}>
              📚
            </div>
            <span style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '20px',
              fontWeight: 500,
              letterSpacing: '1px',
              color: '#1A3A3A',
            }}>
              Study Notes
            </span>
          </div>
        </div>

        {/* Center - Search */}
        <div style={{
          flex: 1,
          maxWidth: '400px',
          margin: '0 24px',
          display: 'flex',
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
          }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A3A3A"
              strokeWidth="2"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.4,
              }}
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              style={{
                width: '100%',
                padding: '10px 16px 10px 40px',
                borderRadius: '12px',
                border: '1px solid rgba(26, 58, 58, 0.1)',
                background: 'rgba(26, 58, 58, 0.03)',
                fontSize: '14px',
                fontFamily: '"Nunito", sans-serif',
                color: '#1A3A3A',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors[currentColor].border;
                e.target.style.background = 'white';
                e.target.style.boxShadow = `0 0 0 3px ${colors[currentColor].light}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(26, 58, 58, 0.1)';
                e.target.style.background = 'rgba(26, 58, 58, 0.03)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Right side - Edit toggle and Back to portfolio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {editMode ? (
            <>
              <button
                onClick={saveChanges}
                style={{
                  background: colors.green.gradient,
                  border: 'none',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                  boxShadow: hasUnsavedChanges ? '0 0 10px rgba(91, 138, 114, 0.5)' : 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17 21 17 13 7 13 7 21" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7 3 7 8 15 8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Save
              </button>
              <button
                onClick={cancelEditing}
                style={{
                  background: 'none',
                  border: '1px solid rgba(26, 58, 58, 0.2)',
                  color: '#1A3A3A',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                Cancel
              </button>
              <button
                onClick={resetToDefault}
                style={{
                  background: 'none',
                  border: '1px solid rgba(176, 113, 113, 0.3)',
                  color: '#B07171',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
                title="Reset to default content"
              >
                Reset
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              style={{
                background: 'none',
                border: '1px solid rgba(26, 58, 58, 0.15)',
                color: '#1A3A3A',
                padding: '8px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(26, 58, 58, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(26, 58, 58, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.borderColor = 'rgba(26, 58, 58, 0.15)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit
            </button>
          )}
          <button
            onClick={() => onNavigate && onNavigate('home')}
            style={{
              background: 'none',
              border: '1px solid rgba(26, 58, 58, 0.15)',
              color: '#1A3A3A',
              padding: '8px 16px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '13px',
              fontFamily: '"Nunito", sans-serif',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(26, 58, 58, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(26, 58, 58, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.borderColor = 'rgba(26, 58, 58, 0.15)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Portfolio
          </button>
        </div>
      </nav>

      {/* Edit Mode Banner */}
      {editMode && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          background: hasUnsavedChanges ? 'linear-gradient(135deg, #E07850 0%, #D4694A 100%)' : 'linear-gradient(135deg, #5B8A72 0%, #4A7A62 100%)',
          color: 'white',
          padding: '8px 20px',
          fontSize: '13px',
          fontWeight: 500,
          textAlign: 'center',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          animation: 'slideUp 0.3s ease-out',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {hasUnsavedChanges ? 'Edit Mode - You have unsaved changes' : 'Edit Mode - Click on title or content to edit'}
        </div>
      )}

      {/* Main Content with Sidebar */}
      <div style={{
        display: 'flex',
        paddingTop: editMode ? '100px' : '64px',
        minHeight: '100vh',
        transition: 'padding-top 0.3s ease',
      }}>
        {/* Sidebar */}
        <aside
          className={`blog-sidebar ${sidebarOpen ? 'open' : ''}`}
          style={{
            width: sidebarOpen ? '280px' : '0',
            minWidth: sidebarOpen ? '280px' : '0',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRight: sidebarOpen ? '1px solid rgba(26, 58, 58, 0.08)' : 'none',
            padding: sidebarOpen ? '24px 0' : '0',
            position: 'sticky',
            top: editMode ? '100px' : '64px',
            height: editMode ? 'calc(100vh - 100px)' : 'calc(100vh - 64px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            transition: 'all 0.3s ease',
          }}
        >
          {sidebarOpen && (
            <>
              {/* Topic Quick Access */}
              <div style={{
                display: 'flex',
                gap: '8px',
                padding: '0 16px',
                marginBottom: '24px',
              }}>
                {menuItems.map((topic) => (
                  <button
                    key={topic.id}
                    className="quick-btn"
                    onClick={() => {
                      const firstSection = topic.children[0]?.children[0]?.id;
                      if (firstSection) {
                        setExpandedMenus([topic.id, topic.children[0].id]);
                        handleSectionChange(firstSection);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '12px 8px',
                      borderRadius: '12px',
                      background: expandedMenus.includes(topic.id) ? colors[topic.color].light : 'rgba(26, 58, 58, 0.04)',
                      border: expandedMenus.includes(topic.id) ? `1px solid ${colors[topic.color].border}` : '1px solid transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                    title={topic.title}
                  >
                    <span style={{ fontSize: '18px' }}>{topic.icon}</span>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      color: expandedMenus.includes(topic.id) ? colors[topic.color].text : '#1A3A3A',
                      opacity: 0.8,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      {topic.id.split('-')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: 'rgba(26, 58, 58, 0.08)',
                margin: '0 16px 16px',
              }} />

              {/* Menu Items */}
              {menuItems.map((topic) => (
                <div key={topic.id} style={{ marginBottom: '8px' }}>
                  {/* Topic Header */}
                  <button
                    onClick={() => toggleMenu(topic.id)}
                    className="menu-item"
                    style={{
                      width: 'calc(100% - 24px)',
                      margin: '0 12px',
                      padding: '14px 16px',
                      background: expandedMenus.includes(topic.id) ? colors[topic.color].gradient : 'transparent',
                      borderRadius: '14px',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: expandedMenus.includes(topic.id) ? '#FDF6F0' : '#1A3A3A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s',
                      boxShadow: expandedMenus.includes(topic.id) ? `0 4px 16px ${colors[topic.color].light}` : 'none',
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{topic.icon}</span>
                    <span style={{ flex: 1 }}>{topic.title}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: expandedMenus.includes(topic.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                        opacity: 0.6,
                      }}
                    >
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Subtopics */}
                  {expandedMenus.includes(topic.id) && (
                    <div style={{
                      marginTop: '8px',
                      animation: 'slideIn 0.2s ease-out',
                    }}>
                      {topic.children.map((subtopic) => (
                        <div key={subtopic.id}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}>
                            <button
                              onClick={() => toggleMenu(subtopic.id)}
                              style={{
                                flex: 1,
                                padding: '10px 16px 10px 44px',
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: '#1A3A3A',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                opacity: 0.8,
                                transition: 'all 0.2s',
                              }}
                            >
                              <span style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: colors[topic.color].border,
                                opacity: 0.5,
                              }} />
                              {editMode ? (
                                <input
                                  type="text"
                                  value={subtopic.title}
                                  onChange={(e) => renameSubtopic(topic.id, subtopic.id, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  style={{
                                    flex: 1,
                                    background: 'rgba(26, 58, 58, 0.05)',
                                    border: '1px dashed rgba(26, 58, 58, 0.2)',
                                    borderRadius: '4px',
                                    padding: '2px 6px',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    color: '#1A3A3A',
                                    outline: 'none',
                                  }}
                                />
                              ) : (
                                <span style={{ flex: 1 }}>{subtopic.title}</span>
                              )}
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={colors[topic.color].text}
                                strokeWidth="2"
                                style={{
                                  transform: expandedMenus.includes(subtopic.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s',
                                }}
                              >
                                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            {editMode && (
                              <button
                                onClick={() => deleteSubtopic(topic.id, subtopic.id)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: '4px',
                                  opacity: 0.5,
                                  transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.5}
                                title="Delete subtopic"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B07171" strokeWidth="2">
                                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            )}
                          </div>

                          {/* Sections */}
                          {expandedMenus.includes(subtopic.id) && (
                            <div style={{
                              marginLeft: '44px',
                              borderLeft: `2px solid ${colors[topic.color].light}`,
                              animation: 'slideIn 0.2s ease-out',
                            }}>
                              {subtopic.children.map((section) => (
                                <div
                                  key={section.id}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                  }}
                                >
                                  <button
                                    onClick={() => handleSectionChange(section.id)}
                                    style={{
                                      flex: 1,
                                      padding: '8px 16px',
                                      background: activeSection === section.id ? colors[topic.color].bg : 'none',
                                      border: 'none',
                                      textAlign: 'left',
                                      cursor: 'pointer',
                                      fontSize: '13px',
                                      color: activeSection === section.id ? colors[topic.color].text : '#1A3A3A',
                                      transition: 'all 0.2s',
                                      fontWeight: activeSection === section.id ? 600 : 400,
                                      borderRadius: '0 8px 8px 0',
                                      marginLeft: '-2px',
                                      borderLeft: activeSection === section.id ? `2px solid ${colors[topic.color].border}` : '2px solid transparent',
                                    }}
                                  >
                                    {section.title}
                                  </button>
                                  {editMode && (
                                    <button
                                      onClick={() => deleteSection(topic.id, subtopic.id, section.id)}
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '4px',
                                        opacity: 0.4,
                                        transition: 'opacity 0.2s',
                                        marginRight: '8px',
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                      onMouseLeave={(e) => e.currentTarget.style.opacity = 0.4}
                                      title="Delete section"
                                    >
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B07171" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              ))}
                              {/* Add section button */}
                              {editMode && (
                                <button
                                  onClick={() => addSection(topic.id, subtopic.id)}
                                  style={{
                                    width: '100%',
                                    padding: '8px 16px',
                                    background: 'none',
                                    border: '1px dashed rgba(26, 58, 58, 0.2)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    color: colors[topic.color].text,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    marginTop: '4px',
                                    marginLeft: '-2px',
                                    opacity: 0.7,
                                    transition: 'all 0.2s',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = 1;
                                    e.currentTarget.style.background = colors[topic.color].bg;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = 0.7;
                                    e.currentTarget.style.background = 'none';
                                  }}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  Add Section
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                      {/* Add subtopic button */}
                      {editMode && (
                        <button
                          onClick={() => addSubtopic(topic.id)}
                          style={{
                            width: 'calc(100% - 24px)',
                            margin: '8px 12px 0',
                            padding: '10px 16px',
                            background: 'none',
                            border: '1px dashed rgba(26, 58, 58, 0.2)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: colors[topic.color].text,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            opacity: 0.7,
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = 1;
                            e.currentTarget.style.background = colors[topic.color].bg;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = 0.7;
                            e.currentTarget.style.background = 'none';
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Add Subtopic
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Study Progress Card */}
              <div style={{
                margin: '24px 12px 0',
                padding: '16px',
                background: 'linear-gradient(135deg, rgba(26, 58, 58, 0.04) 0%, rgba(26, 58, 58, 0.08) 100%)',
                borderRadius: '16px',
                border: '1px solid rgba(26, 58, 58, 0.06)',
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#1A3A3A',
                  opacity: 0.5,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '12px',
                }}>
                  Study Checklist
                </div>
                {[
                  { text: 'Watch videos', done: true },
                  { text: 'Take notes', done: true },
                  { text: 'Practice labs', done: false },
                  { text: 'Mock exams', done: false },
                ].map((item, i) => (
                  <div key={i} className="checklist-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '8px',
                  }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '6px',
                      border: item.done ? 'none' : '2px solid rgba(26, 58, 58, 0.2)',
                      background: item.done ? colors.green.border : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {item.done && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span style={{
                      fontSize: '13px',
                      color: '#1A3A3A',
                      opacity: item.done ? 0.5 : 0.8,
                      textDecoration: item.done ? 'line-through' : 'none',
                    }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </aside>

        {/* Content Area */}
        <main
          className="blog-main"
          style={{
            flex: 1,
            padding: '32px 48px',
            maxWidth: '900px',
            marginLeft: sidebarOpen ? '0' : '0',
            transition: 'margin 0.3s ease',
          }}
        >
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            fontSize: '13px',
            color: '#1A3A3A',
            opacity: 0.6,
          }}>
            <span>{menuItems.find(t => t.children.some(s => s.children.some(c => c.id === activeSection)))?.title || 'Notes'}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{content[activeSection]?.subtitle}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ color: colors[currentColor].text, fontWeight: 600 }}>{content[activeSection]?.title}</span>
          </div>

          {/* Content Card */}
          <div
            className="content-card"
            style={{
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 4px 40px rgba(0,0,0,0.04)',
              border: '1px solid rgba(26, 58, 58, 0.06)',
              overflow: 'hidden',
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
              transition: 'all 0.15s ease-out',
            }}
          >
            {/* Card Header */}
            <div
              className="header-gradient"
              style={{
                background: colors[currentColor].gradient,
                padding: '28px 32px',
                position: 'relative',
                overflow: 'hidden',
              }}>
              {/* Decorative circles */}
              <div className="decorative-circle" style={{
                position: 'absolute',
                right: '-20px',
                top: '-20px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
              }} />
              <div className="decorative-circle" style={{
                position: 'absolute',
                right: '60px',
                bottom: '-30px',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  {content[activeSection]?.subtitle}
                </div>
                {editMode ? (
                  <input
                    type="text"
                    value={content[activeSection]?.title || ''}
                    onChange={(e) => updateContent(activeSection, 'title', e.target.value)}
                    style={{
                      fontFamily: '"Nunito", sans-serif',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: 'white',
                      margin: 0,
                      letterSpacing: '-0.5px',
                      background: 'rgba(255,255,255,0.1)',
                      border: '2px dashed rgba(255,255,255,0.3)',
                      borderRadius: '8px',
                      padding: '4px 12px',
                      width: '100%',
                      outline: 'none',
                    }}
                    placeholder="Enter title..."
                  />
                ) : (
                  <h1 style={{
                    fontFamily: '"Nunito", sans-serif',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'white',
                    margin: 0,
                    letterSpacing: '-0.5px',
                  }}>
                    {content[activeSection]?.title}
                  </h1>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: '32px' }}>
              {editMode ? (
                <textarea
                  value={content[activeSection]?.body || ''}
                  onChange={(e) => updateContent(activeSection, 'body', e.target.value)}
                  style={{
                    fontSize: '15px',
                    color: '#1A3A3A',
                    lineHeight: 2,
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 400,
                    margin: 0,
                    width: '100%',
                    minHeight: '400px',
                    border: '2px dashed rgba(26, 58, 58, 0.2)',
                    borderRadius: '12px',
                    padding: '16px',
                    background: 'rgba(26, 58, 58, 0.02)',
                    resize: 'vertical',
                    outline: 'none',
                  }}
                  placeholder="Enter content..."
                />
              ) : (
                <pre style={{
                  fontSize: '15px',
                  color: '#1A3A3A',
                  lineHeight: 2,
                  whiteSpace: 'pre-wrap',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 400,
                  margin: 0,
                }}>
                  {content[activeSection]?.body}
                </pre>
              )}
            </div>

            {/* Card Footer - Navigation */}
            <div style={{
              padding: '20px 32px',
              background: 'rgba(26, 58, 58, 0.02)',
              borderTop: '1px solid rgba(26, 58, 58, 0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              {/* Previous */}
              {(() => {
                const allSections = menuItems.flatMap(t => t.children.flatMap(s => s.children));
                const currentIndex = allSections.findIndex(s => s.id === activeSection);
                const prevSection = currentIndex > 0 ? allSections[currentIndex - 1] : null;

                return prevSection ? (
                  <button
                    onClick={() => handleSectionChange(prevSection.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: '#1A3A3A',
                      opacity: 0.7,
                      padding: '8px 0',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = 1;
                      e.currentTarget.style.transform = 'translateX(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = 0.7;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {prevSection.title}
                  </button>
                ) : <div />;
              })()}

              {/* Next */}
              {(() => {
                const allSections = menuItems.flatMap(t => t.children.flatMap(s => s.children));
                const currentIndex = allSections.findIndex(s => s.id === activeSection);
                const nextSection = currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null;

                return nextSection ? (
                  <button
                    className="nav-btn"
                    onClick={() => handleSectionChange(nextSection.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: colors[currentColor].light,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: colors[currentColor].text,
                      fontWeight: 600,
                      padding: '10px 16px',
                      borderRadius: '10px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors[currentColor].bg;
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = colors[currentColor].light;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {nextSection.title}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : <div />;
              })()}
            </div>
          </div>

          {/* Quick Navigation Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '32px',
          }}>
            {menuItems.map((topic) => (
              <button
                key={topic.id}
                className="topic-card"
                onClick={() => {
                  const firstSection = topic.children[0]?.children[0]?.id;
                  if (firstSection) {
                    setExpandedMenus([topic.id, topic.children[0].id]);
                    handleSectionChange(firstSection);
                  }
                }}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'white',
                  border: `1px solid ${expandedMenus.includes(topic.id) ? colors[topic.color].border : 'rgba(26, 58, 58, 0.08)'}`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: expandedMenus.includes(topic.id) ? `0 4px 20px ${colors[topic.color].light}` : '0 2px 10px rgba(0,0,0,0.02)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 12px 40px ${colors[topic.color].light}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = expandedMenus.includes(topic.id) ? `0 4px 20px ${colors[topic.color].light}` : '0 2px 10px rgba(0,0,0,0.02)';
                }}
              >
                <div className="floating-icon" style={{ fontSize: '24px', marginBottom: '12px' }}>{topic.icon}</div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#1A3A3A',
                  marginBottom: '4px',
                }}>
                  {topic.title}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: colors[topic.color].text,
                  opacity: 0.8,
                }}>
                  {topic.children.reduce((acc, sub) => acc + sub.children.length, 0)} topics
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '32px',
        textAlign: 'center',
        borderTop: '1px solid rgba(26, 58, 58, 0.06)',
        background: 'rgba(255,255,255,0.5)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {menuItems.map((topic, i) => (
            <button
              key={topic.id}
              onClick={() => {
                const firstSection = topic.children[0]?.children[0]?.id;
                if (firstSection) {
                  setExpandedMenus([topic.id, topic.children[0].id]);
                  handleSectionChange(firstSection);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: colors[topic.color].border,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `pulse 2s ease-in-out ${i * 0.3}s infinite`,
              }}
              title={topic.title}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.5)';
                e.target.style.boxShadow = `0 0 15px ${colors[topic.color].border}`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            />
          ))}
        </div>
        <p style={{
          fontSize: '12px',
          color: '#2D5A5A',
          opacity: 0.5,
          margin: 0,
        }}>
          © 2025 Ayse Hilal Yalciner
        </p>
      </footer>
    </div>
  );
}


export default App;
