from flask import Flask ,request ,render_template ,jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
app = Flask(__name__)

# connecting with mongodb url 
client = MongoClient("mongodb://localhost:27017")

# initialising db as the database named react-flask-database
db = client["React-flask-database"]

CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/users", methods=['POST','GET'])
def users():
    # inserting value in the db 
    if request.method=="POST":
        body=request.json
        firstName=body['firstName']
        lastName=body['lastName']
        email=body['email']

        db['users'].insert_one({ ## making a collection called users in the database ##
            "firstName" : firstName,
            "lastName"  : lastName,
            "email"     : email 
        })

        return jsonify({
            "status":"inserted successfully",
            # "id": _id,
            "firstName" : firstName,
            "lastName"  : lastName,
            "email"     : email 
        })
     # fetching all  data in the db
    if request.method=="GET":
        alldata = db['users'].find()
        dataJson=[]
        for data in alldata:
            id=data['_id']
            firstName=data['firstName']
            lastName=data['lastName']
            email=data['email']

            dataDisc={
                "id": str(id),
                "firstName" : firstName,
                "lastName"  : lastName,
                "email"     : email 
            }
            dataJson.append(dataDisc)
        return jsonify(dataJson)

@app.route("/users/<string:id>", methods=['PUT','GET','DELETE'])
def onedata(id):
        # fetching a particular data 
    if request.method=="GET":
        data = db['users'].find_one({"_id":ObjectId(id)})
        dataJson=[]

        id=data['_id']
        firstName=data['firstName']
        lastName=data['lastName']
        email=data['email']
        dataDisc={
            "id": str(id),
            "firstName" : firstName,
            "lastName"  : lastName,
            "email"     : email 
        }
        dataJson.append(dataDisc)
        return jsonify(dataJson)

# deleting
    if request.method=="DELETE":
         data = db['users'].delete_many({"_id":ObjectId(id)})
         return jsonify({
             "status":"Successfully Deleted id: " +id,
             "id":id
         })
    
    # updating 
    if request.method=="PUT":
        body=request.json
        firstName=body['firstName']
        lastName=body['lastName']
        email=body['email']

        db['users'].update_one(
            {"_id":ObjectId(id)},
            {
                "$set":{
                    "firstName" : firstName,
                    "lastName"  : lastName,
                    "email"     : email 
                }
            }
        )
        return jsonify({
            "status":"succesfully Updated"
        })


if __name__ == "__main__":
    app.run(debug=True)