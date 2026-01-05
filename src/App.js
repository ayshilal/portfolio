import { useState, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
  }, []);

  // Dots animation styles
  const dotsKeyframes = `
    @keyframes fadeInOut {
      0%, 100% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
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
    { degree: 'M.S. in Electrical and Electronics Engineering', school: 'Istanbul University', note: 'No thesis (Not Complete)' },
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
      <style>{dotsKeyframes}</style>
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
            gap: 'clamp(4px, 1vw, 10px)',
            marginBottom: '24px',
            width: 'clamp(280px, 50vw, 420px)',
            justifyContent: 'space-between',
          }}>
            {[...Array(15)].map((_, i) => (
              <span
                key={i}
                style={{
                  width: 'clamp(4px, 0.8vw, 5px)',
                  height: 'clamp(4px, 0.8vw, 5px)',
                  borderRadius: '50%',
                  background: i % 3 === 0 ? '#E07850' : i % 3 === 1 ? '#5B8A72' : '#6B8FAD',
                  animation: `fadeInOut 4s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
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
            {['.NET', 'Azure', 'Angular', 'C#', 'SQL Server'].map((tech) => (
              <span key={tech} style={{
                padding: '10px 20px',
                borderRadius: '50px',
                fontSize: '13px',
                background: 'rgba(26, 58, 58, 0.08)',
                color: '#1A3A3A',
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
            <a href="mailto:aysehilalyalciner@gmail.com" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.8 }}>
              aysehilalyalciner@gmail.com
            </a>
            <a href="tel:+19296780598" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.8 }}>
              (929) 678-0598
            </a>
            <a href="https://linkedin.com/in/ahyalciner" target="_blank" rel="noopener noreferrer" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.8 }}>
              LinkedIn
            </a>
            <a href="https://github.com/ayshilal" target="_blank" rel="noopener noreferrer" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.8 }}>
              GitHub
            </a>
            <span style={{ color: '#2D5A5A', opacity: 0.6 }}>New York, NY</span>
          </div>

          {/* Featured Project Card */}
          <div style={{
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
              style={{
                padding: '24px',
                borderRadius: '20px',
                background: colors[job.color].bg,
                borderLeft: `3px solid ${colors[job.color].border}`,
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
            <div key={i} style={{
              padding: '24px',
              borderRadius: '20px',
              background: colors.purple.bg,
              borderLeft: `3px solid ${colors.purple.border}`,
              textAlign: 'center',
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
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeCategory === cat ? '#1A3A3A' : 'rgba(26, 58, 58, 0.08)',
                color: activeCategory === cat ? 'white' : '#1A3A3A',
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
          ).map((skill) => (
            <span key={skill} style={{
              padding: '10px 20px',
              borderRadius: '50px',
              fontSize: '13px',
              background: 'rgba(26, 58, 58, 0.08)',
              color: '#1A3A3A',
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
            <div key={i} style={{
              padding: '20px',
              borderRadius: '20px',
              background: colors.blue.bg,
              borderLeft: `3px solid ${colors.blue.border}`,
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
          style={{
            display: 'inline-block',
            padding: '18px 40px',
            borderRadius: '50px',
            background: '#E07850',
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
          <a href="tel:+19296780598" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.7 }}>
            (929) 678-0598
          </a>
          <a href="https://linkedin.com/in/ahyalciner" target="_blank" rel="noopener noreferrer" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.7 }}>
            LinkedIn
          </a>
          <a href="https://github.com/ayshilal" target="_blank" rel="noopener noreferrer" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.7 }}>
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
  const blogPosts = [
    {
      id: 1,
      title: 'Welcome to My Blog',
      date: 'January 2, 2026',
      color: 'green',
      content: `Welcome to my personal blog! I'm excited to start sharing my experiences and insights from over 8 years in software development.

Here, I'll be writing about:
• .NET and C# best practices
• Azure cloud solutions and architectures
• Angular and frontend development tips
• Career growth in tech
• Lessons learned from enterprise projects

Stay tuned for more posts coming soon!`,
    },
  ];

  const colors = {
    green: { bg: 'rgba(91, 138, 114, 0.1)', border: '#5B8A72' },
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FDF6F0',
      color: '#1A3A3A',
      fontFamily: '"Inter", sans-serif',
    }}>
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
        <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)' }}>
          <button
            onClick={() => onNavigate('home')}
            style={{
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
            Home
          </button>
          <button
            style={{
              color: '#1A3A3A',
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: 500,
              padding: 0,
            }}
          >
            Blog
          </button>
        </div>
      </nav>

      {/* Blog Header */}
      <section style={{
        padding: '140px 32px 60px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '42px',
          fontWeight: 300,
          letterSpacing: '6px',
          marginBottom: '12px',
          color: '#1A3A3A',
        }}>
          BLOG
        </h1>
        <p style={{
          fontSize: '12px',
          color: '#2D5A5A',
          opacity: 0.6,
          letterSpacing: '1px',
        }}>
          thoughts on software development
        </p>
      </section>

      {/* Blog Posts */}
      <section style={{
        padding: '40px 32px 80px',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        {blogPosts.map((post) => (
          <article 
            key={post.id}
            style={{
              marginBottom: '24px',
              padding: '24px',
              borderRadius: '20px',
              background: colors[post.color].bg,
              borderLeft: `3px solid ${colors[post.color].border}`,
            }}
          >
            <p style={{
              fontSize: '11px',
              color: '#2D5A5A',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: 0.6,
            }}>
              {post.date}
            </p>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '26px',
              fontWeight: 400,
              marginBottom: '16px',
              color: '#1A3A3A',
            }}>
              {post.title}
            </h2>
            <div style={{
              fontSize: '15px',
              color: '#1A3A3A',
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
              opacity: 0.85,
            }}>
              {post.content}
            </div>
          </article>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 32px',
        textAlign: 'center',
        borderTop: '1px solid rgba(26, 58, 58, 0.1)',
      }}>
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

export default App;
