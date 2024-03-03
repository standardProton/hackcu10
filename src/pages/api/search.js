
import { scholarship_vecs } from "@/app/consts/scholarship_vecs";
import { scholarships } from "@/app/consts/scholarships";

export const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

export const mag2 = (a) => a.map((x, i) => a[i]*a[i]).reduce((m, n) => m+ n);

export default async function SearchScholarships(req, res) {
   /* const l = [];
    for (let i =0 ; i < 15; i++){
        l.push({
            name: (i % 2 == 0 ? "Scholarship " + (i+1) : "Scholarship Lorum Ipsum Really long name here"),
            amount: "$1234",
            due: "3/15/24",
            url: "colorado.edu"
        })
    }
    res.status(200).json({results: l});*/

    if (req.method != "POST"){
        res.status(400).json({error_message: "Must use POST!"});
        return;
    }

    const body = JSON.parse(req.body);

    if (body.vectorized == undefined || body.vectorized.length != scholarship_vecs[0].length) {
        res.status(400).json({error_msg: "Vectorized form is invalid length or undefined!"});
        return;
    }

    const dot_products = [];
    const vec_mag = Math.sqrt(mag2(body.vectorized));
    if (vec_mag == 0){ //return default
        const results = [];
        for (let i = 0; i < 15; i++) results.push(scholarships[i]);
        res.status(200).json({results, msg: "Received zero vector, returning default 15."});
        return;
    }
    for (let i = 0; i < scholarship_vecs.length; i++){
        const d = dot(scholarship_vecs[i], body.vectorized);
        dot_products.push({index: i, cos_theta: d/(Math.sqrt(mag2(scholarship_vecs[i]))*vec_mag)});
    }

    dot_products.sort((a, b) => a.cos_theta < b.cos_theta ? 1 : -1);

    const results = []
    const results_len = Math.min(dot_products.length, 15);
    for (let i = 0; i < results_len; i++){
        results.push(scholarships[dot_products[i].index]);
    }


    res.status(200).json({results});
}