
import math
import numpy as np
from nltk import word_tokenize
from pandas import *

def vectorize(vocab, input): #vocab is dict {'word', index}, assumed tokenized by nltk
    v = np.zeros(len(vocab))
    for word_upper in word_tokenize(input):
        word = word_upper.lower()
        if not (word in vocab): continue
        index = vocab[word]
        v[index] += 1
    return v

def create_vocab(examples): #get dict of words where index is ordered by word frequency
    word_counts = {}
    for example in examples:
        for word_upper in word_tokenize(example):
            word = word_upper.lower()
            if (word in word_counts): word_counts[word] += 1
            else: word_counts[word] = 1
    sorted_dict = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)

    vocab = {}
    for i in range(len(sorted_dict)):
        vocab[sorted_dict[i][0]] = i
    return vocab

def cos_distance(a, b):
    return 1-(np.sum(a*b)/math.sqrt(np.sum(a**2)*np.sum(b**2)))

def convert_vector(vector):
    vector_str = "["
    for count in vector:
        vector_str += str(count)
        vector_str += ", "
    vector_str = vector_str[:-2]
    vector_str += "]"
    return vector_str

def create_vector():
    description_vector = "[\n"
    scholarship_data = read_csv("scholarship.csv")
    scholarship_description = scholarship_data['Description'].tolist()

    scholarship_vocab = create_vocab(scholarship_description)
    for description in scholarship_description:
        scholarship_vector = convert_vector(vectorize(scholarship_vocab, description))
        description_vector += "    " + scholarship_vector + ",\n"
    description_vector += "]"
    return description_vector
