import React from "react";

export function ProviderIcon({
  id,
  className = "",
  size = 16,
}: {
  id: string;
  className?: string;
  size?: number;
}) {
  const normId = (id || "").toLowerCase();

  if (normId.includes("opencode") || normId.includes("zen")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className={className}
      >
        <rect
          x="2"
          y="3"
          width="20"
          height="18"
          rx="4"
          fill="#09090b"
          stroke="#3b82f6"
          strokeWidth="1.8"
        />
        <path
          d="M7 8l4 4-4 4"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 16h4"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (normId.includes("deepseek")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M4.5 13.5C3.2 11.2 3.6 8.3 5.4 6.5C7.2 4.7 10.1 4.3 12.4 5.6C14.7 6.9 16.1 9.4 16.5 12.1C16.9 14.8 19.1 17 21.8 17.2V18.5C18.2 18.5 15.2 15.8 14.8 12.2C14.5 9.8 13.3 7.7 11.4 6.6C9.5 5.5 7.2 5.8 5.7 7.3C4.2 8.8 3.9 11.1 4.9 13C5.9 14.9 7.9 16.1 10.1 16.1H12V18.1H10.1C7.1 18.1 4.4 16.3 3.3 13.5L4.5 13.5Z"
          fill="#1D72F2"
        />
        <circle cx="8" cy="9" r="1.5" fill="#1D72F2" />
      </svg>
    );
  }

  if (normId.includes("anthropic") || normId.includes("claude")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path d="M13.8 3L8.2 21H11.2L16.8 3H13.8Z" fill="#D97757" />
        <path d="M4 17.5L9.6 3H12.6L7 17.5H4Z" fill="#D97757" />
        <path
          d="M12.8 17.5L18.4 3H21.4L15.8 17.5H12.8Z"
          fill="#D97757"
          opacity="0.8"
        />
      </svg>
    );
  }

  if (normId.includes("openai") || normId.includes("gpt")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#10a37f"
        strokeWidth="1.8"
        className={className}
      >
        <path d="M20.5 10.3a5.2 5.2 0 0 0-.4-3.8 5.3 5.3 0 0 0-4.6-2.7 5.2 5.2 0 0 0-3.6 1.4A5.2 5.2 0 0 0 7.8 4 5.3 5.3 0 0 0 3.6 7.4a5.2 5.2 0 0 0-1.3 3.6 5.3 5.3 0 0 0 2.2 4.4 5.2 5.2 0 0 0 .4 3.8 5.3 5.3 0 0 0 4.6 2.7 5.2 5.2 0 0 0 3.6-1.4 5.2 5.2 0 0 0 4.1 1.2 5.3 5.3 0 0 0 4.2-3.4 5.2 5.2 0 0 0 1.3-3.6 5.3 5.3 0 0 0-2.2-4.4z" />
        <path d="M12 9v6m-3-4.5l6 3m0-3l-6 3" strokeWidth="1.5" />
      </svg>
    );
  }

  if (normId.includes("gemini") || normId.includes("google")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
          fill="#38bdf8"
        />
      </svg>
    );
  }

  if (normId.includes("groq")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <circle cx="12" cy="12" r="9" stroke="#f55036" strokeWidth="2" />
        <path
          d="M16 12h-4v4"
          stroke="#f55036"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (normId.includes("workbuddy")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="4"
          fill="#6366f1"
          opacity="0.2"
          stroke="#6366f1"
          strokeWidth="1.8"
        />
        <circle cx="9" cy="11" r="1.5" fill="#818cf8" />
        <circle cx="15" cy="11" r="1.5" fill="#818cf8" />
        <path
          d="M8 15c1.5 1.5 4.5 1.5 6 0"
          stroke="#818cf8"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Default generic provider icon
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.4)" />
      <path
        d="M12 8v8M8 12h8"
        stroke="rgba(255,255,255,0.7)"
        strokeLinecap="round"
      />
    </svg>
  );
}
