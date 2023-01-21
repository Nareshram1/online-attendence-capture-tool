from deepface import DeepFace
df = DeepFace.find(img_path = "temp.jpg", db_path = "database",model_name="Ensemble")
print(df)