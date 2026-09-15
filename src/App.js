import { useState, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    // ?project — Meadowcraft case study (capabilities + app screen gallery)
    if (params.has('project')) {
      return 'project';
    }
    // ?demo — Meadowcraft phone-mockup video walkthrough
    if (params.has('demo')) {
      return 'demo';
    }
    // ?notes — reading notes / blog
    if (params.has('notes')) {
      return 'blog';
    }
    return 'home';
  });

  if (currentPage === 'project') {
    return <ProjectDetail onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'demo') {
    return <ProjectPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'blog') {
    return <Blog onNavigate={setCurrentPage} />;
  }

  return <Home onNavigate={setCurrentPage} />;
}

// Renders the official badge image when present in public/images/.
// If the file is missing or fails to load, falls back to a drawn plaque
// so the card never shows a broken image.
function CertBadge({ cert, accent }) {
  const [failed, setFailed] = useState(false);
  const size = 'clamp(64px, 14vw, 84px)';

  if (!failed && cert.badge) {
    return (
      <img
        src={cert.badge}
        alt={`${cert.issuer} ${cert.name} badge`}
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          display: 'block',
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${cert.issuer} ${cert.name} badge`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: accent.tag,
        border: `2px solid ${accent.border}`,
        color: accent.text,
        textAlign: 'center',
        lineHeight: 1.1,
      }}
    >
      <span style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: cert.code.length > 8 ? '13px' : '17px',
        fontWeight: 500,
        letterSpacing: '0.5px',
        padding: '0 6px',
      }}>
        {cert.code}
      </span>
      <span style={{ fontSize: '9px', letterSpacing: '1px', opacity: 0.8, marginTop: '3px' }}>
        {cert.year}
      </span>
    </div>
  );
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
      company: 'TD Bank Group',
      role: 'IT Developer III',
      period: 'Sep 2023 — Jul 2025',
      duration: 'Toronto, ON',
      color: 'green',
      highlights: [
        "Responsible for how and when enterprise architecture compliance standards were adopted across the Hedge Accounting team's 20+ C#/.NET ETL pipelines, SQL Server databases and SSIS packages — deciding remediation approach, sequencing and release plan, with delivery tracked at the portfolio level",
        "Subject matter expert for the TD Securities Hedge Accounting application portfolio — amortization engines, financial calculation systems, post-trade ETL pipelines and mark-to-market / P&L feeds — working directly with Finance and Front Office on enhancements and production issues",
        'Maintained the integrations feeding trade and market data from Calypso, Murex and Bloomberg into the hedge accounting and mark-to-market / P&L engines, resolving feed and data-flow issues across downstream valuation and reporting systems',
        'Worked with in-house Quants on IFRS 9 amortization and valuation models, correcting data flow into present-value calculations and representing the team in modelling and audit meetings, including EY\u2019s external audit review',
        'Planned and executed remediation of 800+ Veracode SAST findings across the .NET portfolio, choosing the fix approach and rollout order to meet security requirements without disrupting production',
        'Ran cross-team Disaster Recovery exercises for production financial systems and led a database server migration end to end with no data loss or unplanned downtime',
        'Brought the .NET portfolio into compliance with unit-test coverage requirements, holding coverage above 80% under SonarQube using Moq and GitHub Copilot',
      ],
      tech: ['C#', '.NET', 'SQL Server', 'SSIS', 'Calypso', 'Murex', 'Bloomberg', 'SonarQube', 'Moq', 'Veracode'],
    },
    {
      company: 'TD Bank Group',
      role: 'Solutions Developer (Contract)',
      period: 'Nov 2020 — Jun 2021',
      duration: 'Toronto, ON',
      color: 'purple',
      highlights: [
        "Handled production issues and BAU enhancements across the Hedge Accounting team's .NET / C# / SQL portfolio for post-trade processing",
      ],
      tech: ['C#', '.NET', 'SQL Server', 'Post-trade processing'],
    },
    {
      company: 'Verisoft Group',
      role: 'Senior Software Developer',
      period: 'Mar 2018 — May 2019',
      duration: 'Istanbul, Turkey',
      color: 'orange',
      highlights: [
        'Designed and built the KAD-SIS gold account management platform for the Turkish Ministry of Treasury and Finance, used by the ministry and partner banks (Ziraat, Vakif, Katilim) to monitor nationwide digital-gold transactions and track valuation changes',
        'Implemented the backend in .NET Core 2.2 over PostgreSQL, with OAuth2 and RESTful APIs consumed by government and banking systems',
        'Delivered the Angular 8 / TypeScript frontend using Angular Material, NG Bootstrap and NGX-Charts for the reporting dashboards',
        'Extended the API Gateway for myGini, a US card-linked loyalty platform serving 60M+ cardholders via Visa / Mastercard, with RESTful Web API services and AWS Lambda functions behind real-time cashback offers',
        'Set up CI/CD pipelines for automated publishing on both platforms and mentored junior developers on .NET Core 2 fundamentals, code-based Entity Framework migrations, async programming and OAuth2',
      ],
      tech: ['.NET Core 2.2', 'C#', 'Angular 8', 'TypeScript', 'OAuth2', 'PostgreSQL', 'AWS Lambda', 'CI/CD'],
    },
    {
      company: 'Mlpcare',
      role: 'Software Developer',
      period: 'Apr 2013 — Mar 2018',
      duration: 'Istanbul, Turkey',
      color: 'blue',
      highlights: [
        'Shipped full-stack features for Reflex, a clinical management system used across 20+ hospitals for patient records and medication data, on web (ASP.NET MVC, Angular 4) and mobile (Xamarin.Forms)',
        'Released MLPPatient, a Xamarin.Forms app for patients to view medical profiles and test results and book appointments through RESTful Web APIs',
        'Maintained .NET 4.x MVC web and desktop applications backed by MongoDB, Elasticsearch, Angular 4 and jQuery, serving 19K health practitioners',
        'Added unit and integration tests with Selenium, xUnit and NUnit',
      ],
      tech: ['.NET 4.x', 'ASP.NET MVC', 'Entity Framework', 'Angular 4', 'MongoDB', 'Elasticsearch', 'Xamarin.Forms'],
    },
  ];

  const education = [
    { degree: 'B.S. Computer Engineering', school: 'Fatih University', note: '2010' },
    { degree: 'M.S. Electrical & Electronics Engineering', school: 'Istanbul University', note: 'Coursework completed (degree not conferred)' },
  ];

  // Featured credentials. `badge` points at a file in public/images/ — drop the
  // official PNG from your Credly profile there. If the file is missing the card
  // falls back to a drawn plaque, so nothing renders broken.
  const featuredCertifications = [
    {
      code: 'AI-102',
      name: 'Azure AI Engineer Associate',
      issuer: 'Microsoft',
      year: '2026',
      badge: '/images/cert-ai-102.png',
      verifyUrl: '', // paste your Credly badge link here
      color: 'blue',
    },
    {
      code: 'AZ-204',
      name: 'Azure Developer Associate',
      issuer: 'Microsoft',
      year: '2026',
      badge: '/images/cert-az-204.png',
      verifyUrl: '',
      color: 'purple',
    },
    {
      code: 'Data Engineer',
      showCode: false, // full credential name already reads as the title
      name: 'Data Engineer Associate',
      issuer: 'Databricks',
      year: '2026',
      badge: '/images/cert-databricks-de.png',
      verifyUrl: '',
      color: 'orange',
    },
  ];

  const earlierTraining = [
    { name: 'ASP.NET MVC5 Development', issuer: 'Microsoft' },
    { name: 'Advanced SQL and Tuning', issuer: 'Microsoft' },
    { name: 'Angular 4', issuer: 'Microsoft' },
    { name: 'Angular and TypeScript', issuer: 'TestDome' },
    { name: 'iOS Devices and Development Workshop', issuer: 'Apple' },
  ];

  const projects = [
    {
      key: 'project',
      glyph: '❀',
      name: 'Meadowcraft',
      tagline: 'AI skincare companion',
      blurb: 'Multi-agent system on the MCP C# SDK — routine analysis, product evaluation and ingredient checks exposed as tools the model calls.',
      period: 'Jul 2025 — Present',
      color: 'green',
      navigable: true,
    },
    {
      key: 'demo',
      glyph: '◆',
      name: 'IFRS Valuation Lakehouse',
      tagline: 'Governed lakehouse on Databricks',
      blurb: 'A legacy IFRS fair-value pipeline rebuilt with Unity Catalog lineage, provenance carried in the data, and serverless cost attributed per valuation run.',
      period: 'In progress · 2026',
      color: 'blue',
      navigable: false,
    },
  ];

  const skills = {
    ai: ['Azure OpenAI', 'Azure AI Search', 'RAG pipelines', 'Multi-agent systems', 'MCP C# SDK', 'Semantic Kernel', 'Prompt engineering', 'Token-level cost tracking', 'GitHub Copilot', 'Claude Code'],
    data: ['Azure Databricks', 'PySpark', 'Delta Lake', 'Unity Catalog', 'Lakehouse & medallion', 'OpenLineage', 'SQL Server', 'SSIS', 'ETL', 'Query tuning'],
    backend: ['C#', 'Python', 'SQL', '.NET 9 / .NET Core', 'ASP.NET Core Web API', '.NET Aspire', 'Entity Framework Core', 'Microservices', 'OAuth2'],
    cloud: ['Azure Functions', 'Service Bus', 'Cosmos DB', 'Azure PostgreSQL', 'AI Foundry', 'AD B2C', 'App Service', 'Container Registry', 'AWS Lambda'],
    frontend: ['Angular 16 / 19', 'TypeScript', 'Ionic', 'Angular Material'],
    domain: ['Calypso', 'Murex', 'FIX protocol', 'Bloomberg market data', 'Post-trade processing', 'Hedge accounting', 'Amortization', 'IFRS 9', 'Mark-to-market / P&L'],
    devops: ['Git', 'Azure DevOps', 'GitLab CI/CD', 'Docker', 'Terraform', 'Prometheus', 'Grafana', 'xUnit', 'NUnit', 'Moq', 'Selenium', 'SonarQube', 'Veracode'],
  };

  const skillCategories = ['All', 'AI', 'Data', 'Backend', 'Cloud', 'Frontend', 'Domain', 'DevOps'];

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
          {['About', 'Certifications', 'Projects', 'Experience', 'Skills', 'Contact'].map((item) => (
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
            Senior Software Engineer · Data &amp; AI Platform
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
            I build data and AI systems for regulated finance, where every reported figure has to be
            explainable and every run reproducible. Nine years of enterprise .NET across hedge accounting,
            post-trade ETL, valuation and mark-to-market / P&amp;L systems at TD — delivered under audit and
            change control — now applied to governed data platform and AI work on Azure and Databricks,
            where lineage, reconciliation and cost are tracked per run.
          </p>

          <p style={{
            fontSize: '14px',
            fontWeight: 300,
            color: '#2D5A5A',
            marginBottom: '40px',
            maxWidth: '600px',
            lineHeight: 1.7,
            opacity: 0.75,
          }}>
          </p>

          {/* Tech Pills */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}>
            {['Azure AI', 'Databricks', 'PySpark', '.NET', 'C#'].map((tech) => (
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
            <a href="tel:+14379850691" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.8 }}>
              (437) 985-0691
            </a>
            <a href="https://linkedin.com/in/ahyalciner" target="_blank" rel="noopener noreferrer" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.8 }}>
              LinkedIn
            </a>
            <a href="https://github.com/ayshilal" target="_blank" rel="noopener noreferrer" style={{ color: '#1A3A3A', textDecoration: 'none', opacity: 0.8 }}>
              GitHub
            </a>
            
          </div>

          {/* Projects */}
          <div id="projects" style={{
            marginTop: '56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            maxWidth: '760px',
          }}>
            {projects.map((project) => {
              const c = colors[project.color];
              const Heading = project.navigable ? 'button' : 'div';
              return (
                <div key={project.key} style={{
                  padding: '24px',
                  borderRadius: '20px',
                  background: c.bg,
                  borderLeft: `3px solid ${c.border}`,
                }}>
                  <p style={{
                    fontSize: '11px',
                    color: '#2D5A5A',
                    marginBottom: '8px',
                    letterSpacing: '1px',
                    opacity: 0.7,
                  }}>
                    {project.period}
                  </p>
                  <Heading
                    {...(project.navigable ? { onClick: () => onNavigate(project.key) } : {})}
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '22px',
                      fontWeight: 400,
                      color: '#1A3A3A',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: project.navigable ? 'pointer' : 'default',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span aria-hidden="true" style={{ color: c.text }}>{project.glyph}</span>
                    {project.name}{project.navigable ? ' →' : ''}
                  </Heading>
                  <p style={{
                    fontSize: '13px',
                    color: '#2D5A5A',
                    marginTop: '8px',
                    fontWeight: 500,
                  }}>
                    {project.tagline}
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: '#2D5A5A',
                    marginTop: '8px',
                    opacity: 0.75,
                    lineHeight: 1.6,
                  }}>
                    {project.blurb}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Certifications */}
      <section id="certifications" style={{
        padding: '64px 32px',
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
          earned during full-time upskilling in Azure AI and data engineering, since July 2025
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {featuredCertifications.map((cert) => {
            const accent = colors[cert.color];
            const card = (
              <>
                <CertBadge cert={cert} accent={accent} />
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    fontSize: '11px',
                    color: accent.text,
                    letterSpacing: '1px',
                    marginBottom: '6px',
                    fontWeight: 500,
                  }}>
                    {cert.issuer} · {cert.year}
                  </p>
                  <p style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#1A3A3A',
                    lineHeight: 1.4,
                  }}>
                    {cert.name}
                  </p>
                  {cert.showCode !== false && (
                    <p style={{
                      fontSize: '12px',
                      color: '#2D5A5A',
                      opacity: 0.7,
                      marginTop: '4px',
                    }}>
                      {cert.code}
                    </p>
                  )}
                </div>
              </>
            );

            const cardStyle = {
              padding: '20px',
              borderRadius: '20px',
              background: accent.bg,
              borderLeft: `3px solid ${accent.border}`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              textDecoration: 'none',
              color: 'inherit',
            };

            return cert.verifyUrl ? (
              <a
                key={cert.code}
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={cardStyle}
              >
                {card}
              </a>
            ) : (
              <div key={cert.code} style={cardStyle}>
                {card}
              </div>
            );
          })}
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
          {skillCategories.map((cat) => (
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
            ? Object.values(skills).flat()
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

      {/* Earlier Training */}
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
          EARLIER TRAINING
        </h2>
        <p style={{
          fontSize: '12px',
          color: '#2D5A5A',
          opacity: 0.6,
          textAlign: 'center',
          marginBottom: '48px',
          letterSpacing: '1px',
        }}>
          courses &amp; workshops
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
        }}>
          {earlierTraining.map((cert, i) => (
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


function ProjectDetail({ onNavigate }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  const colors = {
    green: { bg: 'rgba(91, 138, 114, 0.1)', border: '#5B8A72', tag: 'rgba(91, 138, 114, 0.25)', text: '#5B8A72' },
    orange: { bg: 'rgba(224, 120, 80, 0.1)', border: '#E07850', tag: 'rgba(224, 120, 80, 0.25)', text: '#E07850' },
  };

  const techStack = [
    'MCP C# SDK', 'Azure AI Foundry', 'Azure AI Search', 'Durable Functions',
    'Azure Service Bus', 'Cosmos DB', '.NET Aspire', 'Angular / Ionic',
  ];

  const appScreens = [
    { video: '/videos/Main_page_scroll.mp4', label: 'Home', desc: 'Browse your dashboard with quick access to products, routines, and AI features.' },
    { video: '/videos/Evaluate_product.mp4', label: 'Product Evaluation', desc: 'Analyzes ingredients and scores products for actives, purity, and **routine compatibility**.', highlight: 'routine compatibility' },
    { video: '/videos/AI_dermatologist.mp4', label: 'AI Dermatologist', desc: 'Ask questions about your routine, ingredients, or skin concerns and get personalized advice.' },
    { video: '/videos/Products.mp4', label: 'Products', desc: 'Catalog and organize all your skincare products by type, brand, and usage.' },
    { video: '/videos/Beauty_facts.mp4', label: 'Beauty Facts', desc: 'Discover curated skincare tips, self-care habits, and wellness recommendations.' },
    { video: '/videos/Check_products.mp4', label: 'Check Products', desc: 'Evaluates whether a new product fits your existing routine without conflicts.' },
  ];

  const projectStyles = `
    .phone-frame {
      position: relative;
      background: #1a1a1a;
      border-radius: 32px;
      padding: 8px;
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
    }

    .phone-frame:hover {
      transform: translateY(-8px);
      box-shadow: 0 35px 80px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05);
    }

    .phone-screen {
      border-radius: 16px;
      overflow: hidden;
      background: #FDF6F0;
    }

    .phone-screen video {
      width: 100%;
      display: block;
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
    }

    .phone-notch {
      display: none;
    }

    .phone-frame-small {
      position: relative;
      background: #1a1a1a;
      border-radius: 28px;
      padding: 8px;
      overflow: hidden;
      margin: 0 auto;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
    }

    .phone-frame-small:hover {
      transform: translateY(-6px);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.18);
    }

    .phone-frame-small .phone-screen {
      border-radius: 22px;
    }

    .phone-frame-small .phone-notch {
      height: 20px;
      border-radius: 0 0 14px 14px;
      top: 8px;
    }

    .project-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(32px, 5vw, 80px);
      align-items: center;
    }

    @media (max-width: 768px) {
      .project-hero {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .project-hero-info {
        order: 1;
      }
      .project-hero-phone {
        order: 2;
        display: flex;
        justify-content: center;
      }
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: clamp(16px, 3vw, 32px);
    }

    @media (max-width: 900px) {
      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
    }

    .project-back-btn {
      transition: all 0.3s ease;
    }

    .project-back-btn:hover {
      background: rgba(91, 138, 114, 0.15) !important;
      transform: translateX(-2px);
    }

    .project-tech-tag {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .project-tech-tag:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(91, 138, 114, 0.2);
    }
  `;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FDF6F0',
      color: '#1A3A3A',
      fontFamily: '"Inter", sans-serif',
    }}>
      <style>{projectStyles}</style>

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
      }}>
        <button
          className="project-back-btn"
          onClick={() => {
            window.history.pushState({}, '', '/');
            onNavigate('home');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: '"Inter", sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: colors.green.text,
            background: colors.green.bg,
            border: `1px solid ${colors.green.tag}`,
            borderRadius: '24px',
            cursor: 'pointer',
            padding: '8px 20px',
          }}
        >
          <span style={{ fontSize: '16px' }}>&larr;</span> Portfolio
        </button>
        <span style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(18px, 3vw, 24px)',
          fontWeight: 300,
          letterSpacing: '2px',
          color: '#1A3A3A',
        }}>
          Meadowcraft
        </span>
      </nav>

      {/* Hero Section */}
      <section style={{
        maxWidth: 'min(1200px, 90vw)',
        margin: '0 auto',
        paddingTop: 'clamp(100px, 12vh, 140px)',
        paddingBottom: 'clamp(40px, 6vh, 80px)',
        paddingLeft: 'clamp(16px, 4vw, 32px)',
        paddingRight: 'clamp(16px, 4vw, 32px)',
      }}>
        <div className="project-hero">
          {/* Left: Project Info */}
          <div className="project-hero-info" style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: colors.green.bg,
              borderRadius: '20px',
              marginBottom: 'clamp(16px, 2vw, 24px)',
            }}>
              <span style={{ fontSize: '14px' }}>&#10047;</span>
              <span style={{
                fontSize: '12px',
                fontWeight: 600,
                color: colors.green.text,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
              }}>
                Mobile App
              </span>
            </div>

            <h1 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: 300,
              letterSpacing: '2px',
              color: '#1A3A3A',
              margin: '0 0 clamp(12px, 1.5vw, 20px) 0',
              lineHeight: 1.1,
            }}>
              Meadowcraft
            </h1>

            <div style={{
              width: '40px',
              height: '2px',
              background: `linear-gradient(90deg, ${colors.green.border}, ${colors.orange.border})`,
              borderRadius: '2px',
              marginBottom: 'clamp(12px, 1.5vw, 20px)',
            }} />

            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontStyle: 'italic',
              color: '#8B7355',
              margin: '0 0 clamp(20px, 3vw, 32px) 0',
              lineHeight: 1.4,
            }}>
              Your personal skincare routine companion
            </p>

            <p style={{
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              lineHeight: 1.8,
              color: '#2D5A5A',
              opacity: 0.85,
              margin: '0 0 clamp(24px, 3vw, 36px) 0',
              maxWidth: '480px',
            }}>
              An AI-powered skincare companion built on a multi-agent architecture. Features an
              AI dermatologist that analyzes your routine and recommends products, intelligent
              routine generation, product evaluation with ingredient analysis, and personalized
              beauty insights — all orchestrated through durable agent pipelines with RAG-powered
              knowledge retrieval.
            </p>

            {/* Tech Stack */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: 'clamp(24px, 3vw, 36px)',
            }}>
              {techStack.map((tech, i) => (
                <span key={tech} className="project-tech-tag" style={{
                  padding: '6px 16px',
                  background: 'rgba(253, 246, 240, 0.8)',
                  border: '1px solid rgba(91, 138, 114, 0.2)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#2D5A5A',
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
                  transition: `all 0.5s ease ${0.5 + i * 0.1}s`,
                }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/ayshilal/Meadowcraft"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  background: '#1A3A3A',
                  color: '#FDF6F0',
                  borderRadius: '24px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="project-hero-phone" style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
          }}>
            <div className="phone-frame-small" style={{ width: 'clamp(250px, 28vw, 340px)' }}>
              <div className="phone-notch" />
              <div className="phone-screen">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/videos/AI_generate_routine_hero.mp4"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section style={{
        maxWidth: 'min(1200px, 90vw)',
        margin: '0 auto',
        paddingBottom: 'clamp(24px, 3vh, 40px)',
        paddingLeft: 'clamp(16px, 4vw, 32px)',
        paddingRight: 'clamp(16px, 4vw, 32px)',
      }}>
        <div style={{
          padding: 'clamp(20px, 3vw, 36px)',
          background: colors.green.bg,
          borderRadius: '20px',
          borderLeft: `3px solid ${colors.green.border}`,
        }}>
          <p style={{
            fontSize: '12px',
            fontWeight: 600,
            color: colors.green.text,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: '0 0 16px 0',
          }}>
            AI Capabilities
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '8px 32px',
          }}>
            {[
              'AI Dermatologist \u2014 routine analysis & product recommendations',
              'Intelligent Routine Generation \u2014 personalized morning & evening routines',
              'Product Evaluation \u2014 ingredient analysis with compatibility scoring',
              'Beauty Facts & Tips \u2014 RAG-powered skincare knowledge',
              'Product Check \u2014 evaluates new products against your existing routine',
            ].map((item, i) => (
              <p key={i} style={{
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                color: '#2D5A5A',
                margin: '4px 0',
                lineHeight: 1.6,
              }}>
                {'\u2022'} {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* App Screens Gallery */}
      <section style={{
        maxWidth: 'min(1200px, 90vw)',
        margin: '0 auto',
        paddingBottom: 'clamp(60px, 8vh, 100px)',
        paddingLeft: 'clamp(16px, 4vw, 32px)',
        paddingRight: 'clamp(16px, 4vw, 32px)',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(32px, 4vw, 56px)',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.6s',
        }}>
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            color: colors.green.text,
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            &#10043; App in Action
          </span>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 300,
            color: '#1A3A3A',
            margin: '12px 0 0 0',
          }}>
            Explore the Screens
          </h2>
        </div>

        <div className="gallery-grid">
          {appScreens.map((screen, i) => (
            <div key={screen.label} style={{
              textAlign: 'center',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.7 + i * 0.15}s`,
            }}>
              <div className="phone-frame-small">
                <div className="phone-notch" />
                <div className="phone-screen">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={screen.video}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <p style={{
                marginTop: '16px',
                fontSize: 'clamp(13px, 1.1vw, 16px)',
                fontWeight: 500,
                color: '#2D5A5A',
                letterSpacing: '0.5px',
                marginBottom: '6px',
              }}>
                {screen.label}
              </p>
              <p style={{
                fontSize: 'clamp(11px, 0.9vw, 13px)',
                color: '#2D5A5A',
                opacity: 0.7,
                lineHeight: 1.5,
                margin: 0,
              }}>
                {screen.highlight ? screen.desc.split(`**${screen.highlight}**`).reduce((acc, part, i, arr) => {
                  acc.push(part);
                  if (i < arr.length - 1) acc.push(<span key={i} style={{ fontWeight: 600, color: '#5B8A72' }}>{screen.highlight}</span>);
                  return acc;
                }, []) : screen.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: 'clamp(24px, 4vh, 40px) clamp(16px, 4vw, 32px)',
        borderTop: '1px solid rgba(91, 138, 114, 0.1)',
      }}>
        <p style={{
          fontSize: 'clamp(11px, 1vw, 15px)',
          color: '#2D5A5A',
          opacity: 0.5,
        }}>
          &copy; 2025 Ayse Hilal Yalciner
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

