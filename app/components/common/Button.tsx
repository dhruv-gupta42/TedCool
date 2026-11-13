import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  showArrow?: boolean;
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  external = false,
  showArrow = false,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-heading font-medium uppercase tracking-wider transition-all duration-300 group';

  const variants = {
    primary: 'bg-brand hover:bg-brand-light text-white',
    secondary:
      'border border-border hover:border-brand text-text-primary hover:text-brand bg-transparent',
    ghost:
      'text-text-secondary hover:text-brand bg-transparent',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-10 py-4.5 text-sm',
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClass}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClass}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClass}>
      {content}
    </button>
  );
}
