export const CheckIcon = () => (
  <svg className="w-4 h-4 text-gray-700 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const ReadmeForgeLogo = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1" />
    <path d="M8 10h16l-2 12H10L8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="12" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="17" x2="18" y2="17" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const PlanIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="24" y1="16" x2="24" y2="28" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="32" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="36" cy="32" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="24" y1="28" x2="12" y2="28" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="24" y1="28" x2="36" y2="28" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
