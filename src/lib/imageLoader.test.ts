import { test, expect } from 'vitest';
import imageLoader from './imageLoader';

test('converts IPFS URLs to HTTP gateway URLs', () => {
  const ipfsUrl = 'ipfs://QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o';
  const expected = 'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o';

  expect(imageLoader({ src: ipfsUrl })).toBe(expected);
});

test('leaves regular HTTP URLs unchanged', () => {
  const httpUrl = 'https://example.com/image.jpg';

  expect(imageLoader({ src: httpUrl })).toBe(httpUrl);
});

test('handles empty strings', () => {
  expect(imageLoader({ src: '' })).toBe('');
});