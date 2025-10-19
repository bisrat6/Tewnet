import { ReactNode } from 'react';

interface MovieGridProps {
  children: ReactNode;
}

export function MovieGrid({ children }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {children}
    </div>
  );
}
