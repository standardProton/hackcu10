
output = "export const scholarships = [\n"

schools = []

with open("./scholarship.csv", 'r', encoding='utf-8') as f:
    for line in f.readlines():
        data = line.split(",")

        print(data)

        school = data[2].strip()
        if not (schools.__contains__(school)): schools.append(school)

        amount = data[5].strip()
        if (len(amount.split("$")) > 1):
            amount = "$" + amount.split("$")[1]

        output += "    {\n"
        output += "        name: \"" + data[0].strip().replace("\"", "\\\"") + "\",\n"
        output += "        url: \"" + data[1].strip() + "\", \n"
        output += "        amount: \"" + amount + "\",\n"
        output += "        due: \"" + data[6].strip() + "\",\n"
        output += "    },\n"

print(schools)

output += "]"

with open("./scholarships.js", 'w') as f:
    f.write(output)