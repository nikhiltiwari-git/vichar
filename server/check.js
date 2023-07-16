import jwt from 'jsonwebtoken';

const check = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split('Bearer ')[1];
        // console.log(token.length);
        const isCustomAuth = token.length < 500;   
        if(token && isCustomAuth){
            let decodedData = await jwt.verify(token, 'test') ;
                // if(token){
                // }
            // });
            // console.log(decodedData);
            req.userId = decodedData.id;
        }
        next();

    } catch (err) {
       console.log(err);
    }
} 

export default check;