import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://learn.aysehilal.dev',
  integrations: [
    starlight({
      title: 'Learn .NET + Azure AI',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/ayshilal' },
        { icon: 'external', label: 'Portfolio', href: 'https://aysehilal.dev' },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Local Development',
          items: [
            { label: 'AI in .NET Locally', slug: 'local-development/ai-in-dotnet-locally' },
            { label: 'Testing Without Cloud Costs', slug: 'local-development/testing-without-cloud' },
          ],
        },
        {
          label: 'Azure Integration',
          items: [
            { label: 'Azure OpenAI vs OpenAI', slug: 'azure-integration/azure-openai-vs-openai' },
            { label: 'Azure AI Foundry', slug: 'azure-integration/azure-ai-foundry' },
            { label: 'AI Search for RAG', slug: 'azure-integration/azure-ai-search-rag' },
            { label: 'Container Apps for AI', slug: 'azure-integration/azure-container-apps' },
          ],
        },
        {
          label: 'Infrastructure Patterns',
          items: [
            { label: 'Deploying AI Apps', slug: 'infrastructure/deploying-ai-apps' },
            { label: 'Scaling Considerations', slug: 'infrastructure/scaling-considerations' },
            { label: 'Cost Optimization', slug: 'infrastructure/cost-optimization' },
            { label: 'Monitoring with Azure Monitor', slug: 'infrastructure/monitoring-with-azure-monitor' },
          ],
        },
        {
          label: 'Security',
          items: [
            { label: 'Managed Identities', slug: 'security/managed-identities' },
            { label: 'Key Vault Integration', slug: 'security/key-vault-integration' },
            { label: 'Responsible AI Guardrails', slug: 'security/responsible-ai-guardrails' },
          ],
        },
      ],
    }),
  ],
});
