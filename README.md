# 🌟 **FED Compliance Tracker** 🚀

## Hardware Requirements

👉 Install Node using [**nvm**](https://github.com/nvm-sh/nvm).

> [ℹ️ What is nvm and how to install?\*](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)

👉 Install `yarn`

> [ℹ️ Yarn installation](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

## 🛠️ **Run Locally Like a Pro**

### 📂 **Step 1: Clone the Repo**

First, grab the code. It's giving _git gud_ vibes. 🖥️

```bash
$ git clone git@github.com:mestaciodel/compliance-tracker.git
```

### 📦 Step 2: Install the Dependencies

```bash
$ yarn
```

### ⚡ Step 3: Fire It Up!

**🎨 Running the Next.js App**

```bash
$ yarn start:next
```

App will open on http://localhost:3000

**🅰️ Running the Angular App**

```bash
$ yarn start:ng
```

App will open on http://localhost:4200

## Story Books

### Next-App Storybook

```bash
$ yarn sb-next
```

NextJS Storybook will open on http://localhost:6006

## App Overview

### Kanban Board

Github Projects: https://github.com/users/mestaciodel/projects/2

### Mockups

Figma (In-progress): https://www.figma.com/design/oMqoDKjiCLmZ9DkFvyemBr/mandatory-tracker-version-1?node-id=0-1&p=f&t=Hu9mk0CPfu0h52FK-0

### .env file content

NEXT_PUBLIC_SUPABASE_GRAPHQL_URL=https://rjtezqqbmcpujhvadccw.supabase.co

SUPABASE_GRAPHQL_URL=https://rjtezqqbmcpujhvadccw.supabase.co

NEXT_PUBLIC_SUPABASE_URL=https://rjtezqqbmcpujhvadccw.supabase.co
NEXT_PUBLIC_SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdGV6cXFibWNwdWpodmFkY2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NTYxNjQsImV4cCI6MjA0OTAzMjE2NH0.HnKiGAbAGPF8lcOw7XJcZRndGIpWIqF48E2mSpZHbmE
NEXT_PUBLIC_AUTH_CALLBACK=http://localhost:3000/auth/callback

SUPABASE_URL=https://rjtezqqbmcpujhvadccw.supabase.co
SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdGV6cXFibWNwdWpodmFkY2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NTYxNjQsImV4cCI6MjA0OTAzMjE2NH0.HnKiGAbAGPF8lcOw7XJcZRndGIpWIqF48E2mSpZHbmE

AUTH_CALLBACK=http://localhost:3000/auth/callback

### NOTE

If you're unable to login to the dashboard in the next app, you'll need to add a 'Name' to your github profile then try logging in.
