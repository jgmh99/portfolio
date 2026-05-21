from copy import deepcopy
import json
import subprocess
import sys
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = Path("/Users/jegalminhyuk/Downloads/경력기술서.docx")
OUTPUT = ROOT / "public" / "files" / "resume_제갈민혁.docx"
PDF_OUTPUT = ROOT / "public" / "files" / "resume_제갈민혁.pdf"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/AppleGothic.ttf")


def load_resume_items():
    script = (
        "import('./src/data/projects.js')"
        ".then((m) => console.log(JSON.stringify(m.resumeItems)))"
    )
    result = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def clear_cell(cell):
    for paragraph in cell.paragraphs:
        paragraph.clear()


def add_run(paragraph, text, *, bold=False, size=9):
    run = paragraph.add_run(text)
    run.bold = bold
    run.font.name = "맑은 고딕"
    run.font.size = Pt(size)
    return run


def set_lines(cell, lines, *, size=9, bold_first=False):
    clear_cell(cell)
    for index, line in enumerate(lines):
        paragraph = cell.paragraphs[0] if index == 0 else cell.add_paragraph()
        paragraph.paragraph_format.space_after = Pt(0)
        paragraph.paragraph_format.line_spacing = 1.15
        add_run(paragraph, line, bold=bold_first and index == 0, size=size)


def bullet_lines(title, items):
    lines = [title]
    lines.extend(f"- {item}" for item in items)
    return lines


def fill_table(table, item):
    header = f"{item['company']} / {item['role']} ({item['period']})"
    set_lines(table.rows[0].cells[0], [header], size=10, bold_first=True)
    table.rows[0].cells[0].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER

    role_lines = [
        "Frontend",
        "Developer",
        item["environment"],
        item["team"],
    ]
    set_lines(table.rows[1].cells[0], role_lines, size=8, bold_first=True)
    set_lines(table.rows[1].cells[1], [item["project"]], size=10, bold_first=True)

    details = []
    details.extend(bullet_lines("주요 업무", item["highlights"]))
    details.append("")
    details.extend(bullet_lines("주요 성과", item["outcomes"]))
    set_lines(table.rows[2].cells[1], details, size=8)


def remove_table(table):
    element = table._element
    element.getparent().remove(element)


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    items = load_resume_items()
    document = Document(TEMPLATE)

    title_table = document.tables[0]
    set_lines(title_table.rows[0].cells[0], ["경력기술서", "제갈민혁"], size=18, bold_first=True)
    for paragraph in title_table.rows[0].cells[0].paragraphs:
        paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER

    template_table = deepcopy(document.tables[1]._tbl)
    for table in list(document.tables[1:]):
        remove_table(table)

    body = document._body._element
    for item in items:
        cloned = deepcopy(template_table)
        body.append(cloned)
        fill_table(document.tables[-1], item)
        document.add_paragraph()

    document.save(OUTPUT)
    build_pdf(items)
    print(OUTPUT)


def para(text, style):
    return Paragraph(text.replace("\n", "<br/>"), style)


def build_pdf(items):
    pdfmetrics.registerFont(TTFont("AppleGothic", str(FONT_PATH)))
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "ResumeTitle",
        parent=styles["Title"],
        fontName="AppleGothic",
        fontSize=24,
        leading=30,
        alignment=1,
        spaceAfter=12,
    )
    meta_style = ParagraphStyle(
        "ResumeMeta",
        parent=styles["Normal"],
        fontName="AppleGothic",
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#4b5563"),
    )
    body_style = ParagraphStyle(
        "ResumeBody",
        parent=styles["Normal"],
        fontName="AppleGothic",
        fontSize=8.4,
        leading=12,
    )
    header_style = ParagraphStyle(
        "ResumeHeader",
        parent=body_style,
        fontSize=10,
        leading=13,
        textColor=colors.white,
    )
    role_style = ParagraphStyle(
        "ResumeRole",
        parent=body_style,
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#111827"),
    )

    doc = SimpleDocTemplate(
        str(PDF_OUTPUT),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="제갈민혁 경력기술서",
        author="제갈민혁",
    )

    story = [
        para("경력기술서", title_style),
        para("제갈민혁 / 프론트엔드 개발자 / 2024.09 ~ 현재", meta_style),
        Spacer(1, 10),
    ]

    for item in items:
        detail_lines = ["<b>주요 업무</b>"]
        detail_lines.extend(f"- {point}" for point in item["highlights"])
        detail_lines.append("")
        detail_lines.append("<b>주요 성과</b>")
        detail_lines.extend(f"- {point}" for point in item["outcomes"])

        table = Table(
            [
                [para(f"{item['company']} / {item['role']} ({item['period']})", header_style)],
                [
                    para(
                        f"<b>Frontend<br/>Developer</b><br/><br/>{item['environment']}<br/><br/>{item['team']}",
                        role_style,
                    ),
                    para(f"<b>{item['project']}</b><br/><br/>" + "<br/>".join(detail_lines), body_style),
                ],
            ],
            colWidths=[42 * mm, 114 * mm],
            repeatRows=0,
        )
        table.setStyle(
            TableStyle(
                [
                    ("SPAN", (0, 0), (-1, 0)),
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#111827")),
                    ("BACKGROUND", (0, 1), (0, 1), colors.HexColor("#f3f4f6")),
                    ("BOX", (0, 0), (-1, -1), 0.75, colors.HexColor("#111827")),
                    ("INNERGRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d1d5db")),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ]
            )
        )
        story.append(KeepTogether([table, Spacer(1, 9)]))

    doc.build(story)


if __name__ == "__main__":
    try:
        build()
    except Exception as exc:
        print(f"failed: {exc}", file=sys.stderr)
        raise
