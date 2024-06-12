import List from '../../models/List.js';

const getLists = async (req, res, next) => {
    try {
        const lists = await List.find({user: req.user.id});
        res.status(200).json({
            "messages": "success",
            "user": req.user.id,
            "lists": lists
        });
    }
    catch (err) {
        next(err);
    }
}

export default getLists;