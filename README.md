# Ayse Hilal Yalciner - Portfolio

A personal portfolio website built with React.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

---

## Deploy to Azure Static Web Apps

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push this code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Create Azure Static Web App

1. Go to [portal.azure.com](https://portal.azure.com)
2. Search **"Static Web Apps"** → Click **Create**
3. Fill in:
   - **Subscription**: Your subscription
   - **Resource Group**: Create new or select existing
   - **Name**: `ayse-portfolio` (or your choice)
   - **Plan type**: Free
   - **Region**: Select closest to you
4. **Deployment details**:
   - **Source**: GitHub
   - **Organization**: Your GitHub username
   - **Repository**: Your repo name
   - **Branch**: main
5. **Build details**:
   - **Build Preset**: React
   - **App location**: `/`
   - **Output location**: `build`
6. Click **Review + Create** → **Create**

### Step 3: Add Custom Domain

1. In Azure Portal → Your Static Web App → **Custom domains**
2. Click **+ Add**
3. Enter your domain (e.g., `aysehilal.dev`)
4. Azure will show you DNS records to add
5. Go to your domain registrar → DNS settings → Add the records:
   - **CNAME**: `www` → `your-app.azurestaticapps.net`
   - **TXT** or **ALIAS**: As provided by Azure
6. Wait 5-10 minutes for DNS propagation
7. Azure will auto-provision a free SSL certificate

---

## Adding Badges

To add .NET, Angular, or Azure badges, edit `src/App.js` and find the badge placeholder section:

```jsx
{/* Badge placeholder area */}
<div style={{
  display: 'flex',
  gap: '16px',
  marginBottom: '40px',
  flexWrap: 'wrap',
}}>
  {/* Add your badge images here */}
  <img src="your-badge-url.png" alt="Badge" style={{ height: '40px' }} />
</div>
```

---

## Tech Stack

- React 18
- CSS-in-JS (inline styles)
- Google Fonts (Playfair Display, Source Sans 3)
