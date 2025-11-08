const httpUser = {

    newUser: async(req, res)=>{
        const {cc} = req.query;

        const {nombre, apellido, edad} = req.body;
        const userId = crypto.randomUUID();
        
    }
}