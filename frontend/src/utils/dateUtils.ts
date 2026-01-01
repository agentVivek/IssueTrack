/**
 * Formats a date string into "August 31, 2025 at 11:53 PM"
 */
export const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Check for invalid date
  if (isNaN(date.getTime())) return 'Invalid Date';

  const datePart = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${datePart} at ${timePart}`;
};

/**
 * Calculates relative time like "3 days ago", "2 hours ago", "Just now"
 */
export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  // Check for invalid date
  if (isNaN(date.getTime())) return '';

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Define intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (seconds < 60) return 'Just now';
  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'Just now';
};