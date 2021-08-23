const router = require(`express`).Router();
const { Department } = require(`../../models`);

router.get(`/`, (req, res) => {
    Department.findAll({
        // attributes: { exclude: [`id`] }
    })
        .then(data => res.json(data))
        // .then(data => console.table([data]))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;