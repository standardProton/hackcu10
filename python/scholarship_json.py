
output = "export const scholarships = [\n"

schools = {"College of Arts & Sciences": 0, "School of Education": 1, "Leeds School of Business": 2, "College of Media Communication and Information": 3}

with open("./scholarship.csv", 'r', encoding='utf-8') as f:
    for line in f.readlines():
        data = line.split(",")

        applications = "true" if (data[4].strip() == "True") else "false"

        amount = data[5].strip()
        if (len(amount.split("$")) > 1):
            amount = "$" + amount.split("$")[1]
        
        college = "null"
        if data[2].strip() in schools:
            college = str(schools[data[2].strip()])

        output += "    {\n"
        output += "        name: \"" + data[0].strip().replace("\"", "\\\"") + "\",\n"
        output += "        url: \"" + data[1].strip() + "\", \n"
        output += "        amount: \"" + amount + "\",\n"
        output += "        due: \"" + data[6].strip() + "\",\n"
        output += "        college: " + college + ",\n"
        output += "        apply: " + applications + ",\n"
        output += "    },\n"

output += "]"

with open("./scholarships.js", 'w') as f:
    f.write(output)