
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const validateProductName = (name: string): boolean => {
  const regex = /^[a-zA-Z0-9\s\-_.()]{1,100}$/;
  return regex.test(name);
};


export const validateUrl = (url: string) => {
  if (!url) return true; 
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

export const validateComment = (comment: string): boolean => {
  return comment.length > 0 && comment.length <= 500;
};

