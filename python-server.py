from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time

app = Flask(__name__)
CORS(app)  

@app.route('/longpolling', methods=['GET'])
def long_polling():
    client_time = int(request.args.get('lastmod', 0))
    file_path = 'mycv.txt'

    def get_file_time():
        return int(os.path.getmtime(file_path))

    file_time = get_file_time()

    while client_time >= file_time:
        time.sleep(1)
        file_time = get_file_time()

    with open(file_path, 'r') as file:
        file_content = file.read()

    message = {
        'data': file_content,
        'filetime': file_time
    }

    return jsonify(message)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
