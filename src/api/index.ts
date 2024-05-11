import { postAsync } from "@/api/config";

export async function videoProcessing(data: any) {
    return postAsync(" /api/video-mix/process", data)
}
