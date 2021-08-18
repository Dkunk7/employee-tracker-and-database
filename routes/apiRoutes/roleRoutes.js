const router = require(`express`).Router();
const Role = require(`../../models/Role`);


router.get(`/`, (req, res) => {
    Role.findAll({
        attributes: { exclude: [`id`] }
    })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;