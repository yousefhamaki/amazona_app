import jwt  from "jsonwebtoken"
import Token from "./app/models/TokenModel.js"


export const generateToken = async (user)=>{
    const token =  jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            "process.env.JWT_SECRET",
            {
                expiresIn: "30d",
            })
    const created = new Token({
        token: token,
        userID: user._id,
        isAdmin: user.isAdmin,
        valid: true
    })
    const save = await created.save()
    return token
}

// export const generateToken = (user)=>{
//     return jwt.sign({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//     },
//     "process.env.JWT_SECRET",
//     {
//         expiresIn: "30d",
//     })
// }


export const isAuth = async (req, res, next)=>{
    const auth = req.headers.authorization
    if(auth){
        const token = auth.slice(7)
        const isauth = await Token.findOne({token: token})
        if(isauth){
            req.user = isauth
            next()
        }else{
            res.status(401).send({message: "invalid Token", token, auth})
        }
    }else{
        res.status(401).send({message: "No Token"})
    }
}

// export const isAuth = (req, res, next)=>{
//     const auth = req.headers.authorization;

//     if(auth){
//         const token = auth.slice(7, "process.env.JWT_SECRET", auth.length)
//         jwt.verify(token, "process.env.JWT_SECRET", (err, decode)=>{
//             if(err){
//                 res.status(401).send({message: "invalid Token"})
//             }else{
//                 req.user = decode
//                 next()
//             }
//         })
//         console.log("checking..")
//     }else{
//         res.status(401).send({message: "No Token", auth: req.headers.authorization})
//     }
// }

