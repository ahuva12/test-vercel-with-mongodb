"use server";
import { connectDatabase, getAllDocuments, insertDocument } from "@/services/mongo";
import { NextResponse } from "next/server";

export interface CarDocument {
    _id?: string
    model: string;
    color: string; 
    price: number;
}

export interface CarDocumentForUpdate {
    _id: string
    model?: string;
    color?: string; 
    price?: number;
}

export async function GET(request: Request) {
    const client = await connectDatabase();
    const data = await getAllDocuments(client, 'cars');

    return NextResponse.json(data);
}

export async function POST(req: Request) {
    try {
        const body: CarDocument = await req.json(); 
        const client = await connectDatabase();
        const res = await insertDocument(client, 'cars', body);

        return NextResponse.json(res);

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Failed to insert document" }, { status: 500 });
    }
}

