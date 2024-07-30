import os
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

def index_markdown_files_to_mongodb():
    client = MongoClient('mongodb://localhost:27017/')  # Replace with your MongoDB connection string
    db = client['your_database_name']  # Replace with your database name
    collection = db['Notes']

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
                relative_path = os.path.relpath(file_path, base_path)

                # Check if the file is in the ignore list
                if any(ignored in relative_path for ignored in ignore_list):
                    continue

                heading = get_heading_from_markdown(file_path)

                tags = relative_path.split(os.sep)[:-1]  # Exclude the file name itself from tags
                
                note = {
                    "heading": heading,
                    "author": author,
                    "file_path": relative_path,
                    "tags": tags,
                    "body": body
                }
                
                collection.insert_one(note)
                print(f"Indexed: {note}")

if __name__ == "__main__":
    index_markdown_files_to_mongodb()
