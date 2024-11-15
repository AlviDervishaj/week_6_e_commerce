import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
export const TextareaAutosize = styled(BaseTextareaAutosize)(() => `
  box-sizing: border-box;
  border: 1px solid #d1d1d1;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
`,
);
