export default function imageLoader({ src }: { src: string }) {
  return src.replace('ipfs://', 'https://ipfs.io/ipfs/');
}