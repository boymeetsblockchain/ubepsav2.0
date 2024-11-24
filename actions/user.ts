"use server";
import { hash } from "bcryptjs";
import { registerSchema } from "@/utils/register-validator";
import { ZodError } from "zod";
import { db } from "@/lib/db";
import { userExist } from "@/utils/userExist";
import { signIn } from "@/auth";
import cloudinary from "@/config/cloudinary";
export const registerUser = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const userData = {
    username,
    email,
    password,
  };

  try {
    // Validate user data with Zod
    const validatedUser = registerSchema.parse(userData);

    // Check if user exists in the database
    const userExisting = await userExist(validatedUser.email);

    if (userExisting) {
      return {
        success: false,
        error: "User already exists.",
      };
    }

    // Hash the password
    const hashedPassword = await hash(validatedUser.password, 10);

    // Create a new user with the hashed password
    const user = await db.user.create({
      data: {
        ...validatedUser,
        password: hashedPassword,
      },
    });

    return { success: true, message: "User registered successfully." };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    } else {
      console.error("Unexpected error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
    return { success: true, message: "User Logged in successfully" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    } else {
      console.error("Unexpected error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  }
};

export const getUserById = async (id: string) => {
  if (!id) {
    return {
      error: "Please Provide a valid Id",
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return {
      success: "User Fetched",
      user,
    };
  } catch (error) {
    console.error("Error updating user:", error);

    return {
      error: "An error occurred while updating the user.",
    };
  }
};

export const UpdateUser = async (id: string, formdata: FormData) => {
  try {
    // Extract data from formdata
    const username = formdata.get("username") as string;
    const image = formdata.get("image") as File;

    if (!id) {
      return {
        error: "Please provide a valid ID.",
      };
    }

    // Process image upload if present
    let imageUrl = null;
    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const imageData = Buffer.from(buffer);

      // Convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "blog",
        }
      );

      imageUrl = result.secure_url;
    }

    // Update user data in the database
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        username,
        ...(imageUrl && { imageUrl }), // Update the image URL only if it's present
      },
    });

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Error updating user:", error);

    return {
      error: "An error occurred while updating the user.",
    };
  }
};
