# predict.py

import sys
import joblib
import numpy as np
import json

# Load the model
model = joblib.load("model.joblib")

# Function to count the number of letters in the text
def count_letters(text):
    return sum(c.isalpha() for c in text)

# Get the text from command line arguments
text = sys.argv[1]

# Process the text
letters_count = model.predict(np.array([[count_letters(text)]]))[0]

# Output the result
print(json.dumps({"lettersCount": int(letters_count)}))
