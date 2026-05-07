'use client';

import Spline from '@splinetool/react-spline/next';

export default function SplineScene({ scene, onLoad }: { scene: string, onLoad?: () => void }) {
  return <Spline scene={scene} onLoad={onLoad} />;
}
