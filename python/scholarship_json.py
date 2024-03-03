
output = "export const scholarships = [\n"

with open("./scholarship.csv", 'r', encoding='utf-8') as f:
    for line in f.readlines():
        data = line.split(",")

        amount = data[3].strip()
        if (len(amount.split("$")) > 1):
            amount = "$" + amount.split("$")[1]

        output += "    {\n"
        output += "        name: \"" + data[0].strip().replace("\"", "\\\"") + "\",\n"
        output += "        url: \"" + data[1].strip() + "\", \n"
        output += "        amount: \"" + amount + "\",\n"
        output += "        due: \"" + data[4].strip() + "\",\n"
        output += "    },\n"

output += "]"

with open("./scholarships.js", 'w') as f:
    f.write(output)