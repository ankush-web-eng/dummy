import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'
import {PrismaClient} from '@prisma/client'
import { revalidatePath } from "next/cache";

const primsa = new PrismaClient()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const formdata = await req.formData();
        const file = formdata.get("file") as File;
        console.log(file);
        
        const arrayBuffer = await file.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)


        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        if (!uploadResponse) {
            return NextResponse.json(
                { success: false, message: 'Error in Uploading Image' },
                { status: 400 }
            );
        }

        const url = (uploadResponse as { secure_url: string }).secure_url;
        console.log(url);

        const isSaved = await primsa.user.create({
            data: {
                image : url
            }
        })

        if (!isSaved) {
            return NextResponse.json(
                { success: false, message: 'Error in Saving Image' },
                { status: 400 }
            );
        }

        const path = req.nextUrl.searchParams.get('path') || '/';
        revalidatePath(path)

        return NextResponse.json({ success: true, message: 'Image Uploaded' }, {status:201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false }, { status: 500 })
    }
}