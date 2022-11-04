# Virtual Card Generator

## Table of Contents

- [Demo Version](#demo-version)
- [Build and Run](#build-and-run)
- [Configurations](#configurations)
- [Run Tests](#run-tests)
- [CI-CD](#ci-cd)
- [References](#references)

## Demo Version

Access the following URL to see the app running:
http://localhost:3000/Daniel?github=https://github.com/danielfcollier&linkedin=https://linkedin.com/in/danielfcollier

## Build and Run the App

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

## Run Tests

```bash
npm run test:ci
```
## CI-CD

### GitHub Actions

Tests are configured to run tests on multiple OS and Node.js versions to make sure the app is compatible across many platforms.

### Deployment on Vercel

If tests are passing, the CI-CD push changes to a `production` branch, which it is linked to a CD with Vercel.

## Configurations

Setup the `.env.development` to configure local environment variables. And, use `.env.production` to setup production variables.

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