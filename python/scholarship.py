#!/usr/bin/env python3
import bs4 as BeautifulSoup
import sys, requests, re, csv

if len(sys.argv) != 1:
    print("No other arguments needed")
    exit(0)

page_number = 14
scholarship_info = []

def get_description(link):
    scholarship = requests.get(link).text
    scholarship_soup = BeautifulSoup.BeautifulSoup(scholarship, 'html.parser')
    
    header_block = scholarship_soup.findChildren(['header'])
    description = ""
    for block in header_block:
        description_block = block.findChildren(['p', 'ul'])
        for d in description_block:
            d = re.sub('<.*?>', '', d.text)
            description += d
    return description

for page in range(1, page_number):
    scholarships = requests.get(f"https://colorado.academicworks.com/?page={page}").text
    scholarships_soup = BeautifulSoup.BeautifulSoup(scholarships, 'html.parser')

    scholarship_table = scholarships_soup.findChildren('table')[0]
    name_sections = scholarship_table.findChildren(['th'])
    for name in name_sections:
        for opportunity in name.findAll('a'):
            link = opportunity.get('href')
            opportunity = opportunity.text + " "
            if (link != None and re.match('^/opportunities/\d+$', link) and opportunity != None):
                link = "https://colorado.academicworks.com" + link + " "
                scholarship_info.append([opportunity, link, get_description(link)])
    
    rows = scholarship_table.findChildren(['tr'])
    for index, row in enumerate(rows):
        awards = row.find_all('td', class_ = "strong h4 table__column--max-width-250")
        for award in awards:
            award_amount = re.sub('\s*', '', award.text)
            award_amount = re.sub(',', '', award_amount)
            scholarship_info[index - 1 + (page - 1) * 50].append(award_amount + " ")
        
        deadline_sections = row.find_all('td', class_ = "center")
        for deadline_section in deadline_sections:
            if (len(deadline_section.find_all('span')) > 0): 
                deadline = deadline_section.find_all('span')[1].text
                scholarship_info[index - 1 + (page - 1) * 50].append(deadline)
            else:
                scholarship_info[index - 1 + (page - 1) * 50].append('Expired')

with open('scholarship.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Link', 'Description', 'Award', 'Deadline'])
    writer.writerows(scholarship_info)
