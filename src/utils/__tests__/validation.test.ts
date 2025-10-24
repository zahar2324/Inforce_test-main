import { describe, it, expect } from 'vitest';
import { sanitizeInput, validateProductName, validateUrl } from '../validation';

describe('Security Validation', () => {
  describe('sanitizeInput', () => {
    it('should escape XSS attempts', () => {
      expect(sanitizeInput('<script>alert("XSS")</script>'))
        .toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
    });

    it('should handle SQL injection patterns', () => {
      expect(sanitizeInput("'; DROP TABLE products; --"))
        .toContain('&#x27;');
    });
  });

  describe('validateProductName', () => {
    it('should reject names with special characters', () => {
      expect(validateProductName('<script>')).toBe(false);
    });

    it('should accept valid names', () => {
      expect(validateProductName('iPhone 15 Pro')).toBe(true);
    });

    it('should reject too long names', () => {
      expect(validateProductName('a'.repeat(101))).toBe(false);
    });
  });

  describe('validateUrl', () => {
    it('should reject javascript: protocol', () => {
      expect(validateUrl('javascript:alert(1)')).toBe(false);
    });

    it('should accept https URLs', () => {
      expect(validateUrl('https://example.com/image.jpg')).toBe(true);
    });
  });
});