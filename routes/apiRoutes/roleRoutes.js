const router = require(`express`).Router();
const sequelize = require("../../config/connection");
const { Role, Department } = require(`../../models`);


router.get(`/`, (req, res) => {
    Role.findAll({
        attributes: [`id`, `title`, `department_id`, [sequelize.literal(`(SELECT * FROM department)`)]], 
        // include: //Department.deptName()
        
        // attributes: [[sequelize.literal(`(SELECT name FROM department)`)], `dept_name`]

        // [
        //     {
        //         model: Department,
        //         // association: `department`,
        //         // attributes: [`name`],
        //         // as: `department_name`
                
        //     }
        // ]
    })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;