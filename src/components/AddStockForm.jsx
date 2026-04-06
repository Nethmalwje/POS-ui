import React from "react";
import Products from "./Products";
import Batch from "./Batch";
import BuyingPrice from "./BuyingPrice";
import SellingPrice from "./SellingPrice";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import axiosInstance from "../api/axiosConfig_Product";
import toast from "react-hot-toast";
import Items from "./Items";
import Barcode from "./Barcode";
import Quantity from "./Quantity";
import { useUserData } from "../context/userContext";

const AddStockForm = () => {
  const { fullUser: user } = useUserData();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm();

  async function onSubmit(data) {
    try {
      console.log(user);

      // For now, add post to database logic here, but should be abstracted using api/api.js
      const formData = new FormData();

      formData.append("item_id", data?.item_id);
      formData.append("barcode", data?.barcode);
      formData.append("quantity", data?.quantity);
      formData.append("location_id", user.location.location_id);
      formData.append("manager_id", user.employee_id);

      // Log the FormData entries
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Optionally, if you want to convert FormData to an object for easier logging
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      console.log("Form Data as Object:", formDataObject);

      const savePromise = axiosInstance({
        method: "post",
        url: `http://localhost:3010/addStock`,
        data: formDataObject,
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
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
        item_id: "",
        barcode: "",
        quantity: "",
        location_id: "",
        manager_id: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleClear() {
    reset({
      item_id: "",
      barcode: "",
      quantity: "",
      location_id: "",
      manager_id: "",
    });
  }

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins mb-4 md:text-left text-center">
        <strong>Add New Stock</strong>
      </h1>
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-w-[675px]:w-9/12"
        >
          <div className="space-y-4">
            <Items errors={errors} control={control} item="" />
            <Barcode errors={errors} control={control} barcode="" />
            <Quantity errors={errors} control={control} quantity="" />
          </div>
          <div className="flex gap-4 mt-8">
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

export default AddStockForm;
