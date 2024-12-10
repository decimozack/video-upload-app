import axios, { AxiosError, AxiosProgressEvent } from 'axios';

const FILE_UPLOAD_ENDPOINT = 'http://localhost:8000';
const FileUploadAPI = {
  post: async (
    formData: FormData,
    uploadProgressCallback: (progressevent: AxiosProgressEvent) => void
  ) => {
    try {
      const response = await axios.post(
        `${FILE_UPLOAD_ENDPOINT}/api/v1/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: uploadProgressCallback,
        }
      );

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.error);
      }
      throw new Error('An error occurred during upload. Please try again.');
    }
  },
};

export default FileUploadAPI;
