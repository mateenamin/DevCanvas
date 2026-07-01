import jwt from 'jsonwebtoken';


const protectRoute = async (req, res, next) => {
      
    try{

           // 1. Header se token nikalna (Authorization: Bearer <token>)

        
        // 1. Pehle check karein ke headers aur authorization maujood hain
            if (!req.headers || !req.headers.authorization) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

             const authHeader = req.headers.authorization;
             // 2. Check karein ke token 'Bearer ' se shuru ho raha hai
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token Format" });
        }

        // 'Bearer eyJhbG...' me se sirf token alag karna
         const token = authHeader.split(' ')[1];

        // 2. Token ko verify karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        // 3. User ki id ko request (req) me attach karna taake aage use ho sake
        req.userId = decoded.id;

        // Sab theek hai, ab agle function (controller) par jao
        next();


    }catch (error) {
        console.log("Error in auth middleware: ", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }


}

export default   protectRoute;




// req.headers.authorization

// Aasan Lafzon Me: Jab frontend se token aayega, toh woh body me nahi, balki ek chupi hui 
// jagah me aata hai jise headers kehte hain. Yeh line bas wahan se us token ko uthati hai.

// jwt.verify(token, secret)

// Aasan Lafzon Me: Yeh built-in function hai jo check karta hai ke kya yeh token humne hi 
// banaya tha? Kya isme koi chorti-shorhi ya badli toh nahi ki gayi?











// Login ke baad ka kaam: Jab user ek baar login ho jata hai, tab use token milta hai. 
// Phir uske baad jab bhi woh un pages par jane ki koshish karta hai jo aapne allow (protect)
// kiye hote hain, toh yeh middleware check karta hai ke token thik hai ya nahi. Agar thik ho,
// toh access de deta hai.