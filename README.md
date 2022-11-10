# Virtual Card Generator

## Table of Contents

- [Demo Version](#demo-version)
- [Build and Run](#build-and-run)
- [Run Tests](#run-tests)
- [CI-CD](#ci-cd)
- [Configurations](#configurations)
- [References](#references)

## Demo Version

Access the following URL to see the app running:
https://ts-nextjs-app-virtual-card-generator.vercel.app

Use this URL to see a valid virtual card page:
https://ts-nextjs-app-virtual-card-generator.vercel.app/Daniel?github=https://github.com/danielfcollier&linkedin=https://linkedin.com/in/danielfcollier

## Build and Run the App

### Locally:

```bash
npm install
npm run build
npm run dev -- --port 3000
```

### Development:

```bash
npm run dev -- --port 3000
```

### Production:

```bash
npm start
```

### With Docker:

```bash
docker build -t virtual-card-generator .
docker run -p 3000:3000 virtual-card-generator
```

## Run Tests

```bash
npx jest --updateSnapshot
npm run test:ci
```

## CI-CD

### GitHub Actions

Tests are configured to run on multiple OS and Node.js versions to make sure the app is compatible across many platforms.

#### Test locally with `act`

```bash
act -a tests
```

### Deployment on Vercel

If tests are passing, the CI with GitHub Actions pushes the changes to a production branch (`prod`), which is linked to a CD with Vercel.

## Configurations

Set up the file `.env.development` to configure local environment variables. And, use the file `.env.production` to set up production variables.

## References

### Base template created with:

```bash
npx create-next-app --example with-jest ts-nextjs-app-virtual-card-generator
```

https://github.com/vercel/next.js/tree/canary/examples/with-jest

### Base dockerfile created with:

https://github.com/vercel/next.js/tree/canary/examples/with-docker

### Vercel Environment Variables

https://vercel.com/docs/concepts/projects/environment-variables

### Test GitHub Actions Locally

https://github.com/nektos/act
