import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let fullName = "";
    let companyName = "";
    let businessEmail = "";
    let contactNumber = "";
    let designation = "";
    let projectLocation = "";
    let industry = "";
    let serviceRequired = "";
    let projectBudget = "";
    let projectDescription = "";
    let honeypot = "";
    let fileName: string | null = null;
    let fileSize: number | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      fullName = (formData.get("fullName") as string)?.trim() || "";
      companyName = (formData.get("companyName") as string)?.trim() || "";
      businessEmail = (formData.get("businessEmail") as string)?.trim() || "";
      contactNumber = (formData.get("contactNumber") as string)?.trim() || "";
      designation = (formData.get("designation") as string)?.trim() || "";
      projectLocation = (formData.get("projectLocation") as string)?.trim() || "";
      industry = (formData.get("industry") as string)?.trim() || "";
      serviceRequired = (formData.get("serviceRequired") as string)?.trim() || "";
      projectBudget = (formData.get("projectBudget") as string)?.trim() || "";
      projectDescription = (formData.get("projectDescription") as string)?.trim() || "";
      honeypot = (formData.get("website_source_hp") as string)?.trim() || "";

      const file = formData.get("drawingFile") as File | null;
      if (file && file.size > 0) {
        // Max 15MB limit
        if (file.size > 15 * 1024 * 1024) {
          return NextResponse.json(
            { success: false, error: "Uploaded file exceeds the maximum allowed size of 15MB." },
            { status: 400 }
          );
        }
        fileName = file.name;
        fileSize = file.size;
      }
    } else {
      const body = await req.json();
      fullName = body.fullName?.trim() || "";
      companyName = body.companyName?.trim() || "";
      businessEmail = body.businessEmail?.trim() || "";
      contactNumber = body.contactNumber?.trim() || "";
      designation = body.designation?.trim() || "";
      projectLocation = body.projectLocation?.trim() || "";
      industry = body.industry?.trim() || "";
      serviceRequired = body.serviceRequired?.trim() || "";
      projectBudget = body.projectBudget?.trim() || "";
      projectDescription = body.projectDescription?.trim() || "";
      honeypot = body.website_source_hp?.trim() || "";
    }

    // Honeypot check for bots
    if (honeypot) {
      // Silently accept bot submission without processing
      return NextResponse.json({
        success: true,
        message: "Your enquiry has been received.",
        enquiryId: "STAR-REF-BOT",
      });
    }

    // Required field validation
    if (!fullName) {
      return NextResponse.json({ success: false, error: "Full Name is required." }, { status: 400 });
    }
    if (!companyName) {
      return NextResponse.json({ success: false, error: "Company or Organization Name is required." }, { status: 400 });
    }
    if (!businessEmail) {
      return NextResponse.json({ success: false, error: "Business Email is required." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessEmail)) {
      return NextResponse.json({ success: false, error: "Please enter a valid business email address." }, { status: 400 });
    }
    if (!contactNumber) {
      return NextResponse.json({ success: false, error: "Contact phone number is required." }, { status: 400 });
    }
    // Clean phone number check
    const cleanPhone = contactNumber.replace(/[^0-9+]/g, "");
    if (cleanPhone.length < 8) {
      return NextResponse.json({ success: false, error: "Please provide a valid contact number (minimum 8 digits)." }, { status: 400 });
    }
    if (!projectLocation) {
      return NextResponse.json({ success: false, error: "Project site location is required." }, { status: 400 });
    }
    if (!serviceRequired) {
      return NextResponse.json({ success: false, error: "Please select a required service category." }, { status: 400 });
    }
    if (!projectDescription || projectDescription.length < 10) {
      return NextResponse.json({ success: false, error: "Please provide a brief description of your project (at least 10 characters)." }, { status: 400 });
    }

    const enquiryId = `STAR-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const leadRecord = {
      enquiryId,
      timestamp: new Date().toISOString(),
      fullName,
      companyName,
      designation: designation || "Not Specified",
      businessEmail,
      contactNumber,
      projectLocation,
      industry: industry || "Not Specified",
      serviceRequired,
      projectBudget: projectBudget || "Not Specified",
      projectDescription,
      attachedFile: fileName ? `${fileName} (${Math.round((fileSize || 0) / 1024)} KB)` : "None",
    };

    // Log the lead record securely on server
    console.log("[STAR SIGNAGE LEAD GENERATION]", JSON.stringify(leadRecord, null, 2));

    // Optional CRM Webhook Integration
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
    if (crmWebhookUrl) {
      try {
        await fetch(crmWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadRecord),
        });
      } catch (webhookErr) {
        console.error("CRM Webhook dispatch failed:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out to Star Printers & Signage. Your project enquiry has been logged successfully. Our corporate project engineering team will contact you within 24 business hours.",
      enquiryId,
      data: {
        companyName,
        serviceRequired,
        contactNumber,
      },
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please try again or reach out via WhatsApp.",
      },
      { status: 500 }
    );
  }
}
