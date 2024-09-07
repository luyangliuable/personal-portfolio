import os
import subprocess
from datetime import datetime
import markdown
from pymongo import MongoClient

def get_heading_from_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        md = markdown.Markdown(extensions=['meta'])
        content = file.read()
        md.convert(content)
        if 'title' in md.Meta:
            return md.Meta['title'][0]
        else:
            lines = content.split('\n')
            for line in lines:
                if line.startswith('# '):
                    return line[2:]
    return ''

def format_heading(file_path):
    root_folder_name = os.path.basename(os.path.dirname(file_path))
    formatted_name = root_folder_name.replace('_', ' ').replace('-', ' ').title()
    return formatted_name

def calculate_reading_time(file_path):
    size_in_bytes = os.path.getsize(file_path)
    # Assuming an average reading speed of 200 words per minute and an average of 5 characters per word
    reading_time_minutes = max(1, size_in_bytes // (200 * 5))
    return reading_time_minutes

def get_creation_date_from_git(base_path, file_path):
    relative_file_path = os.path.relpath(file_path, base_path)
    try:
        result = subprocess.run(
            ["git", "log", "--diff-filter=A", "--follow", "--format=%cI", "-1", relative_file_path],
            capture_output=True, text=True, check=True, cwd=base_path
        )
        date_str = result.stdout.strip()
        if date_str:
            return datetime.fromisoformat(date_str)
    except subprocess.CalledProcessError as e:
        print(f"Error getting creation date for {file_path}: {e}")
    return None

def index_markdown_files_to_mongodb():
    client = MongoClient('mongodb+srv://luyangliuable:1225Eric@serverlessinstance0.z8d7qnv.mongodb.net')  # Replace with your MongoDB connection string
    db = client['rustDB']  # Replace with your database name
    collection = db['Note']

    author = "Luyang Liu"
    body = ""

    base_path = '/Users/blackfish/coding-notes/'
    ignore_list = ['.venv', 'node_modules']

    for root, dirs, files in os.walk(base_path):
        # Modify dirs in-place to skip ignored directories
        dirs[:] = [d for d in dirs if d not in ignore_list]
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                if os.path.getsize(file_path) == 0:
                    continue
                
                relative_path = os.path.relpath(file_path, base_path)

                # Check if the file is in the ignore list
                if any(ignored in relative_path for ignored in ignore_list):
                    continue

                heading = get_heading_from_markdown(file_path)
                if not heading:
                    heading = format_heading(file_path)

                tags = relative_path.split(os.sep)[:-1]  # Exclude the file name itself from tags

                reading_time = calculate_reading_time(file_path)

                date_created = get_creation_date_from_git(base_path, file_path)

                note = {
                    "heading": heading,
                    "reading_time_minutes": reading_time,
                    "author": author,
                    "file_path": relative_path,
                    "tags": tags,
                    "body": body
                }
                
                if date_created:
                    note["date_created"] = date_created.isoformat()
                
                collection.insert_one(note)
                print(f"Indexed: {note}")

if __name__ == "__main__":
    index_markdown_files_to_mongodb()
