import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

const legacyDates: Record<string, string> = {
  'hello-world': '2026-07-23',
  VRChatModeling: '2026-07-23',
  ShadowNote: '2026-07-26',
  Matrix: '2026-08-03',
  'Substance-Designer': '2026-08-04',
  'linear-algebra-and-transformations': '2026-08-22'
};

export function postDate(post: Post): Date {
  return post.data.date ?? new Date((legacyDates[post.id] ?? '2026-01-01') + 'T12:00:00+08:00');
}

export function postPath(post: Post): string {
  const date = postDate(post);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return '/' + year + '/' + month + '/' + day + '/' + post.id + '/';
}

export function postPaths(post: Post): string[] {
  return post.id === 'VRChatModeling'
    ? [postPath(post), '/VRChatModeling/']
    : [postPath(post)];
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

export function values(value: string | string[] | null | undefined): string[] {
  return Array.isArray(value) ? value : value ? [value] : [];
}

export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => postDate(b).getTime() - postDate(a).getTime());
}
