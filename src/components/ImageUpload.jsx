import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Image, message } from "antd";
import ImgCrop from "antd-img-crop";
import toast from "react-hot-toast";

function ImageUpload({ onImageChange, reset, image }) {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [existingImage, setExistingImage] = useState(image);

  useEffect(() => {
    setExistingImage(image);
  }, [image]);

  useEffect(() => {
    if (reset) {
      setFileList([]);
      setPreviewImage("");
      setPreviewOpen(false);
    }
  }, [reset]);

  const handleChange = async ({ fileList: newFileList }) => {
    const latestFile = newFileList.slice(-1)[0];
    if (latestFile && latestFile.status === "done" && !latestFile.thumbUrl) {
      latestFile.thumbUrl = await getBase64(latestFile.originFileObj).catch(
        (error) => {
          console.error("Error converting file to base64:", error);
          toast.error("Failed to convert file for preview.");
          return null;
        }
      );
    }
    setFileList(newFileList.slice(-1));
    onImageChange(latestFile?.originFileObj || null);
    setPreviewImage(latestFile?.thumbUrl || "");
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj).catch((error) => {
        console.error("Error in handlePreview:", error);
        toast.error("Preview conversion failed");
        return null;
      });
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-col items-center">
        {existingImage ? <h4>Upload Image</h4> : null}

        <ImgCrop rotationSlider>
          <Upload
            customRequest={({ file, onSuccess }) => {
              onSuccess("ok");
            }}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            accept="image/*"
            showUploadList={{
              showPreviewIcon: true,
              showRemoveIcon: true,
              showDownloadIcon: false,
            }}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </ImgCrop>
      </div>
      {existingImage && !previewImage && (
        <div className="flex flex-col items-center">
          <h4>Existing Image</h4>
          <Image
            src={existingImage}
            alt="Current Image"
            style={{
              width: 104,
              height: 104,
              objectFit: "cover",
              marginTop: 8,
            }}
            onClick={() => setPreviewOpen(true)}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
