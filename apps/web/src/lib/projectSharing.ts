export type ShareProjectResult = { shareUrl: string; shareToken: string };

export async function publishProject(projectId: string): Promise<ShareProjectResult> {
  const response = await fetch('/api/projects/publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, isPublic: true }),
  });
  const result = await response.json().catch(() => ({})) as { shareToken?: string; error?: string; message?: string };
  if (!response.ok) throw new Error(result.error || result.message || 'SHARE_PROJECT_FAILED');
  const shareToken = result.shareToken || projectId;
  return { shareToken, shareUrl: `${window.location.origin}/share/${shareToken}` };
}

export async function copyShareUrl(shareUrl: string) {
  if (!navigator.clipboard) throw new Error('CLIPBOARD_UNAVAILABLE');
  await navigator.clipboard.writeText(shareUrl);
}

export async function shareProject(projectId: string, title: string) {
  const result = await publishProject(projectId);
  if (navigator.share) await navigator.share({ title, text: `مشاهدة مشروع: ${title}`, url: result.shareUrl });
  else await copyShareUrl(result.shareUrl);
  return result;
}
