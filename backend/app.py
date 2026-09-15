import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
from dotenv import load_dotenv

load_dotenv()  # .env file se environment 
app = Flask(__name__)
CORS(app)  

# Aiven PostgreSQL URL from environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)

# Table Model
class Activity(db.Model):
    __tablename__ = 'api_data'
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(500))
    category = db.Column(db.String(100))

# table create safely
with app.app_context():
    try:
        db.create_all()
        print("Database tables created successfully!")
    except Exception as e:
        print(f"Database connection warning (server will still run): {e}")

@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"})

# dashboard
@app.route('/start-task', methods=['POST'])
def start_task():
    try:
        data = request.json
        api_url = data.get('api_url', 'https://official-joke-api.appspot.com/random_joke')
       
        # print
        print(f"Data received from Frontend: {data}")

        # data fetch 
        response = requests.get(api_url)
        joke_data = response.json()
        
        new_entry = Activity(
            task=joke_data.get('setup', 'No Setup'), 
            category=joke_data.get('punchline', 'No Punchline')
        )
        db.session.add(new_entry)
        db.session.commit()

        return jsonify({
            "status": "Success",
            "message": "Backend reached! Data saved to Aiven DB.",
            "received_data": data
        })
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "Error", "message": str(e)}), 500

# old fetch 
@app.route('/start-fetch')
def fetch_and_save():
    response = requests.get('https://official-joke-api.appspot.com/random_joke')
    data = response.json()
    new_entry = Activity(task=data['setup'], category=data['punchline'])
    db.session.add(new_entry)
    db.session.commit()
    return jsonify({"status": "Success", "joke": data['setup']})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)