import { ReactNode } from 'react';

interface FilmFrameWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function FilmFrameWrapper({ children, className = '' }: FilmFrameWrapperProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-6 before:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Crect%20width%3D%274%27%20height%3D%2724%27%20fill%3D%27%23463730%27%2F%3E%3Crect%20x%3D%278%27%20width%3D%274%27%20height%3D%2724%27%20fill%3D%27%23463730%27%2F%3E%3Crect%20x%3D%2716%27%20width%3D%274%27%20height%3D%2724%27%20fill%3D%27%23463730%27%2F%3E%3C%2Fsvg%3E')] before:bg-repeat-x before:z-10
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-6 after:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Crect%20width%3D%274%27%20height%3D%2724%27%20fill%3D%27%23463730%27%2F%3E%3Crect%20x%3D%278%27%20width%3D%274%27%20height%3D%2724%27%20fill%3D%27%23463730%27%2F%3E%3Crect%20x%3D%2716%27%20width%3D%274%27%20height%3D%2724%27%20fill%3D%27%23463730%27%2F%3E%3C%2Fsvg%3E')] after:bg-repeat-x after:z-10">
        {children}
      </div>
    </div>
  );
}
