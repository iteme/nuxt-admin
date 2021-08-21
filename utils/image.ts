import { toJpeg } from 'html-to-image';

export const downloadJpeg = async (dom: any): Promise<void> => {
  const dataUrl = await toJpeg(dom);
  const link = document.createElement('a');
  link.download = new Date().getTime() + '.jpeg';
  link.href = dataUrl;
  link.click();
};
