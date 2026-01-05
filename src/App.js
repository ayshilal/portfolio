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
  const [activeSection, setActiveSection] = useState('key-components');
  const [expandedMenus, setExpandedMenus] = useState(['az-204', 'azure-app-service']);

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const menuItems = [
    {
      id: 'az-204',
      title: 'AZ-204 Certification',
      color: 'terracotta',
      children: [
        {
          id: 'azure-app-service',
          title: 'Azure App Service',
          children: [
            { id: 'key-components', title: 'Key Components' },
            { id: 'authentication', title: 'Authentication' },
            { id: 'inbound-outbound', title: 'Inbound and Outbound Control' },
            { id: 'deploy', title: 'Deploy' },
          ]
        },
      ]
    },
    {
      id: 'ai-900',
      title: 'AI-900 AI Fundamentals',
      color: 'purple',
      children: [
        {
          id: 'ai-concepts',
          title: 'AI Concepts',
          children: [
            { id: 'ai-intro', title: 'Introduction to AI' },
            { id: 'ml-basics', title: 'Machine Learning Basics' },
            { id: 'azure-ai-services', title: 'Azure AI Services' },
          ]
        },
      ]
    },
    {
      id: 'angular',
      title: 'Angular',
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

  const content = {
    'key-components': {
      title: 'Key Components',
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
      title: 'Inbound and Outbound Control',
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
      title: 'Deploy',
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
      title: 'Machine Learning Basics',
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

  const colors = {
    orange: { bg: 'rgba(224, 120, 80, 0.1)', border: '#E07850', text: '#E07850' },
    green: { bg: 'rgba(91, 138, 114, 0.1)', border: '#5B8A72', text: '#5B8A72' },
    blue: { bg: 'rgba(107, 143, 173, 0.1)', border: '#6B8FAD', text: '#6B8FAD' },
    purple: { bg: 'rgba(147, 112, 165, 0.1)', border: '#9370A5', text: '#9370A5' },
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FDF6F0',
      color: '#1A3A3A',
      fontFamily: '"Nunito", "Inter", sans-serif',
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600&display=swap');`}</style>
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
        background: '#B07171',
        backdropFilter: 'blur(10px)',
        gap: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: 300,
              letterSpacing: 'clamp(2px, 0.5vw, 4px)',
              color: '#FDF6F0',
            }}
          >
            AYSE'S NOTES
          </span>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('home')}
          style={{
            background: 'rgba(253, 246, 240, 0.2)',
            border: 'none',
            color: '#FDF6F0',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '13px',
            fontFamily: '"Nunito", sans-serif',
          }}
        >
          ← Portfolio
        </button>
      </nav>

      {/* Main Content with Sidebar */}
      <div style={{
        display: 'flex',
        paddingTop: '80px',
        minHeight: '100vh',
      }}>
        {/* Sidebar */}
        <aside style={{
          width: '280px',
          minWidth: '280px',
          background: 'rgba(26, 58, 58, 0.03)',
          borderRight: '1px solid rgba(26, 58, 58, 0.1)',
          padding: '24px 0',
          position: 'sticky',
          top: '80px',
          height: 'calc(100vh - 80px)',
          overflowY: 'auto',
        }}>
          {/* Colorful dots decoration - clickable */}
          <div style={{ 
            display: 'flex', 
            gap: '6px', 
            padding: '0 16px', 
            marginBottom: '20px' 
          }}>
            <button 
              onClick={() => {
                setExpandedMenus(prev => prev.includes('az-204') ? prev : [...prev, 'az-204', 'azure-app-service']);
                setActiveSection('key-components');
              }}
              style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#B07171', border: 'none', cursor: 'pointer', padding: 0 }} 
              title="AZ-204 Certification"
            />
            <button 
              onClick={() => {
                setExpandedMenus(prev => prev.includes('ai-900') ? prev : [...prev, 'ai-900', 'ai-concepts']);
                setActiveSection('ai-intro');
              }}
              style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#9370A5', border: 'none', cursor: 'pointer', padding: 0 }} 
              title="AI-900 AI Fundamentals"
            />
            <button 
              onClick={() => {
                setExpandedMenus(prev => prev.includes('angular') ? prev : [...prev, 'angular', 'angular-fundamentals']);
                setActiveSection('angular-components');
              }}
              style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#5B8A72', border: 'none', cursor: 'pointer', padding: 0 }} 
              title="Angular"
            />
          </div>
          
          {menuItems.map((topic) => (
            <div key={topic.id} style={{ marginBottom: '16px' }}>
              {/* Topic Header (e.g., AZ-204) */}
              <button
                onClick={() => toggleMenu(topic.id)}
                style={{
                  width: 'calc(100% - 24px)',
                  margin: '0 12px',
                  padding: '12px 16px',
                  background: colors[topic.color]?.border || '#E07850',
                  borderRadius: '12px',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#FDF6F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ 
                  transform: expandedMenus.includes(topic.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  fontSize: '10px',
                  color: '#FDF6F0',
                }}>▶</span>
                {topic.title}
              </button>
              
              {/* Subtopics (e.g., Azure App Service) */}
              {expandedMenus.includes(topic.id) && topic.children.map((subtopic) => (
                <div key={subtopic.id} style={{ marginLeft: '12px' }}>
                  <button
                    onClick={() => toggleMenu(subtopic.id)}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#1A3A3A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ 
                      transform: expandedMenus.includes(subtopic.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      fontSize: '8px',
                      color: colors[topic.color]?.text,
                    }}>▶</span>
                    {subtopic.title}
                  </button>
                  
                  {/* Sections (e.g., Key Components) */}
                  {expandedMenus.includes(subtopic.id) && (
                    <div style={{ marginLeft: '16px' }}>
                      {subtopic.children.map((section) => {
                        const topicColor = topic.color;
                        return (
                          <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            style={{
                              width: '100%',
                              padding: '6px 16px',
                              background: activeSection === section.id ? colors[topicColor]?.bg : 'none',
                              border: 'none',
                              borderLeft: activeSection === section.id ? `2px solid ${colors[topicColor]?.border}` : '2px solid transparent',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '13px',
                              color: activeSection === section.id ? colors[topicColor]?.text : '#1A3A3A',
                              transition: 'all 0.2s',
                              fontWeight: activeSection === section.id ? 600 : 400,
                            }}
                          >
                            {section.title}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* Content Area */}
        <main style={{
          flex: 1,
          padding: '40px',
          maxWidth: '900px',
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
        }}>
          <div style={{
            flex: 1,
            padding: '24px',
            borderRadius: '20px',
            background: colors[content[activeSection]?.color]?.bg || colors.green.bg,
            borderLeft: `3px solid ${colors[content[activeSection]?.color]?.border || colors.green.border}`,
          }}>
            <h1 style={{
              fontFamily: '"Nunito", sans-serif',
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '20px',
              color: colors[content[activeSection]?.color]?.text || '#1A3A3A',
              background: 'rgba(26, 58, 58, 0.05)',
              margin: '-24px -24px 20px -24px',
              padding: '18px 24px',
              borderRadius: '17px 17px 0 0',
              letterSpacing: '0.5px',
            }}>
              {content[activeSection]?.title}
            </h1>
            
            <pre style={{
              fontSize: '15px',
              color: '#1A3A3A',
              lineHeight: 1.9,
              whiteSpace: 'pre-wrap',
              fontFamily: '"Nunito", sans-serif',
              fontWeight: 400,
              margin: 0,
              opacity: 0.85,
            }}>
              {content[activeSection]?.body}
            </pre>
          </div>
          
          {/* To-do list note - responsive */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '15px',
            paddingTop: '10px',
            flexShrink: 0,
          }}>
            <svg 
              viewBox="0 0 130 155" 
              style={{ 
                width: 'clamp(90px, 14vw, 130px)', 
                height: 'auto',
              }}
            >
              {/* Note paper */}
              <rect x="8" y="10" width="114" height="140" fill="#FFFDE7" stroke="#E0D9C8" strokeWidth="2" rx="2" transform="rotate(-1 65 80)"/>
              {/* Pin on paper */}
              <circle cx="65" cy="22" r="7" fill="#B07171"/>
              <ellipse cx="65" cy="22" rx="4" ry="3" fill="#C88585"/>
              {/* Title */}
              <text x="16" y="45" fontSize="12" fontWeight="600" fill="#1A3A3A" fontFamily="Nunito, sans-serif">To Do</text>
              
              {/* Item 1 - Youtube videos (checked) */}
              <rect x="16" y="53" width="11" height="11" fill="none" stroke="#5B8A72" strokeWidth="2" rx="2"/>
              <path d="M19 58 L22 61 L25 55" stroke="#5B8A72" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="32" y="62" fontSize="9" fill="#1A3A3A" fontFamily="Nunito, sans-serif" textDecoration="line-through" opacity="0.5">Youtube videos</text>
              
              {/* Item 2 - Udemy classes (checked) */}
              <rect x="16" y="69" width="11" height="11" fill="none" stroke="#5B8A72" strokeWidth="2" rx="2"/>
              <path d="M19 74 L22 77 L25 71" stroke="#5B8A72" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="32" y="78" fontSize="9" fill="#1A3A3A" fontFamily="Nunito, sans-serif" textDecoration="line-through" opacity="0.5">Udemy classes</text>
              
              {/* Item 3 - Microsoft Learn (unchecked) */}
              <rect x="16" y="85" width="11" height="11" fill="none" stroke="#DDD" strokeWidth="1.5" rx="2"/>
              <text x="32" y="94" fontSize="9" fill="#1A3A3A" fontFamily="Nunito, sans-serif">Microsoft Learn</text>
              
              {/* Item 4 - Document (unchecked) */}
              <rect x="16" y="101" width="11" height="11" fill="none" stroke="#DDD" strokeWidth="1.5" rx="2"/>
              <text x="32" y="110" fontSize="9" fill="#1A3A3A" fontFamily="Nunito, sans-serif">Document</text>
              
              {/* Item 5 - Mock exams (unchecked) */}
              <rect x="16" y="117" width="11" height="11" fill="none" stroke="#DDD" strokeWidth="1.5" rx="2"/>
              <text x="32" y="126" fontSize="9" fill="#1A3A3A" fontFamily="Nunito, sans-serif">Mock exams</text>
              
              {/* Item 6 - Schedule the exam (unchecked) */}
              <rect x="16" y="133" width="11" height="11" fill="none" stroke="#DDD" strokeWidth="1.5" rx="2"/>
              <text x="32" y="142" fontSize="9" fill="#1A3A3A" fontFamily="Nunito, sans-serif">Schedule the exam</text>
            </svg>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '40px 32px',
        textAlign: 'center',
        borderTop: '1px solid rgba(26, 58, 58, 0.1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '12px' }}>
          <button 
            onClick={() => {
              setExpandedMenus(prev => prev.includes('az-204') ? prev : [...prev, 'az-204', 'azure-app-service']);
              setActiveSection('key-components');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B07171', border: 'none', cursor: 'pointer', padding: 0 }} 
            title="AZ-204 Certification"
          />
          <button 
            onClick={() => {
              setExpandedMenus(prev => prev.includes('ai-900') ? prev : [...prev, 'ai-900', 'ai-concepts']);
              setActiveSection('ai-intro');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9370A5', border: 'none', cursor: 'pointer', padding: 0 }} 
            title="AI-900 AI Fundamentals"
          />
          <button 
            onClick={() => {
              setExpandedMenus(prev => prev.includes('angular') ? prev : [...prev, 'angular', 'angular-fundamentals']);
              setActiveSection('angular-components');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5B8A72', border: 'none', cursor: 'pointer', padding: 0 }} 
            title="Angular"
          />
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


export default App;
