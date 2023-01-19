import cv2
import face_recognition
from datetime import datetime
import sys
from mongo import store_db
# Load the pre-trained model for face detection
face_detector = cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')

# Load the video
print(sys.argv)
cap = cv2.VideoCapture(r"C:\Users\joepr\Downloads\video.mkv")
# cap = cv2.VideoCapture(0)

# Load the known faces and their names


known_faces = [
    
]
known_names = [

]

known_roll = [
    
]

marked_roll = []

time = datetime.now().strftime("%Y-%#m-%#d")
print(time)

print(sys.argv)

oid = sys.argv[1]
cid = sys.argv[2]

try:
    with open('known_faces.txt', 'r') as file:
        for line in file.readlines():
            name, rollNo ,path = line.strip().split(' ')
            print(name, rollNo ,path)
            known_names.append(name)
            known_roll.append(rollNo)
            known_faces.append(face_recognition.face_encodings(face_recognition.load_image_file("images/"+path))[0])
except:
    open('known_faces.txt', 'a').close()
    

marked = []
s=True
while s:
    # Read a frame from the video
    # frame = cv2.imread("temp.jpg")
    _,frame=cap.read()
    
   

    # Convert the frame to RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Detect faces in the frame
    faces = face_detector.detectMultiScale(frame, scaleFactor=1.1, minNeighbors=3, minSize=(15, 15), flags=cv2.CASCADE_SCALE_IMAGE)

    # For each detected face
    # top, right, bottom, left
    for (x, y, w, h) in faces:
        # Encode the face
        face_encoding = face_recognition.face_encodings(rgb_frame, [(y, x+w, y+h, x)])[0]

        # Compare the face to the known faces
        matches = face_recognition.compare_faces(known_faces, face_encoding,tolerance=0.454)

        # If a match is found
    # top, right, bottom, left
    #x, y, w, h
        
        if True in matches:
            # Get the index of the matched face
            matched_index = matches.index(True)
           
            if(known_names[matched_index] not in marked):
                print("Found:",known_names[matched_index])
                marked.append(known_names[matched_index])
                marked_roll.append(known_roll[matched_index])
            
            # Draw a rectangle around the face and display the name
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
            cv2.putText(frame, known_names[matched_index], (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            
        else:
            
            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
            cv2.putText(frame, "unknown", (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
       

    # Display the frame
    cv2.imshow("Video", frame)

    # Exit the loop if the 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture
cap.release()

data = {"Name": marked, "RollNo": marked_roll , "Class": [cid]}

if(data["Name"]):
    store_db(time,oid,cid,data)

# Close all the windows
cv2.destroyAllWindows()
