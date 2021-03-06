from flask import Flask, Response, request, flash, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
 
app = Flask(__name__)
CORS(app)
app.secret_key = "Secret Key"
 
#SqlAlchemy Database Configuration With Mysql
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/crud'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
 
db = SQLAlchemy(app)
 
#Creating model table for our CRUD database
class Data(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(100))
 
 
    def __init__(self, name, email, phone):
 
        self.name = name
        self.email = email
        self.phone = phone
    
    def to_dict(self):
        return {
            'id' : self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone
        }

#This is the index route where we are going to
#query on all our employee data
@app.route('/')
def Index():
    all_data = Data.query.all()
    resp = []
    for data in all_data:
        resp.append(data.to_dict())

    print("res", resp)
    
    return make_response({"message": "Success", "data": resp}) 
 
#this route is for inserting data to mysql database via html jsons
@app.route('/insert', methods = ['POST'])
def insert():
    # print(request.json)
    if request.method == 'POST':
        
        name = request.json['name']
        email = request.json['email']
        phone = request.json['phone']
 
 
        my_data = Data(name, email, phone)
        db.session.add(my_data)
        db.session.commit()
        # inserted_data = my_data.to_dict()
        all_data = Data.query.all()
        resp = []
        for data in all_data:
            resp.append(data.to_dict())

        # print("res", resp)
    
    return make_response({"message": "Success", "data": resp}) 
        # return make_response({"message": "Success", "data":inserted_data })
 
#this is our update route where we are going to update our employee
@app.route('/update', methods = ['POST'])
def update():
    my_data = Data.query.get(request.json['id'])

    my_data.name = request.json['name']
    my_data.email = request.json['email']
    my_data.phone = request.json['phone']

    db.session.commit()
    flash("Employee Updated Successfully")
 
    return Response("Updated successfully")
 
 
#This route is for deleting our employee~
@app.route('/delete/<id>/', methods = ['GET'])
def delete(id):
    my_data = Data.query.get(int(id))
    db.session.delete(my_data)
    db.session.commit()
    all_data = Data.query.all()
    resp = []
    for data in all_data:
        resp.append(data.to_dict())

    print("res", resp)
    
    return make_response({"message": "Success", "data": resp}) 

if __name__ == "__main__":
    app.run(debug=True)