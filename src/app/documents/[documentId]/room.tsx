'use client';

import ScreenLoader from '@/components/screen-loader';
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  return (
    <LiveblocksProvider throttle={16} authEndpoint={'/api/liveblocks-auth'}>
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<ScreenLoader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
