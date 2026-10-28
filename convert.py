#!/usr/bin/env python3
"""
XE Static Site Converter (v2 - no file_srl prefix)
PHP file download URLs -> direct static file links
Run from the human_web folder.
"""

import csv
import os
import re
import shutil
import sys
from urllib.parse import quote

CSV_FILE = "xe_files.csv"
DOWNLOADS_DIR = "files/attach/downloads"

def load_mapping(csv_path):
    mapping = {}
    with open(csv_path, encoding='utf-8', newline='') as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) < 10:
                continue
            file_srl = row[0].strip('"').strip()
            source_filename = row[8]
            uploaded_filename = row[9]
            if file_srl.isdigit():
                mapping[file_srl] = (source_filename, uploaded_filename)
    return mapping

def sanitize_filename(name):
    for ch in '<>:"|?*\r\n\t':
        name = name.replace(ch, '_')
    name = name.replace('/', '_').replace('\\', '_')
    name = name.strip()
    return name if name else 'unnamed'

def unique_filename(downloads_dir, filename, used_names):
    """Return a unique filename, adding -2, -3 etc if collision"""
    if filename not in used_names:
        used_names.add(filename)
        return filename
    base, ext = os.path.splitext(filename)
    i = 2
    while True:
        candidate = f"{base}-{i}{ext}"
        if candidate not in used_names:
            used_names.add(candidate)
            return candidate
        i += 1

def copy_files(mapping, downloads_dir):
    """Copy files from their disk paths to downloads_dir with original names.
    Returns dict: file_srl -> actual_filename_used"""
    os.makedirs(downloads_dir, exist_ok=True)
    
    # Clear existing downloads (fresh start)
    for f in os.listdir(downloads_dir):
        try:
            os.remove(os.path.join(downloads_dir, f))
        except Exception:
            pass
    
    srl_to_filename = {}
    used_names = set()
    success = 0
    missing = []
    
    # Sort by file_srl (ascending) so older files get the plain name
    for file_srl in sorted(mapping.keys(), key=lambda x: int(x)):
        source_name, uploaded_path = mapping[file_srl]
        src = uploaded_path.lstrip('./').replace('/', os.sep)
        
        if not os.path.exists(src):
            missing.append((file_srl, src, source_name))
            continue
        
        clean_name = sanitize_filename(source_name)
        final_name = unique_filename(downloads_dir, clean_name, used_names)
        dst = os.path.join(downloads_dir, final_name)
        
        try:
            shutil.copy2(src, dst)
            srl_to_filename[file_srl] = final_name
            success += 1
        except Exception as e:
            print(f"  Error copying {file_srl}: {e}")
    
    return srl_to_filename, success, missing

URL_PATTERN = re.compile(
    r'index\.html@module=file(?:&amp;|&)act=procFileDownload(?:&amp;|&)file_srl=(\d+)[^"\'<>\s]*'
)

def update_html(srl_to_filename, downloads_dir):
    html_files = []
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d != '.git']
        for name in files:
            if name.endswith('.html'):
                html_files.append(os.path.join(root, name))
    
    total_replaced = 0
    files_changed = 0
    
    for html_path in html_files:
        try:
            with open(html_path, encoding='utf-8', errors='replace') as f:
                content = f.read()
        except Exception as e:
            print(f"  Error reading {html_path}: {e}")
            continue
        
        html_dir = os.path.dirname(html_path) or '.'
        
        def replace_match(m):
            file_srl = m.group(1)
            if file_srl in srl_to_filename:
                final_name = srl_to_filename[file_srl]
                target = os.path.join(downloads_dir, final_name)
                rel_path = os.path.relpath(target, html_dir).replace(os.sep, '/')
                return quote(rel_path, safe='/')
            return m.group(0)
        
        new_content, n = URL_PATTERN.subn(replace_match, content)
        
        if n > 0:
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            total_replaced += n
            files_changed += 1
    
    return total_replaced, files_changed

if __name__ == '__main__':
    if not os.path.exists(CSV_FILE):
        print(f"ERROR: {CSV_FILE} not found")
        sys.exit(1)
    
    print("=" * 60)
    print("Step 1: Loading xe_files.csv")
    print("=" * 60)
    mapping = load_mapping(CSV_FILE)
    print(f"Loaded {len(mapping)} file records\n")
    
    print("=" * 60)
    print("Step 2: Copying files with original names (no prefix)")
    print("=" * 60)
    srl_to_filename, success, missing = copy_files(mapping, DOWNLOADS_DIR)
    print(f"Copied: {success}")
    print(f"Missing: {len(missing)}")
    print()
    
    print("=" * 60)
    print("Step 3: Updating HTML links")
    print("=" * 60)
    total, files_changed = update_html(srl_to_filename, DOWNLOADS_DIR)
    print(f"Replaced {total} links in {files_changed} files\n")
    
    print("Done!")