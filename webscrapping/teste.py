from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/teste', methods=['GET'])
def printar():
    return "hello world", 200

@app.route('/teste', methods=['POST'])
def teste_post():
    data = request.get_json()
    
    return jsonify(data), 201

if __name__ == "__main__":
    app.run(debug=True)