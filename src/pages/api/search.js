

export function SearchScholarships(req, res) {
    const l = [];
    for (let i =0 ; i < 15; i++){
        l.push({
            name: "Scholarship " + (i+1),
            amount: "$1234",
            due: "3/15/24",
        })
    }
    res.status(200).json({results: l});
}