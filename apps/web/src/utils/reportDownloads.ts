export const escapeReportHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export const slugifyReportName = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const triggerFileDownload = ({
  content,
  fileName,
  mimeType,
}: {
  content: string;
  fileName: string;
  mimeType: string;
}) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  link.rel = 'noopener';
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
    link.remove();
  }, 1200);

  return fileName;
};

export const downloadHtmlReport = ({
  html,
  fileBaseName,
}: {
  html: string;
  fileBaseName: string;
}) =>
  triggerFileDownload({
    content: html,
    fileName: `${fileBaseName}.html`,
    mimeType: 'text/html;charset=utf-8',
  });
