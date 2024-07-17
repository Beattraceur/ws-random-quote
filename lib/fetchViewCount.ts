export async function fetchViewCount(path: string) {
  try {
    const response = await fetch(`/api/views/${encodeURIComponent(path)}`);
    const data = await response.json();
    return data.views;
  } catch (error) {
    console.error('Failed to fetch view count:', error);
    return 0;
  }
}