function ProjectPage({ onNavigate }) {
  const project = {
    title: 'Meadowcraft',
    subtitle: 'Your personal skincare routine companion',
    description: `A beautifully designed skincare tracking app that helps you organize your products, build daily routines, and discover tips for healthier skin.

Track your morning and evening routines, catalog your products by type, and never forget a step in your skincare journey.`,
    tech: ['React Native', 'Azure Static Web Apps', 'TypeScript'],
    features: [
      'Product catalog with brand & category organization',
      'Morning & evening routine tracking',
      'Daily routine progress tracking',
      'Discover section with skincare tips & facts',
      'Beautiful botanical-inspired design',
    ],
    videos: [
      { title: 'Home Screen', description: 'The main dashboard greets you with the time of day and shows four beautifully designed cards: My Products, Daily Routine, Discover, and Morning routine.', src: '/videos/meadowcraft-demo.mp4', placeholder: false },
    ],
    links: {
      github: '',
      live: '',
    }
  };

  const colors = {
    cream: '#F5EDE3',
    warmCream: '#FAF6F0',
    sage: '#8B9B7E',
    dustyRose: '#C4A792',
    navy: '#3D4852',
    olive: '#6B7B5E',
    brown: '#5C4D3C',
    border: '#D4C9BC',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${colors.warmCream} 0%, ${colors.cream} 100%)`,
      color: colors.brown,
      fontFamily: '"Cormorant Garamond", Georgia, serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500&display=swap');
      `}</style>
      
      {/* Decorative Pattern Border */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `repeating-linear-gradient(90deg, ${colors.sage} 0px, ${colors.sage} 20px, ${colors.dustyRose} 20px, ${colors.dustyRose} 40px, ${colors.olive} 40px, ${colors.olive} 60px)`,
      }} />
      
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: '4px',
        left: 0,
        right: 0,
        padding: '20px clamp(16px, 4vw, 32px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: `${colors.warmCream}F5`,
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>❀</span>
          <span style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(20px, 4vw, 26px)',
            fontWeight: 400,
            letterSpacing: '2px',
            color: colors.brown,
          }}>
            Meadowcraft
          </span>
        </div>
        <button
          onClick={() => onNavigate('home')}
          style={{
            background: colors.sage,
            border: 'none',
            color: colors.warmCream,
            padding: '10px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '13px',
            fontFamily: '"Nunito", sans-serif',
            fontWeight: 500,
            letterSpacing: '0.5px',
          }}
        >
          ← Portfolio
        </button>
      </nav>

      {/* Main Content */}
      <main style={{
        paddingTop: '120px',
        paddingBottom: '60px',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '120px 24px 60px',
      }}>
        {/* Header Card */}
        <div style={{
          background: colors.warmCream,
          border: `1px solid ${colors.border}`,
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '30px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(92, 77, 60, 0.08)',
        }}>
          <span style={{ fontSize: '32px', display: 'block', marginBottom: '16px' }}>❀</span>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(36px, 7vw, 52px)',
            fontWeight: 400,
            marginBottom: '8px',
            color: colors.brown,
            letterSpacing: '2px',
          }}>
            {project.title}
          </h1>
          <div style={{
            width: '60px',
            height: '1px',
            background: colors.dustyRose,
            margin: '16px auto',
          }} />
          <p style={{
            fontSize: '18px',
            color: colors.brown,
            opacity: 0.7,
            fontStyle: 'italic',
            fontWeight: 300,
          }}>
            {project.subtitle}
          </p>
        </div>

        {/* Hero Image */}
        <div style={{
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(92, 77, 60, 0.12)',
        }}>
          <img 
            src="/images/meadowcraft-hero.jpg" 
            alt="Skincare products collection"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>

        {/* Tech Stack */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '10px', 
          marginBottom: '30px',
          justifyContent: 'center',
        }}>
          {project.tech.map((tech, i) => (
            <span
              key={i}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 500,
                fontFamily: '"Nunito", sans-serif',
                background: colors.warmCream,
                color: colors.brown,
                border: `1px solid ${colors.border}`,
                letterSpacing: '0.5px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description Card */}
        <div style={{
          background: colors.warmCream,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(92, 77, 60, 0.08)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
          }}>
            <span style={{ color: colors.sage, fontSize: '18px' }}>✦</span>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '22px',
              fontWeight: 500,
              color: colors.brown,
              letterSpacing: '1px',
            }}>
              About
            </h2>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.brown,
            lineHeight: 1.9,
            fontFamily: '"Nunito", sans-serif',
            fontWeight: 300,
            whiteSpace: 'pre-line',
            opacity: 0.85,
          }}>
            {project.description}
          </p>
        </div>

        {/* Features Card */}
        <div style={{
          background: colors.warmCream,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(92, 77, 60, 0.08)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
          }}>
            <span style={{ color: colors.dustyRose, fontSize: '18px' }}>✦</span>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '22px',
              fontWeight: 500,
              color: colors.brown,
              letterSpacing: '1px',
            }}>
              Features
            </h2>
          </div>
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}>
            {project.features.map((feature, i) => (
              <li key={i} style={{ 
                fontSize: '15px', 
                color: colors.brown,
                opacity: 0.85,
                padding: '10px 0',
                borderBottom: i < project.features.length - 1 ? `1px solid ${colors.border}` : 'none',
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span style={{ color: colors.olive, fontSize: '10px' }}>●</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Video Demo Card */}
        <div style={{
          background: colors.warmCream,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(92, 77, 60, 0.08)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
          }}>
            <span style={{ color: colors.olive, fontSize: '18px' }}>✦</span>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '22px',
              fontWeight: 500,
              color: colors.brown,
              letterSpacing: '1px',
            }}>
              Demo
            </h2>
          </div>
          
          {project.videos.map((video, i) => (
            <div key={i}>
              <h3 style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '18px',
                fontWeight: 500,
                color: colors.brown,
                marginBottom: '8px',
              }}>
                {video.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: colors.brown,
                opacity: 0.7,
                marginBottom: '16px',
                fontFamily: '"Nunito", sans-serif',
                lineHeight: 1.6,
              }}>
                {video.description}
              </p>
              {video.placeholder ? (
                <div style={{
                  background: colors.cream,
                  borderRadius: '12px',
                  padding: '60px 20px',
                  textAlign: 'center',
                  border: `2px dashed ${colors.border}`,
                }}>
                  <p style={{ 
                    fontSize: '14px', 
                    color: colors.brown, 
                    opacity: 0.5,
                    margin: 0,
                  }}>
                    🎬 Video coming soon
                  </p>
                </div>
              ) : (
                <video 
                  controls 
                  style={{ 
                    width: '100%', 
                    borderRadius: '12px',
                    border: `1px solid ${colors.border}`,
                  }}
                  poster=""
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>

        {/* Decorative divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          margin: '40px 0',
        }}>
          <div style={{ width: '40px', height: '1px', background: colors.border }} />
          <span style={{ color: colors.dustyRose, fontSize: '16px' }}>❀</span>
          <div style={{ width: '40px', height: '1px', background: colors.border }} />
        </div>

      </main>

      {/* Footer */}
      <footer style={{
        padding: '40px 32px',
        textAlign: 'center',
        borderTop: `1px solid ${colors.border}`,
        background: colors.warmCream,
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '8px', 
          marginBottom: '12px' 
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.sage }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.dustyRose }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.olive }} />
        </div>
        <p style={{
          fontSize: '12px',
          color: colors.brown,
          opacity: 0.5,
          fontFamily: '"Nunito", sans-serif',
        }}>
          © 2025 Ayse Hilal Yalciner
        </p>
      </footer>
    </div>
  );
}


export default App;
