import { AuthConfig } from 'convex/server';

const domain = process.env.CLERK_JWT_ISSUER_DOMAIN;

if (!domain) {
  throw new Error('CLERK_JWT_ISSUER_DOMAIN is not defined');
}
export default {
  providers: [
    {
      domain: domain,
      applicationID: 'convex',
    },
  ],
} satisfies AuthConfig;
