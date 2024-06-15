import List from '../../models/List.js';

const getLists = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const lists = await List.find({userId: userId}).populate('todos');
        res.status(200).json({
            message: "success",
            user: userId,
            lists: lists
        });
    }
    catch (err) {
        next(err);
    }
}

export default getLists;