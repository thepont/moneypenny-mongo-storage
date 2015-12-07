var routes = {
    /**
     * Returns the details of the logged in user.
     */
    '/auth/details' : {
        get :  function(req,res,next){
                return res.json(req.user);
        }
    }
}
module.exports = routes;