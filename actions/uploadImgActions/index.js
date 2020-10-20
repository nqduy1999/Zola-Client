import { uploadService } from 'services';

export const uploadImgSingle = formData => {
  return uploadService.uploadImgSingleService(formData).then(res => {
    return res?.data;
  });
};
