import List from '../../models/List.js';

const getLists = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const lists = await List.find({userId: userId});
        res.status(200).json({
            "messages": "success",
            "user": userId,
            "lists": lists
        });
    }
    catch (err) {
        next(err);
    }
}

export default getLists;