from pymongo import MongoClient 
from bson.objectid import ObjectId
def store_db(date, owner,cid,data):  
    try: 
        conn = MongoClient("mongodb+srv://joeprathap123:joeprathap123@cluster0.qgfc2.mongodb.net/?retryWrites=true&w=majority") 
        print("Connected successfully!!!") 
        
        db = conn.sap
        collection = db.attendances   
        check = collection.find_one({"AttendanceRecord": date, "owner": owner , "data.Class": cid})
        
        if(check == None):
            rec_id1 = collection.insert_one({"AttendanceRecord": date, "owner": owner,"data": data})
            rec = db.classes.find_one_and_update({"_id": ObjectId(cid)}, {"$inc": {"totLec":1}})   
            
            print("Data inserted with record ids",rec_id1)
            print("incremented",rec)
        else:
            print("Record already exists")
    except Exception as e:   
        print("Could not connect to MongoDB") 
        print(type(e).__name__,e.args)
  
    # database 
    
    

