# Virtual Card Generator

## Table of Contents

- [Demo Version](#demo-version)
- [Build and Run](#build-run)
- [Configurations](#configurations)
- [Tests and CI Pipeline](#tests-and-ci)
- [References](#references)

## Demo Version {#demo-version}

Access the following URL to see the app running:
http://localhost:3000/Daniel?github=https://github.com/danielfcollier&linkedin=https://linkedin.com/in/danielfcollier

## Build and Run the App {#build-run}

### Locally:

```bash
npm install
npm run build
npm start
```

### Development:

```bash
npm run dev
```

### With Docker:

```bash
docker build -t virtual-card-generator .
docker run -p 3000:3000 virtual-card-generator
```

## Run Tests {#tests-and-ci}

```bash
npm run test:ci
```

## Configurations {#configurations}

Setup the `.env.development` to configure local environment variables. And, use `.env.production` to setup production variables.

## References {#references}

### Base template created with:

```bash
npx create-next-app --example with-jest ts-nextjs-app-virtual-card-generator
```

https://github.com/vercel/next.js/tree/canary/examples/with-jest

### Base dockerfile created with:

https://github.com/vercel/next.js/tree/canary/examples/with-docker


### Vercel Environment Variables

https://vercel.com/docs/concepts/projects/environment-variables