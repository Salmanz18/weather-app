import { ReactNode } from 'react';

export function ConditionComponent({ showIf, children }: ConditionComponentProps) {
  if (showIf) {
    return <>{children}</>;
  }
  return null;
}

interface ConditionComponentProps {
  showIf: boolean;
  children: ReactNode | JSX.Element;
}
