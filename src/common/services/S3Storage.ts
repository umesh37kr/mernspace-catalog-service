import config from "config";
import { FileData, FileStorage } from "../types/storage";
import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import createHttpError from "http-errors";

export class S3Storage implements FileStorage {
    private client: S3Client;
    constructor() {
        this.client = new S3Client({
            region: config.get("s3.region"),
            credentials: {
                accessKeyId: config.get("s3.accessKeyId"),
                secretAccessKey: config.get("s3.secretAccessKey"),
            },
        });
    }
    async upload(data: FileData): Promise<void> {
        const objectParams = {
            Bucket: config.get("s3.bucket"),
            Key: data.fileName,
            Body: data.fileData,
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.client.send(new PutObjectCommand(objectParams));
    }
    async delete(fileName: string): Promise<void> {
        const objectParams = {
            Bucket: config.get("s3.bucket"),
            Key: fileName,
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.client.send(new DeleteObjectCommand(objectParams));
    }
    getObjectUri(fileName: string): string {
        // https://mernspace-catalog-services.s3.ap-south-1.amazonaws.com/db09c47c-953e-4b09-ae8a-72c14a05797a
        const bucket = config.get("s3.bucket");
        const region = config.get("s3.region");
        if (typeof bucket === "string" && typeof region === "string") {
            return `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;
        }
        const error = createHttpError(500, "Invalid s3 configuration");
        throw error;
    }
}
