import os
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCREENSHOT_DIR = os.path.join(BASE_DIR, "screenshots")

PAGES_DATA = [
    ("home", "1. Marketing & Online Booking Portal", 
     "Professional, SEO-optimized hotel website. Converts visitors into table reservations and online dining inquiries with zero third-party commissions."),
    
    ("qr_menu", "2. Customer QR Digital Menu & Table Ordering", 
     "Guests scan table QR codes to browse full menu, view dietary tags, customize dishes, and order directly from their phone. Saves 8+ minutes per table service."),
    
    ("food_detail", "3. Interactive Dish Customization & Upselling", 
     "High-resolution dish photography, nutritional facts, ingredient lists, and add-on options that increase Average Order Value (AOV) by up to 22%."),

    ("cart", "4. Smart Shopping Cart & Automated Bill Breakdown", 
     "Instant coupon validation, special cooking instructions, auto GST calculation, and service charge breakdown. Eliminates billing disputes."),

    ("kitchen", "5. Kitchen Display System (KDS)", 
     "Replaces paper tickets. Live order cards with color-coded preparation timers (Green -> Amber -> Red) and one-tap status bumping for chefs."),

    ("staff", "6. Staff Floor Management & POS Billing", 
     "Visual floor map tracking table occupancy across 20 tables. Waiters manage orders and cashiers collect UPI/Card payments in one tap."),

    ("admin_dashboard", "7. Owner Admin Dashboard", 
     "Complete real-time business command center. Track daily sales, active orders, running tables, and average order value from any mobile device."),

    ("admin_reports", "8. Business Intelligence & Revenue Analytics", 
     "8 interactive analytics charts detailing category sales mix, peak operational hours, customer retention rates, and payment gateway splits.")
]

def generate_pdf():
    print("Building Presentation PDF...")
    pdf_filename = os.path.join(os.path.dirname(BASE_DIR), "HotelOS_Sales_Presentation.pdf")
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=landscape(A4),
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    gold = colors.HexColor("#C9A84C")
    charcoal = colors.HexColor("#1A1A2E")
    cream = colors.HexColor("#F8F7F4")
    dark_gray = colors.HexColor("#2D2D44")

    title_style = ParagraphStyle('CoverTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=28, leading=34, textColor=gold, alignment=1)
    subtitle_style = ParagraphStyle('CoverSubtitle', parent=styles['Normal'], fontName='Helvetica', fontSize=13, leading=18, textColor=colors.white, alignment=1)
    slide_title_style = ParagraphStyle('SlideTitle', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=gold)
    slide_desc_style = ParagraphStyle('SlideDesc', parent=styles['Normal'], fontName='Helvetica', fontSize=10, leading=14, textColor=charcoal)

    story = []

    # ─── COVER SLIDE ────────────────────────────────────────────────────────
    story.append(Spacer(1, 1.2 * inch))
    story.append(Paragraph("HotelOS Digital Ecosystem", title_style))
    story.append(Spacer(1, 0.15 * inch))
    story.append(Paragraph("Commercial Sales Pitch Deck & Product Walkthrough for Hotel Owners", subtitle_style))
    story.append(Spacer(1, 0.4 * inch))

    summary_data = [
        ["Increase Revenue", "Staff Efficiency", "Order Accuracy", "Setup Time"],
        ["+30% Monthly", "Save 4+ Hours/Day", "99.8% Error Free", "48 Hours"],
    ]
    summary_table = Table(summary_data, colWidths=[2.2 * inch] * 4)
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), dark_gray),
        ('TEXTCOLOR', (0,0), (-1,0), gold),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 10),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('BACKGROUND', (0,1), (-1,1), charcoal),
        ('TEXTCOLOR', (0,1), (-1,1), colors.white),
        ('FONTNAME', (0,1), (-1,1), 'Helvetica-Bold'),
        ('FONTSIZE', (0,1), (-1,1), 15),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('GRID', (0,0), (-1,-1), 1, gold),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 0.4 * inch))

    # Investment summary table
    pricing_data = [
        ["Package", "Ideal For", "Included Features", "Setup Fee"],
        ["Standard", "Single Restaurant", "QR Menu, Kitchen Display, Billing POS", "₹25,000"],
        ["Pro Suite", "Hotel + Restaurant", "Website, Table Booking, QR Ordering, Admin Dashboard", "₹50,000"],
        ["Enterprise", "Multi-property Chains", "Full Customization, WhatsApp Automation, Dedicated Support", "Custom Quote"],
    ]
    pricing_table = Table(pricing_data, colWidths=[1.5 * inch, 2 * inch, 4 * inch, 1.3 * inch])
    pricing_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), gold),
        ('TEXTCOLOR', (0,0), (-1,0), charcoal),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 9),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('TEXTCOLOR', (0,1), (-1,-1), colors.white),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,1), (-1,-1), 9),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#4A4A6A")),
    ]))
    story.append(pricing_table)
    story.append(PageBreak())

    # ─── SCREENSHOT SLIDES ──────────────────────────────────────────────────
    for key, title, desc in PAGES_DATA:
        img_path = os.path.join(SCREENSHOT_DIR, f"{key}.png")
        if os.path.exists(img_path):
            story.append(Paragraph(title, slide_title_style))
            story.append(Spacer(1, 0.04 * inch))
            story.append(Paragraph(desc, slide_desc_style))
            story.append(Spacer(1, 0.1 * inch))

            img = RLImage(img_path, width=10.6 * inch, height=5.5 * inch)
            story.append(img)
            story.append(PageBreak())

    def bg_canvas(canvas, doc):
        canvas.saveState()
        if doc.page == 1:
            canvas.setFillColor(charcoal)
            canvas.rect(0, 0, 11.69 * inch, 8.27 * inch, fill=True, stroke=False)
        else:
            canvas.setFillColor(cream)
            canvas.rect(0, 0, 11.69 * inch, 8.27 * inch, fill=True, stroke=False)
            canvas.setFillColor(charcoal)
            canvas.rect(0, 7.85 * inch, 11.69 * inch, 0.42 * inch, fill=True, stroke=False)
            canvas.setFillColor(gold)
            canvas.setFont('Helvetica-Bold', 9)
            canvas.drawString(36, 7.96 * inch, "HotelOS Digital Ecosystem — Product Presentation Deck")
            canvas.drawRightString(11.69 * inch - 36, 7.96 * inch, f"Page {doc.page}")
        canvas.restoreState()

    doc.build(story, onFirstPage=bg_canvas, onLaterPages=bg_canvas)
    print(f"SUCCESS: Presentation PDF created at: {pdf_filename}")

if __name__ == "__main__":
    generate_pdf()
