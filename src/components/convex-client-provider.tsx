'use client';

import { ClerkProvider, SignIn, useAuth } from '@clerk/clerk-react';
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ReactNode } from 'react';
import ScreenLoader from './screen-loader';

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex_url = process.env.NEXT_PUBLIC_CONVEX_URL;
  const clerk_key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!convex_url) {
    throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file');
  }
  if (!clerk_key) {
    throw new Error(
      'Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file'
    );
  }

  const convex = new ConvexReactClient(convex_url);

  return (
    <ClerkProvider publishableKey={clerk_key}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className='flex flex-col items-center justify-center min-h-screen'>
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <ScreenLoader label='Auth loading...' />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
