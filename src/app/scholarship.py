#!/usr/bin/env python3
import bs4 as BeautifulSoup
import sys, requests, re

if len(sys.argv) != 1:
    print("No other arguments needed")
    exit(0)

scholarship_info = []
scholarships = requests.get("https://colorado.academicworks.com").text
scholarships_soup = BeautifulSoup.BeautifulSoup(scholarships, 'html.parser')

scholarship_table = scholarships_soup.findChildren('table')[0]
name_sections = scholarship_table.findChildren(['th'])
for name in name_sections:
    for opportunity in name.findAll('a'):
        link = opportunity.get('href')
        opportunity = opportunity.text
        if (link != None and re.match('^/opportunities/\d+$', link) and opportunity != None):
            scholarship_info.append([{'name': opportunity}, {'link': link}])

rows = scholarship_table.findChildren(['tr'])
for index, row in enumerate(rows):
    awards = row.find_all('td', class_ = "strong h4 table__column--max-width-250")
    for award in awards:
        award_amount = re.sub('\s*', '', award.text)
        scholarship_info[index - 1].append({'award': award_amount})
 
print(scholarship_info)

# with open('scholarship.csv', 'w', newline='') as f:
#     writer = csv.writer(f)
#     writer.writerows(scholarships)
