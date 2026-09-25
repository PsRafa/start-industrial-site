import fitz
import os

src = r"C:\Users\TJ - App\Downloads\Catálogo Start Industrial 2026 (1).pdf"
out_dir = r"C:\src\start-industrial-site\assets\produtos2026"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(src)
print(f"Paginas: {len(doc)}")
for pnum in range(len(doc)):
    page = doc[pnum]
    images = page.get_images(full=True)
    for i, img in enumerate(images):
        xref = img[0]
        base = doc.extract_image(xref)
        ext = base["ext"]
        w = base.get("width", 0)
        h = base.get("height", 0)
        if w < 150 or h < 150:
            continue
        fname = os.path.join(out_dir, f"p{pnum+1:02d}_img{i+1:02d}_{w}x{h}.{ext}")
        with open(fname, "wb") as f:
            f.write(base["image"])
        print(fname)
