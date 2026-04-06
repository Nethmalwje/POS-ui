import React from "react";
import { Button } from "antd";
import ProductName from "./ProductName";
import UnitWeight from "./UnitWeight";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axiosConfig";
import toast from "react-hot-toast";

const AddProductForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  async function onSubmit(data) {
    try {
      // For now, add post to database logic here, but should be abstracted using api/api.js
      const formData = new FormData();
      formData.append("product_name", data?.product_name);
      formData.append("unit_weight", data?.unit_weight);

      const savePromise = axiosInstance({
        method: "post",
        url: `http://localhost:49160/products`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      await toast.promise(
        savePromise,
        {
          loading: "Saving...",
          success: "Successfully saved!",
          error: "Couldn't save...",
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 2000,
          },
        }
      );

      const response = await savePromise;

      reset({
        product_name: "",
        unit_weight: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleClear() {
    reset({
      product_name: "",
      unit_weight: "",
    });
  }

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins mb-4 md:text-left text-center">
        <strong>Add New Product</strong>
      </h1>
      <div className="container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-w-[675px]:w-9/12"
        >
          <div className="space-y-4">
            <ProductName errors={errors} control={control} product_name={""} />
            <UnitWeight errors={errors} control={control} unit_weight={""} />
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <Button type="default" htmlType="reset" onClick={handleClear}>
              Clear All
            </Button>
            <Button type="primary" htmlType="submit" disabled={!isValid}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddProductForm;
