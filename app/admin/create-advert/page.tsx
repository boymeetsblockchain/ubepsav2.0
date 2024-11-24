"use client";

import { createAdvert } from "@/actions/advert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/db";
import Image from "next/image";
import { useState } from "react";

function CreateAdvertPage() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.set("content", content);
    formdata.set("contact", contact);
    if (image) {
      formdata.append("image", image);
    }

    try {
      const advert = await createAdvert(formdata);
      setContact("");
      setContent("");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Advert
        </h1>

        {/* Content Field */}
        <div className="flex flex-col gap-y-2 mb-4">
          <Label
            htmlFor="content"
            className="text-sm font-medium text-gray-700"
          >
            Content
          </Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Brief description of the advert..."
            className="border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
        </div>

        {/* Contact Field */}
        <div className="flex flex-col gap-y-2 mb-4">
          <Label
            htmlFor="contact"
            className="text-sm font-medium text-gray-700"
          >
            Contact
          </Label>
          <Textarea
            id="contact"
            name="contact"
            placeholder="Contact link or number..."
            className="border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            rows={2}
          />
        </div>

        {/* Image Upload Field */}
        <div className="flex flex-col gap-y-2 mb-6">
          <Label
            htmlFor="picture"
            className="text-sm font-medium text-gray-700"
          >
            Upload Image
          </Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            className="p-2 border border-gray-300 rounded-md cursor-pointer focus:ring-2 focus:ring-blue-500"
            onChange={handleImageChange}
          />
          {previewUrl && (
            <div className="mt-4">
              <Image
                src={previewUrl}
                alt="Image Preview"
                width={200}
                height={200}
                className="object-cover rounded-md shadow-md"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
        >
          Submit Advert
        </button>
      </form>
    </div>
  );
}

export default CreateAdvertPage;
