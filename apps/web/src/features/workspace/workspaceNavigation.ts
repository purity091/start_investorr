export const getProjectEditPath = (projectId: string) =>
  `/projects/${encodeURIComponent(projectId)}/edit`;
