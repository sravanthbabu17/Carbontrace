import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/**
 * Surface container for the "Organic Biophilic" look: rounded, soft-shadowed,
 * gently ringed. Renders a semantic element of your choice via `as`.
 */
interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'article' | 'li';
}

export function Card({ as: Tag = 'div', className, children, ...rest }: CardProps) {
  return (
    <Tag className={cn('glass-card rounded-3xl p-6 sm:p-8', className)} {...rest}>
      {children}
    </Tag>
  );
}
