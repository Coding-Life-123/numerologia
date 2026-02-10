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
        next();
    }catch{
        res.status(401).json({ msg:"Token inválido" })
    }
}