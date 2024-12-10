import axios, { AxiosError, AxiosProgressEvent } from 'axios';

const FILE_UPLOAD_ENDPOINT = process.env.REACT_APP_FILE_UPLOAD_ENDPOINT;
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
        const errorMsg = error.response
          ? error.response?.data.error
          : error.message;
        throw new Error(errorMsg);
      }
      throw new Error('An error occurred during upload. Please try again.');
    }
  },
};

export default FileUploadAPI;
