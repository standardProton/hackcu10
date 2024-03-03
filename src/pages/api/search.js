

export default async function SearchScholarships(req, res) {
    const l = [];
    for (let i =0 ; i < 15; i++){
        l.push({
            name: (i % 2 == 0 ? "Scholarship " + (i+1) : "Scholarship Lorum Ipsum Really long name here"),
            amount: "$1234",
            due: "3/15/24",
            url: "colorado.edu"
        })
    }
    res.status(200).json({results: l});
}