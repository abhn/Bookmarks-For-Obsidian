#!/usr/bin/python3 -u

# Note that running python with the `-u` flag is required on Windows,
# in order to ensure that stdin and stdout are opened in binary, rather
# than text, mode.

import json
import sys
import struct
import glob
import os

OBSIDIAN_VAULT_DIRECTORY="/Users/abhishek/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault-abhn/wiki/"
DEFAULT_BOOKMARKS_FILE="/Users/abhishek/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault-abhn/Bookmarks.md"
OBSIDIAN_VAULT_DIRECTORY_ALL_MD_FILES_REGEX = OBSIDIAN_VAULT_DIRECTORY + '**/*.md'

# Read a message from stdin and decode it.
def get_message():
    raw_length = sys.stdin.buffer.read(4)

    if not raw_length:
        sys.exit(0)
    message_length = struct.unpack('=I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode('utf-8')
    return json.loads(message)

# Encode a message for transmission, given its content.
def encode_message(message_content):
    encoded_content = json.dumps(message_content).encode('utf-8')
    encoded_length = struct.pack('=I', len(encoded_content))
    #  use struct.pack("10s", bytes), to pack a string of the length of 10 characters
    return {'length': encoded_length, 'content': struct.pack(str(len(encoded_content))+"s",encoded_content)}

# Send an encoded message to stdout.
def send_message(encoded_message):
    sys.stdout.buffer.write(encoded_message['length'])
    sys.stdout.buffer.write(encoded_message['content'])
    sys.stdout.buffer.flush()

while True:
    message = get_message()
    send_message(encode_message(message))

    if 'url' in message:
      url = message['url']
      title = message['title']
      filename = message['category']
      tags = message['tags']

      if len(tags) > 0:
        textToWrite = f'- [{title}]({url}) - {tags}\n'
      else:
        textToWrite = f'- [{title}]({url})\n'

      if filename != 'uncategorized':
        with open(filename, 'a') as file_object:
          file_object.write(textToWrite)
          send_message(encode_message({'message': 'success'}))
      else:
        with open(DEFAULT_BOOKMARKS_FILE, 'a') as file_object:
          file_object.write(textToWrite)
          send_message(encode_message({'message': 'success'}))

    elif message == 'query_categories':
      files = glob.glob(OBSIDIAN_VAULT_DIRECTORY_ALL_MD_FILES_REGEX, recursive=True)
      send_message(encode_message({'files': files, 'message': 'all_files'}))
