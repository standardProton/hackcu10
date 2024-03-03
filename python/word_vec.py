
import math
import numpy as np
from nltk.tokenize import word_tokenize

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

