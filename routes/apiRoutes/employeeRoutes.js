const router = require(`express`).Router();
const { Employee } = require(`../../models`);

router.get(`/`, (req, res) => {
    Employee.findAll({
        // include: [
        //     {

        //     }
        // ]
    })
        .then(data => res.json(data))
        // .then(data => console.table([data]))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;