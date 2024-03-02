#!/usr/bin/env python3
from html.parser import HTMLParser
import sys, requests, csv

if len(sys.argv) != 1:
    print("Need more arguments")
    exit(0)

scholarships = requests.get("https://colorado.academicworks.com").text


# with open('scholarship.csv', 'w', newline='') as f:
#     writer = csv.writer(f)
#     writer.writerows(scholarships)
