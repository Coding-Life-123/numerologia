import jwt from "jsonwebtoken";

export const validarJWT = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if(!authHeader){
        return res.status(401).json({ msg:"Dónde está mi token? >:(" });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        // Solo verificamos que el ID coincida si la ruta recibe un parámetro :id
        // (por ejemplo, al actualizar o eliminar su propio perfil)
        if(req.params.id && req.user.uid !== req.params.id){
            console.log("Id incorrecto. El token no pertenece al usuario que se intenta modificar.");
            return res.status(401).json({msg:"El usuario no tiene permisos para realizar esta acción sobre este ID"});
        }
        
        console.log(req.user.uid)
        next();
    }catch{
        res.status(401).json({ msg:"Token inválido" })
    }
}

export const validarAdminJWT = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if(!authHeader){
        return res.status(401).json({ msg:"Dónde está mi token? >:(" });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        const role = req.user.uRole;
        console.log(req.user.uid)

        if(role !== "admin"){
            res.status(401).json({ msg:"Permisos insuficientes" })
        }
        next();
    }catch{
        res.status(401).json({ msg:"Token inválido" })
    }
}