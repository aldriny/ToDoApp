
const logout = (req,res) =>{
    try {
        res.cookie('jwt','',{maxAge: 0, httpOnly: true});
        res.redirect('/');      
    } catch (error) {
        next(error);
    }
}

export default logout;