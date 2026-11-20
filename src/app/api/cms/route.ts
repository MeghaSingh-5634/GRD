import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getSafeImageUrl } from "@/utils/imageUtils";

const dataFilePath = path.join(process.cwd(), "src", "data", "cmsData.json");

export async function GET() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json({ error: "CMS data file not found" }, { status: 404 });
    }
    const rawData = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(rawData);
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Error reading CMS data:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    // Auto-sanitize projects and heroSlides image paths
    if (Array.isArray(body.projects)) {
      body.projects = body.projects.map((p: any) => ({
        ...p,
        image: getSafeImageUrl(p.image, "/images/hero-grd-building.jpg"),
      }));
    }
    if (Array.isArray(body.heroSlides)) {
      body.heroSlides = body.heroSlides.map((s: any) => ({
        ...s,
        image: getSafeImageUrl(s.image, "/images/hero-slide-clean.jpg"),
      }));
    }

    // Write formatted JSON to file
    fs.writeFileSync(dataFilePath, JSON.stringify(body, null, 2), "utf8");

    return NextResponse.json({
      success: true,
      message: "Gallery and CMS content saved successfully!",
      data: body,
    });
  } catch (err: any) {
    console.error("Error saving CMS data:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
