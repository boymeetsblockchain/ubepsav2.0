"use server";

import cloudinary from "@/config/cloudinary";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const createAdvert = async (formdata: FormData) => {
  const content = formdata.get("content") as string;
  const contact = formdata.get("contact") as string;
  const image = formdata.get("image") as File;

  console.log(contact, content);

  if (!contact || !content) {
    return {
      error: "Missing required fields",
    };
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const imageData = Buffer.from(buffer);

  // Convert the image data to base64
  const imageBase64 = imageData.toString("base64");

  // Make request to upload to Cloudinary
  const result = await cloudinary.uploader.upload(
    `data:image/png;base64,${imageBase64}`,
    {
      folder: "blog",
    }
  );

  const imageUrl = result.secure_url;

  const advert = await db.advert.create({
    data: {
      contact,
      content,
      imageUrl,
    },
  });

  if (advert) {
    redirect("/admin");
  }
};

export const deleteAdvert = async (id: string) => {
  if (!id) {
    return { error: "Post ID is required." };
  }

  try {
    const advert = await db.advert.delete({
      where: {
        id: id,
      },
    });

    return {
      success: "Post successfully Deleted",
    };
  } catch (error) {
    console.error("Error retrieving comments:", error);
    return;
  }
};

export const getAllAdverts = async () => {
  try {
    const adverts = await db.advert.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      success: "Adverts Fetched",
      adverts,
    };
  } catch (error) {
    console.error("Error retrieving comments:", error);
    return;
  }
};
