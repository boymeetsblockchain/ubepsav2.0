"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { createPost } from "@/actions/post";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("details", details);
    if (image) formData.append("image", image); // Append image only if present

    try {
      await createPost(formData);
      setFeedback("Post submitted successfully!");
      setTitle("");
      setDescription("");
      setDetails("");
      setImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error submitting post:", error);
      setFeedback("Error submitting post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        {/* Title Field */}
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="title" className="text-lg font-medium text-gray-700">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter the title..."
            className="border border-gray-300 rounded-md py-2 px-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description Field */}
        <div className="flex flex-col gap-y-1">
          <Label
            htmlFor="description"
            className="text-lg font-medium text-gray-700"
          >
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Brief description of the post..."
            className="border border-gray-300 rounded-md py-2 px-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Image Upload Field with Preview */}
        <div className="flex flex-col gap-y-2">
          <Label
            htmlFor="picture"
            className="text-lg font-medium text-gray-700"
          >
            Upload Image
          </Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            className="p-2 border border-gray-300 rounded-md cursor-pointer"
            onChange={handleImageChange}
          />
          {previewUrl && (
            <div className="mt-2">
              <Image
                src={previewUrl}
                alt="Image Preview"
                width={200}
                height={200}
                className="object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* Full Details with ReactQuill */}
        <div className="flex flex-col gap-y-2">
          <Label
            htmlFor="details"
            className="text-lg font-medium text-gray-700"
          >
            Full Details
          </Label>
          <ReactQuill
            theme="snow"
            value={details}
            onChange={setDetails}
            className="h-auto rounded-md"
            placeholder="Write full post details here..."
          />
        </div>

        {/* Feedback and Submit Button */}
        {feedback && (
          <p
            className={`text-sm ${
              feedback.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback}
          </p>
        )}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostPage;
